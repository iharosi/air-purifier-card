/** The small slice of the Home Assistant frontend API that this card needs. */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    percentage?: number | null;
    percentage_step?: number;
    [key: string]: unknown;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale?: { language?: string };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ): Promise<unknown>;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export type AnimationName =
  | "blades"
  | "pulse"
  | "waves"
  | "orbit"
  | "particles"
  | "vortex";

export type PresetAlign = "left" | "center" | "right";

export interface AirPurifierCardConfig extends LovelaceCardConfig {
  /** Entity in the `fan` domain, providing power and percentage. */
  fan: string;
  /** Alias for `fan`, so the card also works with a plain `entity` key. */
  entity?: string;
  name?: string;
  /** Sensor holding the fan speed in RPM. */
  rpm?: string;
  /** Sensor holding the PM2.5 value. */
  pm25?: string;
  animation: AnimationName;
  show_presets: boolean;
  presets: number[];
  preset_align: PresetAlign;
}

export interface AirQualityLevel {
  max: number;
  label: string;
  color: string;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
