import { buildBump } from "./bump.ts";
import type { BumpData } from "./bump.ts";
import { buildRamp } from "./ramp.ts";
import type { RampData } from "./ramp.ts";
import { buildWall } from "./wall.ts";
import type { WallData } from "./wall.ts";

// ─────────────────────────────────────────────────────────────────────────────
//  COURSE MAP  —  edit this file to design the level
//
//  Coordinate system (top-down view):
//
//            y = +25  (top of world)
//                 │
//    x = -25 ─────┼───── x = +25
//                 │
//            y = -25  (bottom of world)
//
//  Ball starts at (x=0, y=0).
//  y maps to z in 3D space.
//
//  Helpers:
//    wall(x, y, { width, depth, height? })     — solid box obstacle
//    ramp(x, y, { length?, height?, depth? })  — slope rising in +x direction
//    bump(x, y, { length?, height?, depth? })  — symmetric hill, peak at mid-x
//    pin (x, y)                                — knockable pin (target)
//
//  ramp/bump x = left edge,  y = center line
// ─────────────────────────────────────────────────────────────────────────────

const wall = buildWall;
const ramp = buildRamp;
const bump = buildBump;
const pin = (x: number, y: number): [number, number] => [x, y];

// ── WALLS ────────────────────────────────────────────────────────────────────

export const WALLS: WallData[] = [
  // Corridor walls — funnel ball through the middle section (y = 1 → 13)
  wall(-9,  7, { width: 1, depth: 12 }),   // left wall
  wall( 9,  7, { width: 1, depth: 12 }),   // right wall

  // Chicane 1 (y ≈ 4) — wall from the right, gap on the left
  wall( 3,  4, { width: 10, depth: 1.5 }),

  // Chicane 2 (y ≈ 9) — wall from the left, gap on the right
  wall(-3,  9, { width: 10, depth: 1.5 }),
];

// ── RAMPS ────────────────────────────────────────────────────────────────────

export const RAMPS: RampData[] = [
  // Launch ramp at top of corridor — rolls ball up before the goal area
  ramp(10, -5, { length: 5, height: 2 }),
];

// ── BUMPS ────────────────────────────────────────────────────────────────────

export const BUMPS: BumpData[] = [
  // Barrier below start — deflects ball sideways
  bump(-4, -15, { length: 8, height: 2 }),
  bump(5, -15, { length: 16, height: 2 }),

  // Bump near the goal — last obstacle before pins
  bump(-3, 18, { length: 6, height: 1.5 }),
];

// ── PINS  [x, y] ─────────────────────────────────────────────────────────────

export const PIN_POSITIONS: [number, number][] = [
  // Bowling triangle — just below start
  pin( 0,  -4),
  pin(-1.5, -5.5), pin(1.5, -5.5),
  pin(-3,   -7  ), pin(0,   -7  ), pin(3,  -7),

  // Scattered pins past the ramp
  pin(-6, 15), pin(0, 16), pin(6, 15),

  // Goal cluster at the top
  pin(-3, 21), pin(0, 21.5), pin(3, 21),
  pin(-1.5, 23), pin(1.5, 23),
];
