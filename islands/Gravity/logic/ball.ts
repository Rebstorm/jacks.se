import type { AbstractMesh } from "@babylonjs/core";
import { BALL_RADIUS, BOUNDS, FRICTION, MAX_SPEED } from "./constants.ts";
import type { BallState } from "./types.ts";

export function clampSpeed(ball: BallState) {
  const spd = Math.sqrt(ball.velX * ball.velX + ball.velZ * ball.velZ);
  if (spd > MAX_SPEED) {
    const k = MAX_SPEED / spd;
    ball.velX *= k;
    ball.velZ *= k;
  }
}

export function updateBall(
  ball: BallState,
  player: AbstractMesh,
  dt: number,
  isDragging: boolean,
) {
  const spd = Math.sqrt(ball.velX * ball.velX + ball.velZ * ball.velZ);

  if (!isDragging && spd > 0.01) {
    const decel = Math.min(FRICTION * dt, spd);
    const k = 1 - decel / spd;
    ball.velX *= k;
    ball.velZ *= k;
  }

  let nx = player.position.x + ball.velX * dt;
  let nz = player.position.z + ball.velZ * dt;

  if (Math.abs(nx) + BALL_RADIUS > BOUNDS) {
    ball.velX *= -0.55;
    nx = player.position.x;
  }
  if (Math.abs(nz) + BALL_RADIUS > BOUNDS) {
    ball.velZ *= -0.55;
    nz = player.position.z;
  }

  player.position.x = nx;
  player.position.z = nz;

  if (spd > 0.05) {
    player.rotation.x += ball.velZ * dt * 0.8;
    player.rotation.z -= ball.velX * dt * 0.8;
  }
}
