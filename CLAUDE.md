# Air Purifier Card

A custom Lovelace card for Home Assistant, installable through HACS. It controls
a fan-domain air purifier and shows fan RPM and PM2.5.

## Stack

TypeScript + [Lit](https://lit.dev) + Rollup. No framework beyond Lit, no test
runner, no linter.

```bash
npm install
npm run build      # src/ -> dist/air-purifier-card.js (ESM, terser, Lit inlined)
npm run watch
npm run typecheck  # tsc --noEmit, strict
```

## Layout

```
src/air-purifier-card.ts  the card element, config validation, services
src/editor.ts             the visual editor (ha-form schema and labels)
src/animations.ts         dial artwork, one lit `svg` template per animation
src/styles.ts             the whole stylesheet as a lit `css` template
src/const.ts              CARD_VERSION, air quality levels, defaults, labels
src/types.ts              the slice of the Home Assistant frontend API we use
src/utils.ts              fireEvent, numeric state, air quality lookup, clamp
dist/air-purifier-card.js the committed bundle, what HACS installs
```

## Rules that bite

- **`dist/` is committed.** CI runs `git diff --exit-code -- dist`, so rebuild
  and commit the bundle in the same commit as any source change.
- **Version lives in two places**: `version` in `package.json` and
  `CARD_VERSION` in `src/const.ts`. Keep them equal, and equal to the git tag.
- **Adding an animation** touches five files: the `AnimationName` union in
  `types.ts`, `ANIMATION_NAMES` and `ANIMATION_LABELS` in `const.ts`, the
  template in `animations.ts`, its keyframes in `styles.ts`, and the table in
  `README.md`. The editor dropdown and the config fallback derive from
  `ANIMATION_NAMES`, so they need no edit.
- **Every animation is driven by `--spin`**, set on `.visual` from the fan
  percentage, and must be still and grey when the purifier is off. Only the air
  quality dot keeps its colour in the off state.
- **Unknown `animation` or `preset_align` values fall back** to `blades` and
  `left` instead of throwing.

## Releases

Ask before cutting one. Committing and pushing to `main` needs no permission,
but `gh release create` and version tags do — small changes are not each worth a
release. The release workflow builds from source and attaches the bundle, so the
tag is what HACS serves.

## README images

`images/screenshot.png` and `images/animations.png` are rendered from the built
bundle in headless Chromium against a mocked `hass` object, using throwaway
pages (this machine has no Chrome, so `playwright-core` with
`npx playwright install chromium` does the work). Serve the bundle over http and
load it with `<script type="module">`; `file://` blocks ES modules. Size the
viewport to the body height before a `fullPage` capture, or the image gets
uneven padding. Regenerate both when the card's look changes.
