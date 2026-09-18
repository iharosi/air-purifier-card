/**
 * Air Purifier Card
 * A compact, animated Lovelace card for a fan-based air purifier.
 * https://github.com/iharosi/air-purifier-card
 */

const CARD_VERSION = "1.2.0";

console.info(
  `%c AIR-PURIFIER-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: #1c1c1c; font-weight: 700;"
);

// PM2.5 (µg/m³) -> {label, color}
const AQ_LEVELS = [
  { max: 12, label: "Excellent", color: "#43a047" },
  { max: 35, label: "Good", color: "#c0ca33" },
  { max: 55, label: "Moderate", color: "#fdd835" },
  { max: 150, label: "Poor", color: "#fb8c00" },
  { max: 250, label: "Unhealthy", color: "#e53935" },
  { max: Infinity, label: "Hazardous", color: "#8e24aa" },
];

const aqLevel = (value) => {
  if (value === null || Number.isNaN(value)) {
    return { label: "Unknown", color: "var(--disabled-text-color, #9e9e9e)" };
  }
  return AQ_LEVELS.find((level) => value <= level.max);
};

// The inner artwork of the dial, one per animation option. Everything is
// driven by the --spin custom property so each variation follows the fan speed.
const ANIMATIONS = {
  blades: `
    <g class="blades">
      <g transform="translate(50,50)">
        <path transform="rotate(0)" d="M0 0 Q5 -20 19 -25 Q25 -10 6 -4 Z"></path>
        <path transform="rotate(72)" d="M0 0 Q5 -20 19 -25 Q25 -10 6 -4 Z"></path>
        <path transform="rotate(144)" d="M0 0 Q5 -20 19 -25 Q25 -10 6 -4 Z"></path>
        <path transform="rotate(216)" d="M0 0 Q5 -20 19 -25 Q25 -10 6 -4 Z"></path>
        <path transform="rotate(288)" d="M0 0 Q5 -20 19 -25 Q25 -10 6 -4 Z"></path>
      </g>
    </g>
    <circle class="hub" cx="50" cy="50" r="5"></circle>`,

  pulse: `
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="core" cx="50" cy="50" r="12"></circle>`,

  waves: `
    <g clip-path="url(#disc)">
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
    </g>`,

  orbit: `
    <g class="orbit">
      <path class="trail" d="M50 14 A36 36 0 0 1 81 32"></path>
      <circle class="comet" cx="50" cy="14" r="5"></circle>
    </g>
    <circle class="core" cx="50" cy="50" r="9"></circle>`,

  particles: `
    <g clip-path="url(#disc)">
      <g class="particle"><circle cx="37" cy="58" r="4"></circle></g>
      <g class="particle"><circle cx="50" cy="60" r="3.2"></circle></g>
      <g class="particle"><circle cx="62" cy="57" r="4"></circle></g>
      <g class="particle"><circle cx="43" cy="61" r="2.8"></circle></g>
      <g class="particle"><circle cx="57" cy="59" r="3.4"></circle></g>
    </g>
    <rect class="vent" x="32" y="66" width="36" height="5" rx="2.5"></rect>`,
};

const PRESET_ALIGN = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const fireEvent = (node, type, detail = {}) => {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
};

const num = (stateObj) => {
  if (!stateObj) return null;
  const parsed = Number.parseFloat(stateObj.state);
  return Number.isNaN(parsed) ? null : parsed;
};

class AirPurifierCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._dragging = false;
    this._built = false;
    this._lastPercentage = null;
  }

  static getConfigElement() {
    return document.createElement("air-purifier-card-editor");
  }

  static getStubConfig(hass) {
    const pick = (domain, ...hints) => {
      const ids = Object.keys(hass?.states || {}).filter((id) =>
        id.startsWith(`${domain}.`)
      );
      return (
        ids.find((id) => hints.every((hint) => id.includes(hint))) || ids[0] || ""
      );
    };
    return {
      type: "custom:air-purifier-card",
      name: "Air Purifier",
      fan: pick("fan", "purifier"),
      rpm: pick("sensor", "rpm"),
      pm25: pick("sensor", "pm"),
    };
  }

  setConfig(config) {
    const fan = config.fan || config.entity;
    if (!fan) {
      throw new Error("You need to define a `fan` entity (domain: fan).");
    }
    if (!fan.startsWith("fan.")) {
      throw new Error("`fan` must be an entity from the `fan` domain.");
    }
    this._config = {
      ...config,
      name: config.name,
      fan,
      rpm: config.rpm,
      pm25: config.pm25,
      show_presets: config.show_presets !== false,
      presets: config.presets || [25, 50, 75, 100],
      animation: ANIMATIONS[config.animation] ? config.animation : "blades",
      preset_align: PRESET_ALIGN[config.preset_align] ? config.preset_align : "right",
    };
    if (this._built) {
      this._applyOptions();
      this._render();
    }
  }

  getCardSize() {
    return 2;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (!this._built) this._build();
    this._render();
  }

  // ---------------------------------------------------------------- building

  _build() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --ap-accent: var(--state-fan-active-color, var(--primary-color, #03a9f4));
          --ap-idle-color: var(--disabled-text-color, #9e9e9e);
        }
        ha-card {
          display: block;
          padding: 12px 14px;
          overflow: hidden;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        /* -------- fan visual -------- */
        .visual {
          position: relative;
          width: 68px;
          height: 68px;
          flex: 0 0 68px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          background: radial-gradient(
            circle at 50% 50%,
            color-mix(in srgb, var(--ap-accent) 18%, transparent),
            transparent 70%
          );
          transition: background 0.4s ease;
        }
        .visual.off { background: none; }
        .pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--ap-accent);
          opacity: 0;
        }
        .visual.on[data-anim="blades"] .pulse { animation: pulse 2.6s ease-out infinite; }
        .visual.on[data-anim="blades"] .pulse:nth-child(2) { animation-delay: 0.87s; }
        .visual.on[data-anim="blades"] .pulse:nth-child(3) { animation-delay: 1.74s; }
        @keyframes pulse {
          0%   { transform: scale(0.62); opacity: 0.55; }
          100% { transform: scale(1.18); opacity: 0; }
        }
        svg { width: 68px; height: 68px; display: block; position: relative; }
        .ring {
          fill: none;
          stroke: var(--divider-color, rgba(127,127,127,0.25));
          stroke-width: 4;
        }
        .ring-value {
          fill: none;
          stroke: var(--ap-accent);
          stroke-width: 4;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 50px 50px;
          transition: stroke-dashoffset 0.5s ease, stroke 0.4s ease;
        }
        .blades, .core, .comet, .vent {
          fill: var(--ap-accent);
          transition: fill 0.4s ease;
        }
        .ripple, .wave path, .trail {
          fill: none;
          stroke: var(--ap-accent);
          transition: stroke 0.4s ease;
        }
        .hub { fill: var(--card-background-color, #fff); }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* blades: the fan itself turns, faster at higher speeds */
        .blades { transform-origin: 50px 50px; }
        .visual.on .blades { animation: spin var(--spin, 2s) linear infinite; }

        /* pulse: rings breathing out of the centre */
        .ripple {
          stroke-width: 3;
          transform-origin: 50px 50px;
          opacity: 0;
        }
        .visual.off .ripple:nth-of-type(1) { opacity: 0.35; }
        .visual.on .ripple { animation: ripple calc(var(--spin, 2s) * 2.4) ease-out infinite; }
        .visual.on .ripple:nth-of-type(2) { animation-delay: calc(var(--spin, 2s) * 0.8); }
        .visual.on .ripple:nth-of-type(3) { animation-delay: calc(var(--spin, 2s) * 1.6); }
        @keyframes ripple {
          0%   { transform: scale(0.3); opacity: 0.85; }
          100% { transform: scale(1); opacity: 0; }
        }

        /* waves: airflow sweeping upwards */
        .wave path { stroke-width: 4.2; stroke-linecap: round; }
        .wave { opacity: 0.5; }
        .visual.on .wave { animation: rise calc(var(--spin, 2s) * 1.7) linear infinite; }
        .visual.on .wave:nth-of-type(2) { animation-delay: calc(var(--spin, 2s) * 0.57); }
        .visual.on .wave:nth-of-type(3) { animation-delay: calc(var(--spin, 2s) * 1.13); }
        @keyframes rise {
          0%   { transform: translateY(18px); opacity: 0; }
          20%  { opacity: 0.9; }
          75%  { opacity: 0.7; }
          100% { transform: translateY(-24px); opacity: 0; }
        }

        /* orbit: a comet running around the dial */
        .orbit { transform-origin: 50px 50px; }
        .trail { stroke-width: 4; stroke-linecap: round; opacity: 0.3; }
        .visual.on .orbit { animation: spin var(--spin, 2s) linear infinite; }

        /* particles: dust lifted off the intake */
        .particle { opacity: 0; }
        .visual.off .particle { opacity: 0.3; }
        .visual.on .particle { animation: float calc(var(--spin, 2s) * 2.2) linear infinite; }
        .visual.on .particle:nth-of-type(2) { animation-delay: calc(var(--spin, 2s) * 0.44); }
        .visual.on .particle:nth-of-type(3) { animation-delay: calc(var(--spin, 2s) * 0.88); }
        .visual.on .particle:nth-of-type(4) { animation-delay: calc(var(--spin, 2s) * 1.32); }
        .visual.on .particle:nth-of-type(5) { animation-delay: calc(var(--spin, 2s) * 1.76); }
        @keyframes float {
          0%   { transform: translateY(12px); opacity: 0; }
          15%  { opacity: 0.95; }
          70%  { opacity: 0.6; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        /* -------- body -------- */
        .body { flex: 1; min-width: 0; }
        .head {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .name {
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .pct {
          font-size: 15px;
          font-weight: 600;
          color: var(--ap-accent);
          font-variant-numeric: tabular-nums;
        }
        .pct.off { color: var(--secondary-text-color); }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 18px;
          margin: 6px 0 2px;
          background: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(
            to right,
            var(--ap-accent) var(--fill, 0%),
            var(--divider-color, rgba(127,127,127,0.25)) var(--fill, 0%)
          );
        }
        input[type="range"]::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(
            to right,
            var(--ap-accent) var(--fill, 0%),
            var(--divider-color, rgba(127,127,127,0.25)) var(--fill, 0%)
          );
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -4px;
          border-radius: 50%;
          background: var(--ap-accent);
          box-shadow: 0 0 0 2px var(--card-background-color, #fff);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: none;
          border-radius: 50%;
          background: var(--ap-accent);
          box-shadow: 0 0 0 2px var(--card-background-color, #fff);
        }
        input[type="range"]:disabled { opacity: 0.45; cursor: default; }
        /* -------- chips -------- */
        .chips {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }
        .presets {
          display: flex;
          gap: 6px;
          margin-top: 6px;
        }
        .presets:empty { display: none; }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px 2px 6px;
          border-radius: 12px;
          font-size: 12px;
          line-height: 18px;
          background: var(--secondary-background-color, rgba(127,127,127,0.12));
          color: var(--secondary-text-color);
          cursor: pointer;
          white-space: nowrap;
        }
        .chip ha-icon { --mdc-icon-size: 14px; flex: 0 0 auto; }
        .chip span { overflow: hidden; text-overflow: ellipsis; }
        #pmChip { min-width: 0; }
        #rpmChip { flex: 0 0 auto; }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex: 0 0 8px;
        }
        .spacer { flex: 1; }
        .preset {
          border: none;
          font: inherit;
          font-size: 11px;
          line-height: 18px;
          padding: 2px 7px;
          border-radius: 11px;
          color: var(--secondary-text-color);
          background: var(--secondary-background-color, rgba(127,127,127,0.12));
          cursor: pointer;
        }
        .preset.active {
          background: var(--ap-accent);
          color: var(--text-primary-color, #fff);
        }
        /* -------- power -------- */
        .power {
          flex: 0 0 auto;
          border: none;
          background: none;
          padding: 6px;
          border-radius: 50%;
          cursor: pointer;
          color: var(--secondary-text-color);
          display: grid;
          place-items: center;
          transition: color 0.3s ease, background 0.3s ease;
        }
        .power.on {
          color: var(--ap-accent);
          background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
        }
        .power:hover { background: var(--secondary-background-color, rgba(127,127,127,0.18)); }
        .unavailable { opacity: 0.55; pointer-events: none; }
        .hidden { display: none !important; }
      </style>

      <ha-card>
        <div class="row">
          <div class="visual off" id="visual">
            <div class="pulse"></div><div class="pulse"></div><div class="pulse"></div>
            <svg viewBox="0 0 100 100">
              <defs>
                <clipPath id="disc"><circle cx="50" cy="50" r="36"></circle></clipPath>
              </defs>
              <circle class="ring" cx="50" cy="50" r="44"></circle>
              <circle class="ring-value" id="ringValue" cx="50" cy="50" r="44"
                      stroke-dasharray="276.46" stroke-dashoffset="276.46"></circle>
              <g id="art"></g>
            </svg>
          </div>

          <div class="body">
            <div class="head">
              <div class="name" id="name">Air Purifier</div>
              <div class="pct off" id="pct">Off</div>
              <button class="power" id="power" title="Toggle">
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            <input type="range" id="slider" min="0" max="100" step="1" value="0" />
            <div class="chips">
              <div class="chip hidden" id="pmChip">
                <span class="dot" id="pmDot"></span>
                <span id="pmText"></span>
              </div>
              <div class="spacer"></div>
              <div class="chip hidden" id="rpmChip">
                <ha-icon icon="mdi:fan"></ha-icon>
                <span id="rpmText"></span>
              </div>
            </div>
            <div class="presets" id="presets"></div>
          </div>
        </div>
      </ha-card>
    `;

    const $ = (id) => this.shadowRoot.getElementById(id);
    this._el = {
      card: this.shadowRoot.querySelector("ha-card"),
      visual: $("visual"),
      art: $("art"),
      ring: $("ringValue"),
      name: $("name"),
      pct: $("pct"),
      power: $("power"),
      slider: $("slider"),
      pmChip: $("pmChip"),
      pmDot: $("pmDot"),
      pmText: $("pmText"),
      rpmChip: $("rpmChip"),
      rpmText: $("rpmText"),
      presets: $("presets"),
    };

    this._el.visual.addEventListener("click", () => this._toggle());
    this._el.power.addEventListener("click", () => this._toggle());
    this._el.name.addEventListener("click", () =>
      fireEvent(this, "hass-more-info", { entityId: this._config.fan })
    );
    this._el.rpmChip.addEventListener("click", () =>
      fireEvent(this, "hass-more-info", { entityId: this._config.rpm })
    );
    this._el.pmChip.addEventListener("click", () =>
      fireEvent(this, "hass-more-info", { entityId: this._config.pm25 })
    );

    const slider = this._el.slider;
    slider.addEventListener("pointerdown", () => (this._dragging = true));
    slider.addEventListener("input", () => {
      this._dragging = true;
      this._paint(Number(slider.value), true);
    });
    slider.addEventListener("change", () => {
      this._dragging = false;
      this._setPercentage(Number(slider.value));
    });

    this._built = true;
    this._applyOptions();
  }

  /** Options that only change when the configuration changes. */
  _applyOptions() {
    const { animation, preset_align: align } = this._config;
    const el = this._el;
    if (el.visual.dataset.anim !== animation) {
      el.visual.dataset.anim = animation;
      el.art.innerHTML = ANIMATIONS[animation];
    }
    el.presets.style.justifyContent = PRESET_ALIGN[align];
  }

  // --------------------------------------------------------------- rendering

  _render() {
    const hass = this._hass;
    const cfg = this._config;
    if (!hass || !this._built) return;

    const fan = hass.states[cfg.fan];
    const rpm = cfg.rpm ? hass.states[cfg.rpm] : undefined;
    const pm = cfg.pm25 ? hass.states[cfg.pm25] : undefined;
    const el = this._el;

    const unavailable =
      !fan || fan.state === "unavailable" || fan.state === "unknown";
    el.card.classList.toggle("unavailable", unavailable);

    el.name.textContent =
      cfg.name || fan?.attributes?.friendly_name || cfg.fan;

    const on = !!fan && fan.state === "on";

    // Air quality drives the accent colour while the purifier runs. The chip's
    // dot keeps that colour even when it is off, everything else turns grey.
    const pmValue = num(pm);
    const level = aqLevel(pmValue);
    this._accent = pm ? level.color : null;
    if (pm) {
      el.pmChip.classList.remove("hidden");
      el.pmDot.style.background = level.color;
      const unit = pm.attributes.unit_of_measurement || "µg/m³";
      el.pmText.textContent =
        pmValue === null
          ? `PM2.5 ${pm.state}`
          : `${level.label} · ${pmValue.toFixed(1)} ${unit}`;
      el.pmChip.title = pm.attributes.friendly_name || cfg.pm25;
    } else {
      el.pmChip.classList.add("hidden");
    }

    const percentage = Math.round(
      fan?.attributes?.percentage ?? (on ? 100 : 0)
    );
    const step = fan?.attributes?.percentage_step;
    el.slider.step = step && step > 0 ? step : 1;
    el.slider.disabled = unavailable;
    if (!this._dragging) {
      el.slider.value = String(percentage);
      this._paint(percentage, on);
    }

    if (rpm) {
      const value = num(rpm);
      el.rpmChip.classList.remove("hidden");
      el.rpmText.textContent =
        value === null
          ? rpm.state
          : `${value.toLocaleString(hass.locale?.language || undefined)} ${
              rpm.attributes.unit_of_measurement || "RPM"
            }`;
      el.rpmChip.title = rpm.attributes.friendly_name || cfg.rpm;
    } else {
      el.rpmChip.classList.add("hidden");
    }

    this._renderPresets(percentage, on);
  }

  _renderPresets(percentage, on) {
    const el = this._el;
    if (!this._config.show_presets) {
      el.presets.innerHTML = "";
      return;
    }
    const presets = this._config.presets;
    if (el.presets.childElementCount !== presets.length) {
      el.presets.innerHTML = "";
      presets.forEach((value) => {
        const btn = document.createElement("button");
        btn.className = "preset";
        btn.textContent = `${value}%`;
        btn.addEventListener("click", () => this._setPercentage(value));
        el.presets.appendChild(btn);
      });
    }
    [...el.presets.children].forEach((btn, i) => {
      btn.classList.toggle("active", on && percentage === presets[i]);
    });
  }

  /** Paint accent colour, ring, spin speed and percentage label. */
  _paint(percentage, on) {
    const el = this._el;
    if (!on) {
      this.style.setProperty("--ap-accent", "var(--ap-idle-color)");
    } else if (this._accent) {
      this.style.setProperty("--ap-accent", this._accent);
    } else {
      this.style.removeProperty("--ap-accent");
    }
    const circumference = 2 * Math.PI * 44;
    el.ring.style.strokeDashoffset = String(
      circumference * (1 - percentage / 100)
    );
    el.slider.style.setProperty("--fill", `${percentage}%`);
    el.pct.textContent = on && percentage > 0 ? `${percentage}%` : on ? "On" : "Off";
    el.pct.classList.toggle("off", !on);
    el.power.classList.toggle("on", on);
    el.visual.classList.toggle("on", on);
    el.visual.classList.toggle("off", !on);
    // 3.2s at 1% down to 0.55s at 100%
    const duration = on
      ? Math.max(0.55, 3.2 - (2.65 * Math.max(percentage, 1)) / 100)
      : 0;
    if (on && this._lastPercentage !== percentage) {
      el.visual.style.setProperty("--spin", `${duration.toFixed(2)}s`);
    }
    this._lastPercentage = percentage;
  }

  // ---------------------------------------------------------------- services

  _toggle() {
    this._hass.callService("fan", "toggle", { entity_id: this._config.fan });
  }

  _setPercentage(percentage) {
    this._hass.callService("fan", "set_percentage", {
      entity_id: this._config.fan,
      percentage,
    });
  }
}

