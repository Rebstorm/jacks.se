export const PIN_POSITIONS: [number, number][] = [
  [0, 0],
  [-0.85, -1.7], [0.85, -1.7],
  [-1.7, -3.4], [0, -3.4], [1.7, -3.4],
];

export const BALL_RADIUS = 0.65;
export const PIN_HIT_RADIUS = 0.26;
export const BOUNDS = 10.5;

export const FRICTION = 2.2;    // deceleration (units/s²) when not dragging
export const DRAG_ACCEL = 18;   // how strongly pointer delta adds velocity
export const MAX_SPEED = 14;    // velocity cap

export const PIN_GRAVITY = 3.5; // acceleration factor for a tipped pin falling
