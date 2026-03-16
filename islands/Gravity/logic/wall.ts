import { Color3, MeshBuilder } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { CellMaterial } from "@babylonjs/materials";
import { BALL_RADIUS } from "./constants.ts";
import type { BallState } from "./types.ts";
import type { AbstractMesh } from "@babylonjs/core";

export interface WallData {
  xMin: number;
  xMax: number;
  zMin: number;
  zMax: number;
  height: number;
}

/**
 * Build a wall centered at (x, y) in top-down coords.
 * y maps to z in 3D space.
 */
export function buildWall(
  x: number,
  y: number,
  opts?: { width?: number; depth?: number; height?: number },
): WallData {
  const hw = (opts?.width ?? 2) / 2;
  const hd = (opts?.depth ?? 1) / 2;
  return {
    xMin: x - hw,
    xMax: x + hw,
    zMin: y - hd,
    zMax: y + hd,
    height: opts?.height ?? 2.5,
  };
}

function createWallMesh(scene: Scene, wall: WallData, index: number): void {
  const w = wall.xMax - wall.xMin;
  const d = wall.zMax - wall.zMin;
  const mesh = MeshBuilder.CreateBox(
    `wall_${index}`,
    { width: w, depth: d, height: wall.height },
    scene,
  );
  mesh.position.set(
    (wall.xMin + wall.xMax) / 2,
    wall.height / 2,
    (wall.zMin + wall.zMax) / 2,
  );

  const mat = new CellMaterial(`wallMat_${index}`, scene);
  mat.diffuseColor = new Color3(0.55, 0.52, 0.48); // stone gray
  mat.computeHighLevel = true;
  mesh.material = mat;
}

export function createWallMeshes(scene: Scene, walls: WallData[]): void {
  walls.forEach((wall, i) => createWallMesh(scene, wall, i));
}

export function resolveWallCollisions(
  ball: BallState,
  player: AbstractMesh,
  walls: WallData[],
): void {
  for (const wall of walls) {
    const { xMin, xMax, zMin, zMax, height } = wall;
    const bx = player.position.x;
    const by = player.position.y;
    const bz = player.position.z;

    // Skip if ball is fully above the wall
    if (by - BALL_RADIUS >= height) continue;

    // Closest point on wall footprint to ball center
    const cx = Math.max(xMin, Math.min(xMax, bx));
    const cz = Math.max(zMin, Math.min(zMax, bz));

    const dx = bx - cx;
    const dz = bz - cz;
    const dist2 = dx * dx + dz * dz;

    if (dist2 < BALL_RADIUS * BALL_RADIUS && dist2 > 0.00001) {
      const dist = Math.sqrt(dist2);
      const nx = dx / dist;
      const nz = dz / dist;
      const overlap = BALL_RADIUS - dist;
      player.position.x += nx * overlap;
      player.position.z += nz * overlap;
      const relVel = ball.velX * nx + ball.velZ * nz;
      if (relVel < 0) {
        ball.velX -= nx * relVel * 1.55;
        ball.velZ -= nz * relVel * 1.55;
      }
    }
  }
}
