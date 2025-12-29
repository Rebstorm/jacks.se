// logic/detectCollision.ts
import { Obstacle } from "../objects/obstacle.ts";

export const detectCollision = (
  playerX: number,
  playerY: number,
  playerRadius: number,
  obstacle: Obstacle,
  canvasHeight: number,
): boolean => {
  const dx = obstacle.x - playerX;
  const dy = obstacle.y - playerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Return true if a collision is detected
  return distance < playerRadius + obstacle.size;
};
