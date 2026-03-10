import type { AbstractMesh } from "@babylonjs/core";
import { BALL_RADIUS, PIN_HIT_RADIUS } from "./constants.ts";
import type { BallState, PinState } from "./types.ts";

export function resolveCollision(
  ball: BallState,
  player: AbstractMesh,
  pin: PinState,
) {
  const cx = player.position.x - pin.mesh.position.x;
  const cz = player.position.z - pin.mesh.position.z;
  const dist = Math.sqrt(cx * cx + cz * cz);
  const overlap = BALL_RADIUS + PIN_HIT_RADIUS - dist;

  if (overlap <= 0 || dist <= 0.001) return;

  const nx = cx / dist;
  const nz = cz / dist;

  player.position.x += nx * overlap * 0.5;
  player.position.z += nz * overlap * 0.5;

  const relVel = ball.velX * nx + ball.velZ * nz;
  if (relVel < 0) {
    const bounce = relVel * 1.3;
    ball.velX -= nx * bounce;
    ball.velZ -= nz * bounce;

    const impact = Math.abs(relVel) * 0.65;
    pin.angVelX += nz * impact;
    pin.angVelZ -= nx * impact;
  }
}
