// logic/drawGame.ts
import { Obstacle } from "../objects/obstacle.ts";

export const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerX: number,
    obstacle: Obstacle | null,
    canvasWidth: number,
    canvasHeight: number
) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the player dot
    ctx.beginPath();
    ctx.arc(playerX, canvasHeight - 100, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#3498db";
    ctx.fill();

    // Draw the obstacle if it exists
    if (obstacle) {
        ctx.beginPath();
        ctx.arc(
            obstacle.x,
            canvasHeight - obstacle.size * 5,
            obstacle.size,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "#e74c3c";
        ctx.fill();
    }
};
