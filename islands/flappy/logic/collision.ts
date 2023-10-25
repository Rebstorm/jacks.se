import { Obstacle } from "./obstacles.ts";
import { GameOverCallback, ScoreCallback } from "./draw.ts";
import { COLUMN_WIDTH, IS_SMALL_SCREEN } from "./constants.ts";

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
      birdX < obstacle.x + COLUMN_WIDTH &&
      birdX + birdWidth > obstacle.x &&
      (birdY < obstacle.gapHeight ||
        birdY + birdWidth > obstacle.gapHeight + 200); // Assuming obstacle gap is 200

    if (!isGameOver && hasCollision) {
      gameOverCallback();
      return; // A collision ends the game, so no further processing is needed
    }

    // Scoring logic: if the bird has passed the obstacle
    const passedObstacle = obstacle.x + COLUMN_WIDTH < birdX;
    if (!isGameOver && passedObstacle && index === obstacles.length - 1) {
      scoreCallback();
    }

    // Obstacle movement
    if (!isGameOver) {
      obstacle.x -= IS_SMALL_SCREEN ? 1 : 2;
    }
  });
};
