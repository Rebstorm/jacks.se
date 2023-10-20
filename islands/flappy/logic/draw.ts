import { StateUpdater } from "preact/hooks";
import { Obstacle } from "./obstacles.ts";

export type GameOverCallback = () => void;
export type ScoreCallback = () => void;

export const drawBird = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  birdY: number,
  birdVelocity: number,
  setBirdY: StateUpdater<number>,
  setBirdVelocity: StateUpdater<number>
): void => {
  // Clear the previous drawing
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  context.fillStyle = "red";
  context.fillRect(100, birdY, 20, 20); // Bird's position and size

  // Gravity effect and bird's movement
  setBirdVelocity((v) => v + 0.01); // Gravity
  setBirdY((prevY) => prevY + birdVelocity);
};

export const drawObstacles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
): void => {
  const obstacleWidth = 50;
  const obstacleGap = 200;
  context.fillStyle = "green";

  obstacles.forEach((obstacle) => {
    context.fillRect(obstacle.x, 0, obstacleWidth, obstacle.gapHeight);
    context.fillRect(
      obstacle.x,
      obstacle.gapHeight + obstacleGap,
      obstacleWidth,
      canvas.height
    );
  });
};
