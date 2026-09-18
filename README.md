# Air Purifier Card

A compact, animated Lovelace card for a fan-based air purifier. The fan blades
spin faster as the speed goes up, and the whole card is tinted by the current
PM2.5 reading.

![Air Purifier Card in light and dark themes](images/screenshot.png)

![type: custom:air-purifier-card](https://img.shields.io/badge/type-custom%3Aair--purifier--card-03a9f4)

- Power toggle (tap the fan or the power button)
- 0–100 % speed slider + optional preset pills
- Live fan RPM and PM2.5 chips (tap for more-info)
- Five animations to pick from, all following the fan speed
- Accent colour follows air quality (Excellent → Hazardous)
- No dependencies, no build step, works with the visual editor

## Installation

### HACS (recommended)

1. HACS → **Frontend** → ⋮ → **Custom repositories**
2. Add `https://github.com/iharosi/air-purifier-card`, category **Dashboard** (plugin)
3. Install **Air Purifier Card**, then reload your browser

### Manual

1. Copy `dist/air-purifier-card.js` to `<config>/www/air-purifier-card.js`
2. Settings → Dashboards → ⋮ → **Resources** → add
   `/local/air-purifier-card.js` as a **JavaScript module**

## Usage

```yaml
type: custom:air-purifier-card
name: Office Air Purifier
fan: fan.air_purifier_1_pwm_fan
rpm: sensor.air_purifier_1_fan_rpm
pm25: sensor.office_air_quality_sensor_pm_summary
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | **required** | `custom:air-purifier-card` |
| `fan` | string | **required** | Entity in the `fan` domain (power + percentage) |
| `name` | string | friendly name | Title shown on the card |
| `rpm` | string | – | Sensor with the fan speed in RPM |
| `pm25` | string | – | Sensor with the PM2.5 value in µg/m³ |
| `animation` | string | `blades` | Dial animation, see below |
| `show_presets` | boolean | `true` | Show the preset speed pills |
| `presets` | list | `[25, 50, 75, 100]` | Preset percentages |
| `preset_align` | string | `left` | Preset row alignment: `left`, `center` or `right` |

## Animations

Every animation runs only while the purifier is on and follows the fan
percentage: the higher the speed, the faster it moves.

![The five animations](images/animations.png)

| `animation` | What it looks like |
| --- | --- |
| `blades` (default) | The fan blades turn, with airflow rings around the dial |
| `pulse` | Rings breathe outwards from the centre |
| `waves` | Airflow arcs sweep upwards through the dial |
| `orbit` | A comet runs around the dial |
| `particles` | Dust rises off the intake |
| `vortex` | Arcs swirl into each other, inner rings turning the other way |

```yaml
type: custom:air-purifier-card
fan: fan.air_purifier_1_pwm_fan
rpm: sensor.air_purifier_1_fan_rpm
pm25: sensor.office_air_quality_sensor_pm_summary
animation: waves
preset_align: right
```

## Air quality colours

| PM2.5 (µg/m³) | Label | Colour |
| --- | --- | --- |
| ≤ 12 | Excellent | green |
| ≤ 35 | Good | lime |
| ≤ 55 | Moderate | yellow |
| ≤ 150 | Poor | orange |
| ≤ 250 | Unhealthy | red |
| > 250 | Hazardous | purple |

## Development

The card is written in TypeScript with [Lit](https://lit.dev) and bundled by
Rollup into a single ES module.

```bash
npm install
npm run build      # bundle src/ into dist/air-purifier-card.js
npm run watch      # rebuild on change
npm run typecheck  # tsc --noEmit
```

`dist/air-purifier-card.js` is committed so the card can be installed straight
from the repository, and CI fails if it does not match the sources.

```
src/
  air-purifier-card.ts  the card element
  editor.ts             the visual editor (ha-form)
  animations.ts         the dial artwork, one template per animation
  styles.ts             the stylesheet
  const.ts              version, air quality levels, defaults
  types.ts              the slice of the Home Assistant API the card uses
  utils.ts              small helpers
```

## License

[GPL-3.0-or-later](LICENSE). In plain words:

- **You can** use, copy, change and share this card, for any purpose, for free.
- **If you share a changed version**, you have to publish its source under the
  same license.
- **No warranty** — it comes as is.
