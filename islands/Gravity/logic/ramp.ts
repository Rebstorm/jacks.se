import { Color3, Mesh, VertexData } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { CellMaterial } from "@babylonjs/materials";

export interface RampData {
  zCenter: number;
  halfDepth: number;
  xStart: number;
  xEnd: number;
  height: number;
  /** false (default): peak at xEnd, rises in +X.  true: peak at xStart, falls in +X. */
  reversed: boolean;
}

export function buildRamp(
  x: number,
  z: number,
  opts?: { length?: number; depth?: number; height?: number; reversed?: boolean },
): RampData {
  return {
    xStart: x,
    xEnd: x + (opts?.length ?? 6),
    zCenter: z,
    halfDepth: opts?.depth ?? 2.5,
    height: opts?.height ?? 2.2,
    reversed: opts?.reversed ?? false,
  };
}

/**
 * Signed slope for velY: positive = rises in +X, negative = falls in +X.
 */
export function getRampSlope(ramp: RampData): number {
  const s = ramp.height / (ramp.xEnd - ramp.xStart);
  return ramp.reversed ? -s : s;
}

/**
 * Returns the ramp surface height at world position (x, z).
 * Returns 0 if outside the ramp footprint.
 */
export function getRampHeight(x: number, z: number, ramp: RampData): number {
  if (Math.abs(z - ramp.zCenter) > ramp.halfDepth) return 0;
  if (x < ramp.xStart || x > ramp.xEnd) return 0;
  const t = (x - ramp.xStart) / (ramp.xEnd - ramp.xStart);
  return (ramp.reversed ? 1 - t : t) * ramp.height;
}

function createRampMesh(scene: Scene, ramp: RampData, index: number): void {
  const { zCenter, halfDepth, xStart, xEnd, height, reversed } = ramp;
  const d = halfDepth;

  // For a reversed ramp the foot (height=0) is at xEnd and the peak is at xStart.
  const xFoot = reversed ? xEnd : xStart;
  const xPeak = reversed ? xStart : xEnd;

  // Triangular prism — same topology for both orientations.
  // 0=foot-front  1=foot-back  2=base-front  3=base-back  4=peak-front  5=peak-back
  const positions = [
    xFoot, 0,      zCenter - d,
    xFoot, 0,      zCenter + d,
    xPeak, 0,      zCenter - d,
    xPeak, 0,      zCenter + d,
    xPeak, height, zCenter - d,
    xPeak, height, zCenter + d,
  ];
  const indices = [
    0, 3, 2,  0, 1, 3, // bottom
    0, 4, 1,  1, 4, 5, // slope
    2, 4, 3,  3, 4, 5, // peak wall
    0, 2, 4,            // front triangle
    1, 5, 3,            // back triangle
  ];
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);

  const vd = new VertexData();
  vd.positions = positions;
  vd.indices = indices;
  vd.normals = normals;

  const mesh = new Mesh(`ramp_${index}`, scene);
  vd.applyToMesh(mesh);

  const mat = new CellMaterial(`rampMat_${index}`, scene);
  mat.diffuseColor = new Color3(0.72, 0.54, 0.28);
  mat.computeHighLevel = true;
  mat.backFaceCulling = false;
  mesh.material = mat;
}

export function createRampMeshes(scene: Scene, ramps: RampData[]): void {
  ramps.forEach((ramp, i) => createRampMesh(scene, ramp, i));
}

/**
 * Returns the first ramp the ball is currently over, or null.
 */
export function getActiveRamp(
  x: number,
  z: number,
  ramps: RampData[],
): RampData | null {
  for (const r of ramps) {
    if (getRampHeight(x, z, r) > 0) return r;
  }
  return null;
}
