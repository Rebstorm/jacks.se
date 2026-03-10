import type { AbstractMesh } from "@babylonjs/core";
import { BALL_RADIUS, BOUNDS, FRICTION, MAX_SPEED } from "./constants.ts";
import { getActiveBump, getBumpHeight, getBumpSlope } from "./bump.ts";
import type { BumpData } from "./bump.ts";
import { getActiveRamp, getRampHeight, getRampSlope } from "./ramp.ts";
import type { RampData } from "./ramp.ts";
import type { BallState } from "./types.ts";

const GRAVITY = 13;
const BOUNCE = 0.45; // restitution — fraction of velY reflected on floor impact

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
  bumps: BumpData[],
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
  const bx = player.position.x;
  const bz = player.position.z;

  const activeRamp = getActiveRamp(bx, bz, ramps);
  const activeBump = getActiveBump(bx, bz, bumps);
  const rampH = activeRamp ? getRampHeight(bx, bz, activeRamp) : 0;
  const bumpH = activeBump ? getBumpHeight(bx, bz, activeBump) : 0;

  const surfaceH = Math.max(rampH, bumpH);
  const surfaceY = surfaceH + BALL_RADIUS;
  const onSurface = surfaceH > 0 && player.position.y <= surfaceY + 0.05;

  if (onSurface) {
    player.position.y = surfaceY;
    if (rampH >= bumpH && activeRamp) {
      ball.velY = ball.velX * getRampSlope(activeRamp);
    } else if (activeBump) {
      ball.velY = ball.velX * getBumpSlope(bx, activeBump);
    }
  } else {
    ball.velY -= GRAVITY * dt;
    const newY = player.position.y + ball.velY * dt;
    if (newY <= BALL_RADIUS) {
      player.position.y = BALL_RADIUS;
      ball.velY = Math.abs(ball.velY) > 0.5 ? -ball.velY * BOUNCE : 0;
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
