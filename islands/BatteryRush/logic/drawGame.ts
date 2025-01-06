// logic/drawGame.ts
import { Obstacle } from "../objects/obstacle.ts";
import { drawGround } from "./drawGround.ts";

export const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerX: number,
    obstacles: Obstacle[],
    canvasWidth: number,
    canvasHeight: number
) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the ground (asphalt and lane marker)
    drawGround(ctx, canvasWidth, canvasHeight);

    // Draw player dot
    ctx.beginPath();
    ctx.arc(playerX, canvasHeight - 100, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#3498db";
    ctx.fill();

    // Draw obstacles
    obstacles.forEach((obstacle) => {
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, obstacle.size, 0, Math.PI * 2);
        ctx.fillStyle = "#e74c3c";
        ctx.fill();
    });
};
