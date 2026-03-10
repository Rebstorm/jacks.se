import type { AbstractMesh } from "@babylonjs/core";
import { BALL_RADIUS, PIN_HEIGHT, PIN_RADIUS } from "./constants.ts";
import type { RampData } from "./ramp.ts";
import type { BallState, PinState } from "./types.ts";

function resolveOneRampCollision(
  ball: BallState,
  player: AbstractMesh,
  ramp: RampData,
) {
  const { zCenter, halfDepth, xStart, xEnd, height } = ramp;
  const bx = player.position.x;
  const by = player.position.y;
  const bz = player.position.z;

  const zFront = zCenter - halfDepth;
  const zBack  = zCenter + halfDepth;

  // Height of the triangular side face at a given x (0 outside the ramp footprint)
  const faceH = (x: number) => {
    if (x < xStart || x > xEnd) return 0;
    return ((x - xStart) / (xEnd - xStart)) * height;
  };

  // ── Front face (z = zFront): ball approaching from the -Z side ──────────
  if (bz > zFront - BALL_RADIUS && bz < zFront + BALL_RADIUS &&
      bx >= xStart && bx <= xEnd &&
      by < faceH(bx) + BALL_RADIUS) {
    player.position.z = zFront - BALL_RADIUS;
    if (ball.velZ > 0) ball.velZ *= -0.55;
  }

  // ── Back face (z = zBack): ball approaching from the +Z side ───────────
  if (bz > zBack - BALL_RADIUS && bz < zBack + BALL_RADIUS &&
      bx >= xStart && bx <= xEnd &&
      by < faceH(bx) + BALL_RADIUS) {
    player.position.z = zBack + BALL_RADIUS;
    if (ball.velZ < 0) ball.velZ *= -0.55;
  }

  // ── Right wall (x = xEnd): block approach from the right ────────────────
  // Allow the ball to launch off the peak (velX > 0), only block inbound.
  if (bx > xEnd - BALL_RADIUS && bx < xEnd + BALL_RADIUS &&
      bz >= zFront && bz <= zBack &&
      by < height + BALL_RADIUS &&
      ball.velX < 0) {
    player.position.x = xEnd + BALL_RADIUS;
    ball.velX *= -0.55;
  }
}

/**
 * Resolves collisions against all ramps in the scene.
 */
export function resolveRampCollision(
  ball: BallState,
  player: AbstractMesh,
  ramps: RampData[],
) {
  for (const ramp of ramps) {
    resolveOneRampCollision(ball, player, ramp);
  }
}

/**
 * Push the ball out of a contact point at (cx, cz).
 * Returns the outward normal and pre-reflection relative velocity, or null.
 */
function pushOut(
  ball: BallState,
  player: AbstractMesh,
  cx: number,
  cz: number,
  minDist: number,
): { nx: number; nz: number; relVel: number } | null {
  const dx = player.position.x - cx;
  const dz = player.position.z - cz;
  const dist = Math.sqrt(dx * dx + dz * dz);
  const overlap = minDist - dist;
  if (overlap <= 0 || dist <= 0.001) return null;

  const nx = dx / dist;
  const nz = dz / dist;
  player.position.x += nx * overlap;
  player.position.z += nz * overlap;

  return { nx, nz, relVel: ball.velX * nx + ball.velZ * nz };
}

export function resolveCollision(
  ball: BallState,
  player: AbstractMesh,
  pin: PinState,
) {
  const px = pin.mesh.position.x;
  const pz = pin.mesh.position.z;
  const minDist = BALL_RADIUS + PIN_RADIUS;

  if (pin.angle >= Math.PI / 2) {
    // ── Fallen pin: capsule collision, pin can slide away ──────────────────
    // Skip if ball is airborne above the lying cylinder
    if (player.position.y - BALL_RADIUS > pin.mesh.position.y + PIN_RADIUS) return;

    // Capsule axis = fallDir (sin(PI/2) = 1). Find closest point on segment.
    const halfLen = PIN_HEIGHT / 2;
    const t = Math.max(
      -halfLen,
      Math.min(halfLen, (player.position.x - px) * pin.fallDirX + (player.position.z - pz) * pin.fallDirZ),
    );
    const hit = pushOut(ball, player, px + pin.fallDirX * t, pz + pin.fallDirZ * t, minDist);
    if (hit && hit.relVel < 0) {
      const { nx, nz, relVel } = hit;
      ball.velX -= nx * relVel * 1.3;
      ball.velZ -= nz * relVel * 1.3;
      // Pin slides away from ball (Newton's 3rd law: force is in -normal direction)
      const impact = Math.abs(relVel);
      pin.velX -= nx * impact * 0.5;
      pin.velZ -= nz * impact * 0.5;
    }
  } else {
    // ── Standing pin: circular collision + tipping impulse ─────────────────
    const dx = player.position.x - px;
    const dz = player.position.z - pz;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const overlap = minDist - dist;
    if (overlap <= 0 || dist <= 0.001) return;

    // Normal points from pin toward ball
    const enx = dx / dist;
    const enz = dz / dist;
    player.position.x += enx * overlap;
    player.position.z += enz * overlap;

    const relVel = ball.velX * enx + ball.velZ * enz;
    if (relVel < 0) {
      ball.velX -= enx * relVel * 1.3;
      ball.velZ -= enz * relVel * 1.3;

      const impact = Math.abs(relVel) * 0.65;
      // Pin falls AWAY from ball: fall direction = -normal (from ball toward pin)
      if (pin.angle < 0.05) {
        pin.fallDirX = -enx;
        pin.fallDirZ = -enz;
      }
      pin.angVel += impact;
    }
  }
}