customElements.define("air-purifier-card", AirPurifierCard);

// ------------------------------------------------------------------- editor

const SCHEMA = [
  { name: "name", selector: { text: {} } },
  { name: "fan", required: true, selector: { entity: { domain: "fan" } } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "rpm", selector: { entity: { domain: "sensor" } } },
      { name: "pm25", selector: { entity: { domain: "sensor" } } },
    ],
  },
  {
    name: "animation",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "blades", label: "Spinning fan blades" },
          { value: "pulse", label: "Pulsing rings" },
          { value: "waves", label: "Rising airflow" },
          { value: "orbit", label: "Orbiting comet" },
          { value: "particles", label: "Floating particles" },
        ],
      },
    },
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_presets", selector: { boolean: {} } },
      {
        name: "preset_align",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
        },
      },
    ],
  },
];

class AirPurifierCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  _update() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.schema = SCHEMA;
      this._form.computeLabel = (schema) =>
        ({
          name: "Name",
          fan: "Fan entity (required)",
          rpm: "Fan speed sensor (RPM)",
          pm25: "Air quality sensor (PM2.5)",
          show_presets: "Show speed presets",
          animation: "Animation",
          preset_align: "Preset alignment",
        }[schema.name] || schema.name);
      this._form.addEventListener("value-changed", (ev) => {
        fireEvent(this, "config-changed", { config: ev.detail.value });
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.data = this._config;
  }
}

customElements.define("air-purifier-card-editor", AirPurifierCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "air-purifier-card",
  name: "Air Purifier Card",
  description:
    "Compact animated card to control a fan-based air purifier with RPM and PM2.5 readouts.",
  preview: true,
  documentationURL: "https://github.com/iharosi/air-purifier-card",
});
