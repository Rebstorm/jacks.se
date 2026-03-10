import type { AbstractMesh } from "@babylonjs/core";
import { BALL_RADIUS, BOUNDS, FRICTION, MAX_SPEED } from "./constants.ts";
import { getActiveRamp, getRampHeight, getRampSlope } from "./ramp.ts";
import type { RampData } from "./ramp.ts";
import type { BallState } from "./types.ts";

const GRAVITY = 24;

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
  ramps: RampData[],
) {
  // ── Horizontal movement (X / Z) ──────────────────────────────────────────
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

  // ── Vertical movement (Y) ────────────────────────────────────────────────
  const activeRamp = getActiveRamp(player.position.x, player.position.z, ramps);
  const rampH = activeRamp ? getRampHeight(player.position.x, player.position.z, activeRamp) : 0;
  const surfaceY = rampH + BALL_RADIUS;
  const onRampSurface = activeRamp !== null && rampH > 0 && player.position.y <= surfaceY + 0.05;

  if (onRampSurface && activeRamp) {
    // Ball is in contact with the ramp — follow the surface.
    // velY is set to the slope-derived launch velocity so that when the ball
    // reaches the ramp edge and becomes airborne it flies off correctly.
    player.position.y = surfaceY;
    ball.velY = ball.velX * getRampSlope(activeRamp); // +X travel → +Y launch velocity
  } else {
    // Ball is airborne or on flat ground — apply gravity.
    ball.velY -= GRAVITY * dt;
    const newY = player.position.y + ball.velY * dt;

    if (newY <= BALL_RADIUS) {
      // Landed on flat ground
      player.position.y = BALL_RADIUS;
      ball.velY = 0;
    } else {
      player.position.y = newY;
    }
  }

  // ── Visual roll ──────────────────────────────────────────────────────────
  if (spd > 0.05) {
    player.rotation.x += ball.velZ * dt * 0.8;
    player.rotation.z -= ball.velX * dt * 0.8;
  }
}
