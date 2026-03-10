import { DRAG_ACCEL } from "../logic/constants.ts";
import type { BallState } from "../logic/types.ts";

export interface DragRefs {
  isDragging: { current: boolean };
  lastPointer: { current: { x: number; y: number } | null };
}

/**
 * Attaches pointer-event listeners to the canvas.
 * Returns a cleanup function that removes them.
 */
export function attachDragControls(
  canvas: HTMLCanvasElement,
  refs: DragRefs,
): () => void {
  const onDown = (e: PointerEvent) => {
    e.preventDefault();
    refs.isDragging.current = true;
    refs.lastPointer.current = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId);
  };

  const onMove = (e: PointerEvent) => {
    if (!refs.isDragging.current) return;
    refs.lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onUp = () => {
    refs.isDragging.current = false;
    refs.lastPointer.current = null;
  };

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  return () => {
    canvas.removeEventListener("pointerdown", onDown);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerup", onUp);
    canvas.removeEventListener("pointercancel", onUp);
  };
}

/**
 * Called each frame. Translates pointer delta into ball velocity and returns
 * the new prevPointer to be stored for the next frame.
 */
export function applyDragVelocity(
  ball: BallState,
  isDragging: boolean,
  lastPointer: { x: number; y: number } | null,
  prevPointer: { x: number; y: number } | null,
  dt: number,
): { x: number; y: number } | null {
  if (isDragging && lastPointer && prevPointer) {
    // Screen right → world +X; screen up (neg dy) → world −Z (toward pins)
    ball.velX += (lastPointer.x - prevPointer.x) * DRAG_ACCEL * dt;
    ball.velZ -= (lastPointer.y - prevPointer.y) * DRAG_ACCEL * dt;
  }
  return isDragging && lastPointer ? { ...lastPointer } : null;
}
