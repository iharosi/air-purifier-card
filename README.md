# Air Purifier Card

A compact, animated Lovelace card for a fan-based air purifier. The fan blades
spin faster as the speed goes up, and the whole card is tinted by the current
PM2.5 reading.

![Air Purifier Card in light and dark themes](images/screenshot.png)

![type: custom:air-purifier-card](https://img.shields.io/badge/type-custom%3Aair--purifier--card-03a9f4)

- Power toggle (tap the fan or the power button)
- 0–100 % speed slider + optional preset pills
- Live fan RPM and PM2.5 chips (tap for more-info)
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
| `show_presets` | boolean | `true` | Show the preset speed pills |
| `presets` | list | `[25, 50, 75, 100]` | Preset percentages |

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

There is no build step — `dist/air-purifier-card.js` is the shipped file.
Open `preview.html` in a browser to see the card with a mocked `hass` object.

## License

MIT
