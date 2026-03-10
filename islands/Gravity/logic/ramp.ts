import { Color3, Mesh, MeshBuilder, VertexData } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { CellMaterial } from "@babylonjs/materials";

export interface RampData {
  zCenter: number;   // world-Z centre of the ramp
  halfDepth: number; // half-extent in Z (the "width" of the ramp)
  xStart: number;    // x where the ramp foot meets the ground (approach side)
  xEnd: number;      // x where the ramp peaks and the ball launches
  height: number;    // height at xEnd
}

export function buildRamp(
  x: number,
  z: number,
  opts?: { length?: number; depth?: number; height?: number },
): RampData {
  return {
    xStart: x,
    xEnd: x + (opts?.length ?? 6),
    zCenter: z,
    halfDepth: opts?.depth ?? 2.5,
    height: opts?.height ?? 2.2,
  };
}

export function getRampSlope(ramp: RampData): number {
  return ramp.height / (ramp.xEnd - ramp.xStart);
}

/**
 * Returns the ramp surface height at world position (x, z) for a given ramp.
 * Returns 0 if the position is outside the ramp footprint.
 */
export function getRampHeight(x: number, z: number, ramp: RampData): number {
  if (Math.abs(z - ramp.zCenter) > ramp.halfDepth) return 0;
  if (x < ramp.xStart || x > ramp.xEnd) return 0;
  const t = (x - ramp.xStart) / (ramp.xEnd - ramp.xStart);
  return t * ramp.height;
}

function createRampMesh(scene: Scene, ramp: RampData, index: number): void {
  const { zCenter, halfDepth, xStart, xEnd, height } = ramp;
  const d = halfDepth;

  // Triangular prism (wedge) — ramp faces right (+X direction).
  // Vertices: 0=foot-front, 1=foot-back, 2=base-front, 3=base-back, 4=peak-front, 5=peak-back
  const positions = [
    xStart, 0,      zCenter - d, // 0
    xStart, 0,      zCenter + d, // 1
    xEnd,   0,      zCenter - d, // 2
    xEnd,   0,      zCenter + d, // 3
    xEnd,   height, zCenter - d, // 4
    xEnd,   height, zCenter + d, // 5
  ];
  const indices = [
    0, 3, 2,  0, 1, 3, // bottom
    0, 4, 1,  1, 4, 5, // slope
    2, 4, 3,  3, 4, 5, // right wall
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
