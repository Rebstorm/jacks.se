export const PIN_POSITIONS: [number, number][] = [
  [0, 0],
  [-0.85, -1.7], [0.85, -1.7],
  [-1.7, -3.4], [0, -3.4], [1.7, -3.4],
];

export const BALL_RADIUS = 0.65;
export const PIN_RADIUS = 0.32;    // log radius — chunkier than a bowling pin
export const PIN_HEIGHT = 1.1;     // log height — short and stocky
export const BOUNDS = 25;

export const FRICTION = 2.2;    // deceleration (units/s²) when not dragging
export const DRAG_ACCEL = 18;   // how strongly pointer delta adds velocity
export const MAX_SPEED = 14;    // velocity cap

export const PIN_GRAVITY = 4.5;       // angular acceleration while tipping
export const PIN_SLIDE_FRICTION = 3.5; // ground friction for a fallen sliding pin
