// logic/drawGame.ts
import { Obstacle } from "../objects/obstacle.ts";
import { Player } from "../objects/player.ts";
import { drawGround } from "./drawGround.ts";

export const drawGame = (
  ctx: CanvasRenderingContext2D,
  playerX: number,
  obstacles: Obstacle[],
  canvasWidth: number,
  canvasHeight: number,
) => {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw the ground (asphalt and lane marker)
  drawGround(ctx, canvasWidth, canvasHeight);

  // Draw the player
  const player = new Player(playerX, canvasHeight - 100);
  player.updateDirection(playerX);
  player.draw(ctx);

  // Draw obstacles
  obstacles.forEach((obstacle) => {
    ctx.beginPath();
    ctx.arc(obstacle.x, obstacle.y, obstacle.size, 0, Math.PI * 2);
    ctx.fillStyle = "#e74c3c";
    ctx.fill();
  });
};
