import { svg, type SVGTemplateResult } from "lit";

import type { AnimationName } from "./types";

const BLADE = "M0 -7 C2 -20 5 -26 10.9 -26.9 A29 29 0 0 1 22.9 -17.9 C16 -14 9 -9 4.8 -5.7 Z";

/**
 * The artwork inside the dial, one entry per `animation` option. Every
 * variation is driven by the --spin custom property, so they all follow the
 * fan speed, and none of them animate while the purifier is off.
 */
export const ANIMATIONS: Record<AnimationName, SVGTemplateResult> = {
  blades: svg`
    <g class="blades">
      <g transform="translate(50,50)">
        <path transform="rotate(0)" d=${BLADE}></path>
        <path transform="rotate(72)" d=${BLADE}></path>
        <path transform="rotate(144)" d=${BLADE}></path>
        <path transform="rotate(216)" d=${BLADE}></path>
        <path transform="rotate(288)" d=${BLADE}></path>
      </g>
    </g>
    <circle class="hub" cx="50" cy="50" r="7"></circle>
    <circle class="core" cx="50" cy="50" r="3"></circle>
  `,

  pulse: svg`
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="ripple" cx="50" cy="50" r="34"></circle>
    <circle class="core" cx="50" cy="50" r="12"></circle>
  `,

  waves: svg`
    <g clip-path="url(#disc)">
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
      <g class="wave"><path d="M24 62 Q50 42 76 62"></path></g>
    </g>
  `,

  orbit: svg`
    <g class="orbit">
      <path class="trail" d="M50 14 A36 36 0 0 1 81 32"></path>
      <circle class="comet" cx="50" cy="14" r="5"></circle>
    </g>
    <circle class="core" cx="50" cy="50" r="9"></circle>
  `,

  particles: svg`
    <g clip-path="url(#disc)">
      <g class="particle"><circle cx="37" cy="58" r="4"></circle></g>
      <g class="particle"><circle cx="50" cy="60" r="3.2"></circle></g>
      <g class="particle"><circle cx="62" cy="57" r="4"></circle></g>
      <g class="particle"><circle cx="43" cy="61" r="2.8"></circle></g>
      <g class="particle"><circle cx="57" cy="59" r="3.4"></circle></g>
    </g>
    <rect class="vent" x="32" y="66" width="36" height="5" rx="2.5"></rect>
  `,
};
