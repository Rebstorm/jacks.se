import { StateUpdater } from "preact/hooks";
import { Obstacle } from "./obstacles.ts";
import { COLUMN_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH } from "./constants.ts";

export type GameOverCallback = () => void;
export type ScoreCallback = () => void;

export const drawPlayer = (
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
    const playerWidth = PLAYER_WIDTH;
    const playerHeight = PLAYER_HEIGHT;

    // Save the current context state
    context.save();

    context.translate(100 + playerWidth / 2, birdY + playerHeight / 2); // move to the center of the bird
    context.rotate(rotation);

    // We draw the player around its center point
    context.drawImage(
      birdImage,
      -playerWidth / 2,
      -playerHeight / 2,
      playerWidth,
      playerHeight
    );

    // Restore the context's state - this is important, as it prevents future drawings from being affected
    context.restore();
  }

  // Gravity effect and bird's movement
  setBirdVelocity((v: number) => v + 0.01); // Gravity
  setBirdY((prevY: number) => prevY + birdVelocity);
};

let currentColor = getRandomColor(); // getRandomColor is your function that generates a random color.
let frameCount = 0;
const framesPerColorChange = 200; // for example, change color every 200 frames.

export const drawObstacles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
): void => {
  const obstacleWidth = COLUMN_WIDTH;
  const obstacleGap = 200;

  frameCount++; // Increment the frame counter

  // If it's time to change the color, update it
  if (frameCount % framesPerColorChange === 0) {
    currentColor = getRandomColor();
  }

  // Use the current color to draw
  context.fillStyle = currentColor;

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

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`; // returns a random color in rgb format
}
