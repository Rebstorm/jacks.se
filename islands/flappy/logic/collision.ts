import { Obstacle } from "./obstacles.ts";
import { GameOverCallback, ScoreCallback } from "./draw.ts";

export const checkCollisionAndUpdate = (
  obstacles: Obstacle[],
  birdY: number,
  isGameOver: boolean,
  gameOverCallback: GameOverCallback,
  scoreCallback: ScoreCallback
): void => {
  const birdX = 100; // The bird's X position is fixed at 100 based on the drawing logic
  const birdWidth = 20; // The bird's width is 20 based on the drawing logic

  obstacles.forEach((obstacle, index) => {
    // Collision detection logic
    const hasCollision =
      birdX < obstacle.x + 50 && // Assuming obstacle width is 50
      birdX + birdWidth > obstacle.x &&
      (birdY < obstacle.gapHeight ||
        birdY + birdWidth > obstacle.gapHeight + 200); // Assuming obstacle gap is 200

    if (!isGameOver && hasCollision) {
      gameOverCallback();
      return; // A collision ends the game, so no further processing is needed
    }

    // Scoring logic: if the bird has passed the obstacle
    const passedObstacle = obstacle.x + 50 < birdX;
    if (!isGameOver && passedObstacle && index === obstacles.length - 1) {
      scoreCallback();
    }

    // Move the obstacle leftward, simulating the bird's forward movement
    if (!isGameOver) {
      obstacle.x -= 2;
    }
  });
};
