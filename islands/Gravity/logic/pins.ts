import type { AbstractMesh } from "@babylonjs/core";
import { PIN_GRAVITY } from "./constants.ts";
import type { BallState, PinState } from "./types.ts";
import { resolveCollision } from "./collision.ts";

export function stepPins(
  pins: PinState[],
  ball: BallState,
  player: AbstractMesh,
  dt: number,
): boolean {
  let allFallen = true;

  for (const pin of pins) {
    if (pin.fallen) continue;
    allFallen = false;

    pin.angVelX += pin.rotX * PIN_GRAVITY * dt;
    pin.angVelZ += pin.rotZ * PIN_GRAVITY * dt;
    pin.angVelX *= 0.985;
    pin.angVelZ *= 0.985;
    pin.rotX += pin.angVelX * dt;
    pin.rotZ += pin.angVelZ * dt;

    const tilt = Math.sqrt(pin.rotX * pin.rotX + pin.rotZ * pin.rotZ);
    if (tilt >= Math.PI * 0.48) {
      pin.fallen = true;
      const s = (Math.PI * 0.5) / tilt;
      pin.mesh.rotation.x = pin.rotX * s;
      pin.mesh.rotation.z = pin.rotZ * s;
      pin.mesh.position.y = 0.19;
    } else {
      pin.mesh.rotation.x = pin.rotX;
      pin.mesh.rotation.z = pin.rotZ;
    }

    resolveCollision(ball, player, pin);
  }

  return allFallen;
}
