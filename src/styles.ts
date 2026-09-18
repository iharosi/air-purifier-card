/*
 * Air Purifier Card - a Lovelace card for Home Assistant
 * Copyright (C) 2026 Air Purifier Card contributors
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation. It is distributed WITHOUT ANY WARRANTY; see
 * the GNU General Public License in LICENSE for details.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 */

import { css } from "lit";

export const cardStyles = css`
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
  .visual.off {
    background: none;
  }
  .pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--ap-accent);
    opacity: 0;
  }
  .visual.on[data-anim="blades"] .pulse {
    animation: pulse 2.6s ease-out infinite;
  }
  .visual.on[data-anim="blades"] .pulse:nth-child(2) {
    animation-delay: 0.87s;
  }
  .visual.on[data-anim="blades"] .pulse:nth-child(3) {
    animation-delay: 1.74s;
  }
  @keyframes pulse {
    0% {
      transform: scale(0.62);
      opacity: 0.55;
    }
    100% {
      transform: scale(1.18);
      opacity: 0;
    }
  }
  svg {
    width: 68px;
    height: 68px;
    display: block;
    position: relative;
  }
  .ring {
    fill: none;
    stroke: var(--divider-color, rgba(127, 127, 127, 0.25));
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
  .blades,
  .core,
  .comet,
  .vent,
  .particle {
    fill: var(--ap-accent);
    transition: fill 0.4s ease;
  }
  .ripple,
  .wave path,
  .trail {
    fill: none;
    stroke: var(--ap-accent);
    transition: stroke 0.4s ease;
  }
  .hub {
    fill: var(--card-background-color, #fff);
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* blades: the fan itself turns, faster at higher speeds */
  .blades {
    transform-origin: 50px 50px;
  }
  .visual.on .blades {
    animation: spin var(--spin, 2s) linear infinite;
  }

  /* pulse: rings breathing out of the centre */
  .ripple {
    stroke-width: 3;
    transform-origin: 50px 50px;
    opacity: 0;
  }
  .visual.off .ripple:nth-of-type(1) {
    opacity: 0.35;
  }
  .visual.on .ripple {
    animation: ripple calc(var(--spin, 2s) * 2.4) ease-out infinite;
  }
  .visual.on .ripple:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.8);
  }
  .visual.on .ripple:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 1.6);
  }
  @keyframes ripple {
    0% {
      transform: scale(0.3);
      opacity: 0.85;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  /* waves: airflow sweeping upwards */
  .wave path {
    stroke-width: 4.2;
    stroke-linecap: round;
  }
  .wave {
    opacity: 0.5;
  }
  .visual.on .wave {
    animation: rise calc(var(--spin, 2s) * 1.7) linear infinite;
  }
  .visual.on .wave:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.57);
  }
  .visual.on .wave:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 1.13);
  }
  @keyframes rise {
    0% {
      transform: translateY(18px);
      opacity: 0;
    }
    20% {
      opacity: 0.9;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-24px);
      opacity: 0;
    }
  }

  /* orbit: a comet running around the dial */
  .orbit {
    transform-origin: 50px 50px;
  }
  .trail {
    stroke-width: 4;
    stroke-linecap: round;
    opacity: 0.3;
  }
  .visual.on .orbit {
    animation: spin var(--spin, 2s) linear infinite;
  }

  /* particles: dust lifted off the intake */
  .particle {
    opacity: 0;
  }
  .visual.off .particle {
    opacity: 0.3;
  }
  .visual.on .particle {
    animation: float calc(var(--spin, 2s) * 2.2) linear infinite;
  }
  .visual.on .particle:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.44);
  }
  .visual.on .particle:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 0.88);
  }
  .visual.on .particle:nth-of-type(4) {
    animation-delay: calc(var(--spin, 2s) * 1.32);
  }
  .visual.on .particle:nth-of-type(5) {
    animation-delay: calc(var(--spin, 2s) * 1.76);
  }
  @keyframes float {
    0% {
      transform: translateY(12px);
      opacity: 0;
    }
    15% {
      opacity: 0.95;
    }
    70% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-30px);
      opacity: 0;
    }
  }

  /* vortex: arcs swirling into each other */
  .swirl {
    fill: none;
    stroke: var(--ap-accent);
    stroke-linecap: round;
    stroke-width: 3.5;
    transform-origin: 50px 50px;
    transition: stroke 0.4s ease;
  }
  .swirl:nth-of-type(2) {
    stroke-width: 3;
  }
  .swirl:nth-of-type(3) {
    stroke-width: 2.5;
  }
  .visual.on .swirl {
    animation: spin var(--spin, 2s) linear infinite;
  }
  .visual.on .swirl:nth-of-type(2) {
    animation: spin calc(var(--spin, 2s) * 1.6) linear infinite reverse;
  }
  .visual.on .swirl:nth-of-type(3) {
    animation: spin calc(var(--spin, 2s) * 2.2) linear infinite;
  }

  /* -------- body -------- */
  .body {
    flex: 1;
    min-width: 0;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .name {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    cursor: pointer;
  }
  .pct {
    font-size: 15px;
    font-weight: 600;
    color: var(--ap-accent);
    font-variant-numeric: tabular-nums;
  }
  .pct.off {
    color: var(--secondary-text-color);
  }
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
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
    );
  }
  input[type="range"]::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--ap-accent) var(--fill, 0%),
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
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
  input[type="range"]:disabled {
    opacity: 0.45;
    cursor: default;
  }

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
  .presets:empty {
    display: none;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    line-height: 18px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--secondary-text-color);
    cursor: pointer;
    white-space: nowrap;
  }
  .chip ha-icon {
    --mdc-icon-size: 14px;
    flex: 0 0 auto;
  }
  .chip span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip.pm {
    min-width: 0;
  }
  .chip.rpm {
    flex: 0 0 auto;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: 0 0 8px;
  }
  .spacer {
    flex: 1;
  }
  .preset {
    border: none;
    font: inherit;
    font-size: 11px;
    line-height: 18px;
    padding: 2px 7px;
    border-radius: 11px;
    color: var(--secondary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
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
  .power:hover {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.18));
  }
  .unavailable {
    opacity: 0.55;
    pointer-events: none;
  }
`;
