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

import { AQ_LEVELS, UNKNOWN_LEVEL } from "./const";
import type { AirQualityLevel, HassEntity } from "./types";

export const fireEvent = <T>(node: HTMLElement, type: string, detail: T): void => {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
};

/** The numeric state of an entity, or null when it is not a number. */
export const numericState = (entity?: HassEntity): number | null => {
  if (!entity) return null;
  const value = Number.parseFloat(entity.state);
  return Number.isNaN(value) ? null : value;
};

export const airQualityLevel = (value: number | null): AirQualityLevel => {
  if (value === null) return UNKNOWN_LEVEL;
  return AQ_LEVELS.find((level) => value <= level.max) ?? UNKNOWN_LEVEL;
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
