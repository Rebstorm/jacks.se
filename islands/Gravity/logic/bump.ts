import { Color3, Mesh, MeshBuilder, VertexData } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core";
import { CellMaterial } from "@babylonjs/materials";

export interface BumpData {
  zCenter: number;
  halfDepth: number;
  xStart: number;
  xEnd: number;
  height: number;
}

export function buildBump(
  x: number,
  z: number,
  opts?: { length?: number; depth?: number; height?: number },
): BumpData {
  return {
    xStart: x,
    xEnd: x + (opts?.length ?? 8),
    zCenter: z,
    halfDepth: opts?.depth ?? 2.5,
    height: opts?.height ?? 2.0,
  };
}

/** Surface height at (x, z) — rises to peak at the midpoint, symmetric. */
export function getBumpHeight(x: number, z: number, bump: BumpData): number {
  if (Math.abs(z - bump.zCenter) > bump.halfDepth) return 0;
  if (x < bump.xStart || x > bump.xEnd) return 0;
  const xMid = (bump.xStart + bump.xEnd) / 2;
  const t = x <= xMid
    ? (x - bump.xStart) / (xMid - bump.xStart)
    : (bump.xEnd - x) / (bump.xEnd - xMid);
  return t * bump.height;
}

/** Signed slope for velY at position x: positive on the uphill side, negative on the downhill side. */
export function getBumpSlope(x: number, bump: BumpData): number {
  const xMid = (bump.xStart + bump.xEnd) / 2;
  const halfLen = xMid - bump.xStart;
  return x <= xMid
    ? bump.height / halfLen
    : -(bump.height / halfLen);
}

export function getActiveBump(
  x: number,
  z: number,
  bumps: BumpData[],
): BumpData | null {
  for (const b of bumps) {
    if (getBumpHeight(x, z, b) > 0) return b;
  }
  return null;
}

function createBumpMesh(scene: Scene, bump: BumpData, index: number): void {
  const { zCenter, halfDepth, xStart, xEnd, height } = bump;
  const d = halfDepth;
  const xMid = (xStart + xEnd) / 2;

  // 8 vertices: left foot, peak, right foot, bottom-mid (for closing the base)
  // 0: left foot front   1: left foot back
  // 2: peak front        3: peak back
  // 4: right foot front  5: right foot back
  // 6: bottom-mid front  7: bottom-mid back
  const positions = [
    xStart, 0,      zCenter - d, // 0
    xStart, 0,      zCenter + d, // 1
    xMid,   height, zCenter - d, // 2
    xMid,   height, zCenter + d, // 3
    xEnd,   0,      zCenter - d, // 4
    xEnd,   0,      zCenter + d, // 5
    xMid,   0,      zCenter - d, // 6
    xMid,   0,      zCenter + d, // 7
  ];

  const indices = [
    0, 2, 1,  1, 2, 3, // left slope
    2, 4, 3,  3, 4, 5, // right slope
    0, 6, 1,  1, 6, 7, // left bottom
    6, 4, 7,  7, 4, 5, // right bottom
    0, 2, 6,  6, 2, 4, // front triangular face
    1, 7, 3,  7, 5, 3, // back triangular face
  ];

  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);

  const vd = new VertexData();
  vd.positions = positions;
  vd.indices = indices;
  vd.normals = normals;

  const mesh = new Mesh(`bump_${index}`, scene);
  vd.applyToMesh(mesh);

  const mat = new CellMaterial(`bumpMat_${index}`, scene);
  mat.diffuseColor = new Color3(0.72, 0.54, 0.28);
  mat.computeHighLevel = true;
  mat.backFaceCulling = false;
  mesh.material = mat;
}

export function createBumpMeshes(scene: Scene, bumps: BumpData[]): void {
  bumps.forEach((bump, i) => createBumpMesh(scene, bump, i));
}
