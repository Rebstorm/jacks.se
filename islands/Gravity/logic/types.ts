export type GameState = "idle" | "loading" | "playing" | "won";

export interface BallState {
  velX: number;
  velZ: number;
  velY: number;
}

// deno-lint-ignore no-explicit-any
export interface PinState {
  // deno-lint-ignore no-explicit-any
  mesh: any;
  origX: number;     // world X of the pin base
  origZ: number;     // world Z of the pin base
  fallDirX: number;  // unit XZ direction the pin falls toward
  fallDirZ: number;
  angle: number;     // current tilt: 0 = upright, PI/2 = flat
  angVel: number;    // angular velocity of the tipping rotation
  velX: number;      // ground-sliding velocity (active when flat)
  velZ: number;
}
