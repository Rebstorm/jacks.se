import { buildRamp } from "./ramp.ts";
import type { RampData } from "./ramp.ts";

/**
 * All ramps in the level.
 * buildRamp(xFoot, zCenter, opts?) — xFoot is where the ball rolls on.
 * Default shape: length=6, depth=2.5, height=2.2
 */
export const RAMPS: RampData[] = [
  buildRamp(15, -2),
];

/**
 * All pins in the level. Each entry is [x, z] world position.
 * Pins are tall cylinders that fall over when hit.
 */
export const PIN_POSITIONS: [number, number][] = [
  [5,  0],
  [5, -2],
  [5,  2],
  [5, -1],
  [5,  1],
];
