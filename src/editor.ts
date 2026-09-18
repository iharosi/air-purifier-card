import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { ANIMATION_LABELS, ANIMATION_NAMES, EDITOR_NAME } from "./const";
import type { AirPurifierCardConfig, HomeAssistant } from "./types";
import { fireEvent } from "./utils";

interface HaFormSchema {
  name: string;
  type?: string;
  required?: boolean;
  selector?: Record<string, unknown>;
  schema?: HaFormSchema[];
}

const SCHEMA: HaFormSchema[] = [
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
        options: ANIMATION_NAMES.map((value) => ({
          value,
          label: ANIMATION_LABELS[value],
        })),
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

const LABELS: Record<string, string> = {
  name: "Name",
  fan: "Fan entity (required)",
  rpm: "Fan speed sensor (RPM)",
  pm25: "Air quality sensor (PM2.5)",
  animation: "Animation",
  show_presets: "Show speed presets",
  preset_align: "Preset alignment",
};

@customElement(EDITOR_NAME)
export class AirPurifierCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AirPurifierCardConfig;

  public setConfig(config: AirPurifierCardConfig): void {
    this._config = config;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(schema: HaFormSchema) => LABELS[schema.name] ?? schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent<{ value: AirPurifierCardConfig }>): void {
    ev.stopPropagation();
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "air-purifier-card-editor": AirPurifierCardEditor;
  }
}
