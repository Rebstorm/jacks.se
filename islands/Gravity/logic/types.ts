export type GameState = "idle" | "loading" | "playing" | "won";

export interface BallState {
  velX: number;
  velZ: number;
}

// deno-lint-ignore no-explicit-any
export interface PinState {
  // deno-lint-ignore no-explicit-any
  mesh: any;
  angVelX: number;
  angVelZ: number;
  rotX: number;
  rotZ: number;
  fallen: boolean;
}
