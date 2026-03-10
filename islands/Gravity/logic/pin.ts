import { Color3, MeshBuilder, Quaternion, Vector3 } from "@babylonjs/core";
import type { Mesh, Scene } from "@babylonjs/core";
import { CellMaterial } from "@babylonjs/materials";
import { PIN_GRAVITY, PIN_HEIGHT, PIN_RADIUS, PIN_SLIDE_FRICTION } from "./constants.ts";
import type { PinState } from "./types.ts";

export function createPinMeshes(scene: Scene, positions: [number, number][]): Mesh[] {
  const mat = new CellMaterial("pinMat", scene);
  mat.diffuseColor = new Color3(0.58, 0.38, 0.18); // warm wood brown — matches ramps
  mat.computeHighLevel = true;

  return positions.map(([x, z], i) => {
    const pin = MeshBuilder.CreateCylinder(
      `pin_${i}`,
      { diameter: PIN_RADIUS * 2, height: PIN_HEIGHT, tessellation: 16 },
      scene,
    );
    pin.position.set(x, PIN_HEIGHT / 2, z);
    pin.material = mat;
    return pin;
  });
}

export function initPins(meshes: Mesh[]): PinState[] {
  return meshes.map((mesh) => {
    mesh.rotationQuaternion = Quaternion.Identity();
    return {
      mesh,
      origX: mesh.position.x,
      origZ: mesh.position.z,
      fallDirX: 0,
      fallDirZ: 0,
      angle: 0,
      angVel: 0,
      velX: 0,
      velZ: 0,
    };
  });
}

/**
 * Update mesh transform so the pin pivots from its base.
 *
 * When the pin tilts by `angle` toward (fallDirX, fallDirZ), its local Y axis
 * traces an arc. Via Rodrigues' formula with rotation axis k = (fallDirZ, 0, -fallDirX):
 *   new_axis = (fallDirX·sin, cos, fallDirZ·sin)
 * So center = base + (h/2) * new_axis.
 */
function applyPose(pin: PinState) {
  const h2 = PIN_HEIGHT / 2;
  const sinA = Math.sin(pin.angle);
  const cosA = Math.cos(pin.angle);

  pin.mesh.position.x = pin.origX + h2 * pin.fallDirX * sinA;
  pin.mesh.position.y = h2 * cosA;
  pin.mesh.position.z = pin.origZ + h2 * pin.fallDirZ * sinA;

  if (pin.angle < 0.001) {
    pin.mesh.rotationQuaternion = Quaternion.Identity();
  } else {
    const axis = new Vector3(pin.fallDirZ, 0, -pin.fallDirX);
    pin.mesh.rotationQuaternion = Quaternion.RotationAxis(axis, pin.angle);
  }
}

export function updatePin(pin: PinState, dt: number) {
  const flat = Math.PI / 2;

  if (pin.angle >= flat) {
    // Flat on the ground — slide with friction
    const spd = Math.sqrt(pin.velX ** 2 + pin.velZ ** 2);
    if (spd > 0.01) {
      const decel = Math.min(PIN_SLIDE_FRICTION * dt, spd);
      const k = (spd - decel) / spd;
      pin.velX *= k;
      pin.velZ *= k;
      pin.origX += pin.velX * dt;
      pin.origZ += pin.velZ * dt;
      applyPose(pin);
    }
    return;
  }

  if (pin.angVel <= 0) return; // upright, not tipping

  // Tipping — constant angular acceleration (gravity)
  pin.angVel += PIN_GRAVITY * dt;
  pin.angle += pin.angVel * dt;
  if (pin.angle >= flat) {
    pin.angle = flat;
    pin.angVel = 0;
  }
  applyPose(pin);
}
