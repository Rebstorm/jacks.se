import { StateUpdater } from "preact/hooks";
import { Obstacle } from "./obstacles.ts";
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "./constants.ts";

export type GameOverCallback = () => void;
export type ScoreCallback = () => void;

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
    const birdWidth = PLAYER_WIDTH;
    const birdHeight = PLAYER_HEIGHT;

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

let currentGradient: CanvasGradient | string = "";
let gradientChangeFrame = 0;
const framesPerGradientChange = 100;

// This function creates a new gradient and assigns it to currentGradient
function updateGradient(context, canvas) {
  const gradientStartX = 0;
  const gradientStartY = 0;
  const gradientEndX = 0;
  const gradientEndY = canvas.height;

  const gradient = context.createLinearGradient(
    gradientStartX,
    gradientStartY,
    gradientEndX,
    gradientEndY
  );

  gradient.addColorStop(0, getRandomColor());
  gradient.addColorStop(1, getRandomColor());

  // Update the current gradient
  currentGradient = gradient;
}
export const drawObstacles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
): void => {
  const obstacleWidth = PLAYER_WIDTH;
  const obstacleGap = 200;

  gradientChangeFrame++; // Increment the frame counter

  // If it's time to change the gradient, update it
  if (gradientChangeFrame % framesPerGradientChange === 0) {
    updateGradient(context, canvas);
  }

  // Use the current gradient to draw
  context.fillStyle = currentGradient;

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
