import { LitElement, html, nothing, svg, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

import { ANIMATIONS } from "./animations";
import {
  ANIMATION_NAMES,
  CARD_NAME,
  CARD_VERSION,
  DEFAULT_PRESETS,
  EDITOR_NAME,
  PRESET_ALIGN,
  SPIN_FASTEST,
  SPIN_SLOWEST,
} from "./const";
import { cardStyles } from "./styles";
import type {
  AirPurifierCardConfig,
  AnimationName,
  HassEntity,
  HomeAssistant,
  PresetAlign,
} from "./types";
import { airQualityLevel, clamp, fireEvent, numericState } from "./utils";

import "./editor";

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

@customElement(CARD_NAME)
export class AirPurifierCard extends LitElement {
  public static override styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AirPurifierCardConfig;

  /** Percentage shown while the slider is being dragged. */
  @state() private _sliding?: number;

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_NAME);
  }

  public static getStubConfig(hass: HomeAssistant): Partial<AirPurifierCardConfig> {
    const pick = (domain: string, ...hints: string[]): string => {
      const ids = Object.keys(hass?.states ?? {}).filter((id) =>
        id.startsWith(`${domain}.`)
      );
      return ids.find((id) => hints.every((hint) => id.includes(hint))) ?? ids[0] ?? "";
    };
    return {
      type: `custom:${CARD_NAME}`,
      name: "Air Purifier",
      fan: pick("fan", "purifier"),
      rpm: pick("sensor", "rpm"),
      pm25: pick("sensor", "pm"),
    };
  }

  public setConfig(config: Partial<AirPurifierCardConfig>): void {
    const fan = config.fan ?? config.entity;
    if (!fan) {
      throw new Error("You need to define a `fan` entity (domain: fan).");
    }
    if (!fan.startsWith("fan.")) {
      throw new Error("`fan` must be an entity from the `fan` domain.");
    }

    this._config = {
      ...config,
      type: config.type ?? `custom:${CARD_NAME}`,
      fan,
      animation: ANIMATION_NAMES.includes(config.animation as AnimationName)
        ? (config.animation as AnimationName)
        : "blades",
      show_presets: config.show_presets !== false,
      presets: config.presets ?? DEFAULT_PRESETS,
      preset_align:
        config.preset_align && config.preset_align in PRESET_ALIGN
          ? (config.preset_align as PresetAlign)
          : "left",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  /** Drop the dragged value once Home Assistant reports it back. */
  protected override willUpdate(changed: Map<string, unknown>): void {
    if (!changed.has("hass") || this._sliding === undefined) return;
    if (this._percentage() === this._sliding) this._sliding = undefined;
  }

  protected override render(): TemplateResult | typeof nothing {
    const config = this._config;
    if (!this.hass || !config) return nothing;

    const fan = this.hass.states[config.fan] as HassEntity | undefined;
    const rpm = config.rpm ? this.hass.states[config.rpm] : undefined;
    const pm = config.pm25 ? this.hass.states[config.pm25] : undefined;

    const unavailable = !fan || fan.state === "unavailable" || fan.state === "unknown";
    const on = fan?.state === "on";
    const percentage = this._sliding ?? this._percentage();

    // The air quality colour tints the card while the purifier runs; when it
    // is off everything falls back to the idle grey, except the chip's dot.
    const level = airQualityLevel(numericState(pm));
    const accent = on ? (pm ? level.color : undefined) : "var(--ap-idle-color)";

    return html`
      <ha-card
        class=${classMap({ unavailable })}
        style=${styleMap(accent ? { "--ap-accent": accent } : {})}
      >
        <div class="row">
          ${this._renderDial(config.animation, on, percentage)}
          <div class="body">
            <div class="head">
              <div class="name" @click=${this._moreInfoFan}>
                ${config.name ?? fan?.attributes.friendly_name ?? config.fan}
              </div>
              <div class="pct ${classMap({ off: !on })}">
                ${on ? (percentage > 0 ? `${percentage}%` : "On") : "Off"}
              </div>
              <button class="power ${classMap({ on })}" title="Toggle" @click=${this._toggle}>
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step=${fan?.attributes.percentage_step || 1}
              .value=${String(percentage)}
              ?disabled=${unavailable}
              style=${styleMap({ "--fill": `${percentage}%` })}
              @input=${this._sliderInput}
              @change=${this._sliderChange}
            />
            <div class="chips">
              ${this._renderPm(pm, level.label, level.color)}
              <div class="spacer"></div>
              ${this._renderRpm(rpm)}
            </div>
            ${this._renderPresets(percentage, on)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderDial(
    animation: AnimationName,
    on: boolean,
    percentage: number
  ): TemplateResult {
    // A full turn takes 3.2s just above zero and 0.55s at full speed.
    const duration =
      SPIN_SLOWEST - ((SPIN_SLOWEST - SPIN_FASTEST) * clamp(percentage, 1, 100)) / 100;

    return html`
      <div
        class="visual ${classMap({ on, off: !on })}"
        data-anim=${animation}
        style=${styleMap({ "--spin": `${duration.toFixed(2)}s` })}
        @click=${this._toggle}
      >
        <div class="pulse"></div>
        <div class="pulse"></div>
        <div class="pulse"></div>
        <svg viewBox="0 0 100 100">
          <defs>
            <clipPath id="disc"><circle cx="50" cy="50" r="36"></circle></clipPath>
          </defs>
          <circle class="ring" cx="50" cy="50" r=${RADIUS}></circle>
          ${svg`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r=${RADIUS}
            stroke-dasharray=${CIRCUMFERENCE}
            stroke-dashoffset=${CIRCUMFERENCE * (1 - percentage / 100)}
          ></circle>`}
          ${ANIMATIONS[animation]}
        </svg>
      </div>
    `;
  }

  private _renderPm(
    pm: HassEntity | undefined,
    label: string,
    color: string
  ): TemplateResult | typeof nothing {
    if (!pm) return nothing;
    const value = numericState(pm);
    const unit = pm.attributes.unit_of_measurement ?? "µg/m³";

    return html`
      <div
        class="chip pm"
        title=${pm.attributes.friendly_name ?? pm.entity_id}
        @click=${this._moreInfoPm}
      >
        <span class="dot" style=${styleMap({ background: color })}></span>
        <span>
          ${value === null ? `PM2.5 ${pm.state}` : `${label} · ${value.toFixed(1)} ${unit}`}
        </span>
      </div>
    `;
  }

  private _renderRpm(rpm: HassEntity | undefined): TemplateResult | typeof nothing {
    if (!rpm) return nothing;
    const value = numericState(rpm);
    const unit = rpm.attributes.unit_of_measurement ?? "RPM";

    return html`
      <div
        class="chip rpm"
        title=${rpm.attributes.friendly_name ?? rpm.entity_id}
        @click=${this._moreInfoRpm}
      >
        <ha-icon icon="mdi:fan"></ha-icon>
        <span>
          ${value === null
            ? rpm.state
            : `${value.toLocaleString(this.hass?.locale?.language)} ${unit}`}
        </span>
      </div>
    `;
  }

  private _renderPresets(percentage: number, on: boolean): TemplateResult | typeof nothing {
    const config = this._config!;
    if (!config.show_presets) return nothing;

    return html`
      <div
        class="presets"
        style=${styleMap({ justifyContent: PRESET_ALIGN[config.preset_align] })}
      >
        ${config.presets.map(
          (preset) => html`
            <button
              class="preset ${classMap({ active: on && percentage === preset })}"
              @click=${() => this._setPercentage(preset)}
            >
              ${preset}%
            </button>
          `
        )}
      </div>
    `;
  }

  private _percentage(): number {
    const fan = this.hass?.states[this._config!.fan];
    const on = fan?.state === "on";
    return Math.round(fan?.attributes.percentage ?? (on ? 100 : 0));
  }

  private _sliderInput(ev: Event): void {
    this._sliding = Number((ev.target as HTMLInputElement).value);
  }

  private _sliderChange(ev: Event): void {
    this._setPercentage(Number((ev.target as HTMLInputElement).value));
  }

  private _toggle(): void {
    this.hass?.callService("fan", "toggle", { entity_id: this._config!.fan });
  }

  private _setPercentage(percentage: number): void {
    this._sliding = percentage;
    this.hass?.callService("fan", "set_percentage", {
      entity_id: this._config!.fan,
      percentage,
    });
  }

  private _moreInfo(entityId?: string): void {
    if (entityId) fireEvent(this, "hass-more-info", { entityId });
  }

  private _moreInfoFan(): void {
    this._moreInfo(this._config?.fan);
  }

  private _moreInfoRpm(): void {
    this._moreInfo(this._config?.rpm);
  }

  private _moreInfoPm(): void {
    this._moreInfo(this._config?.pm25);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "air-purifier-card": AirPurifierCard;
  }
}

console.info(
  `%c AIR-PURIFIER-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: #1c1c1c; font-weight: 700;"
);

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: CARD_NAME,
  name: "Air Purifier Card",
  description:
    "Compact animated card to control a fan-based air purifier with RPM and PM2.5 readouts.",
  preview: true,
  documentationURL: "https://github.com/iharosi/air-purifier-card",
});
