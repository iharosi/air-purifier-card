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

import type { AirQualityLevel, AnimationName, PresetAlign } from "./types";

export const CARD_VERSION = "2.3.0";

export const CARD_NAME = "air-purifier-card";
export const EDITOR_NAME = `${CARD_NAME}-editor`;

export const DEFAULT_PRESETS = [25, 50, 75, 100];

/** PM2.5 in µg/m³ mapped to a label and the colour the card is tinted with. */
export const AQ_LEVELS: AirQualityLevel[] = [
  { max: 12, label: "Excellent", color: "#43a047" },
  { max: 35, label: "Good", color: "#c0ca33" },
  { max: 55, label: "Moderate", color: "#fdd835" },
  { max: 150, label: "Poor", color: "#fb8c00" },
  { max: 250, label: "Unhealthy", color: "#e53935" },
  { max: Infinity, label: "Hazardous", color: "#8e24aa" },
];

export const UNKNOWN_LEVEL: AirQualityLevel = {
  max: Infinity,
  label: "Unknown",
  color: "var(--disabled-text-color, #9e9e9e)",
};

export const ANIMATION_NAMES: AnimationName[] = [
  "blades",
  "pulse",
  "waves",
  "orbit",
  "particles",
  "vortex",
];

export const ANIMATION_LABELS: Record<AnimationName, string> = {
  blades: "Spinning fan blades",
  pulse: "Pulsing rings",
  waves: "Rising airflow",
  orbit: "Orbiting comet",
  particles: "Floating particles",
  vortex: "Swirling vortex",
};

export const PRESET_ALIGN: Record<PresetAlign, string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

/** Slowest and fastest full turn of the dial, in seconds. */
export const SPIN_SLOWEST = 3.2;
export const SPIN_FASTEST = 0.55;
