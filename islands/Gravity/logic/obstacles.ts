import { buildBump } from "./bump.ts";
import type { BumpData } from "./bump.ts";
import { buildRamp } from "./ramp.ts";
import type { RampData } from "./ramp.ts";

/**
 * Row 1 (z≈0, going +X): ramp into pins
 * Row 2 (z≈+9, above on screen): bump
 *
 * buildRamp(xFoot, zCenter, opts?)  — default length=6, depth=2.5, height=2.2
 * buildBump(xStart, zCenter, opts?) — default length=8, depth=2.5, height=2.0
 */
export const RAMPS: RampData[] = [
  buildRamp(15, 8, { length: 5 }),  // right of bump, top row
];

export const BUMPS: BumpData[] = [
  buildBump(3, 8, { length: 10, height: 2 }),  // top of screen
];

/**
 * Pin positions [x, z].
 * Row 1a — bowling triangle, lower on screen
 * Row 1b — cluster after the ramp, top row
 */
export const PIN_POSITIONS: [number, number][] = [
  // Row 1a: bowling triangle — lower
  [3,   -6  ],
  [4.5, -6.9], [4.5, -5.1],
  [6,   -7.8], [6,   -6  ], [6,   -4.2],

  // Row 1b: cluster after the ramp — top row, right side
  [22,   6  ], [22,   8  ], [22,  10  ],
  [23.5, 7  ], [23.5, 9  ],
];
