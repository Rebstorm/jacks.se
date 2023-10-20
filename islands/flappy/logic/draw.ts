import { StateUpdater } from "preact/hooks";
import { Obstacle } from "./obstacles.ts";

export type GameOverCallback = () => void;
export type ScoreCallback = () => void;

const totalFrames = 5;
const spriteSheetWidth = 1005; // total width of your sprite sheet
const spriteHeight = 252; // the height of your sprite sheet (and each individual frame)

const spriteWidth = spriteSheetWidth / totalFrames; // the width of each frame

const sX = 0; // because we're drawing the first frame
const sY = 0;

const dX = 200; // x-coordinate on the canvas
const dY = 200; // y-coordinate on the canvas
const dWidth = 20; // width of the drawn image in canvas
const dHeight = 20; // height of the drawn image in canvas

export const drawBird = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  birdY: number,
  birdVelocity: number,
  setBirdY: StateUpdater<number>,
  setBirdVelocity: StateUpdater<number>,
  birdImage: HTMLImageElement | null // new parameter here
): void => {
  // Clear the previous drawing
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (birdImage) {
    // Calculate rotation based on velocity
    const rotation = Math.atan(birdVelocity / 10); // adjust sensitivity as needed

    // The desired width and height
    const birdWidth = 70;
    const birdHeight = 70;

    // Save the current context state
    context.save();

    // Translate and rotate the context to draw the bird with rotation
    context.translate(100 + birdWidth / 2, birdY + birdHeight / 2); // move to the center of the bird
    context.rotate(rotation);

    // Draw bird, specifying the width and height
    // We draw the bird around its center point
    context.drawImage(
      birdImage,
      -birdWidth / 2,
      -birdHeight / 2,
      birdWidth,
      birdHeight
    ); // Bird's position and size

    // Restore the context's state - this is important, as it prevents future drawings from being affected
    context.restore();
  }

  // Gravity effect and bird's movement
  setBirdVelocity((v: number) => v + 0.01); // Gravity
  setBirdY((prevY: number) => prevY + birdVelocity);
};

export const drawObstacles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
): void => {
  const obstacleWidth = 50;
  const obstacleGap = 200;
  context.fillStyle = "blue";

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
