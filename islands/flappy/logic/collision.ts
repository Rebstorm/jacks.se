import { Obstacle } from "./obstacles.ts";
import { GameOverCallback, ScoreCallback } from "./draw.ts";
import {
  COLUMN_WIDTH,
  IS_SMALL_SCREEN,
  OBSTACLE_GAP,
  PLAYER_WIDTH,
} from "./constants.ts";

export const checkCollisionAndUpdate = (
  obstacles: Obstacle[],
  birdY: number,
  isGameOver: boolean,
  gameOverCallback: GameOverCallback,
  scoreCallback: ScoreCallback
): void => {
  const birdX = 100; // The bird's X position is fixed at 100 based on the drawing logic
  const birdWidth = PLAYER_WIDTH; // The bird's width is 20 based on the drawing logic

  obstacles.forEach((obstacle, index) => {
    // Collision detection logic
    const hasCollision =
      birdX < obstacle.x + COLUMN_WIDTH &&
      birdX + birdWidth > obstacle.x &&
      (birdY < obstacle.gapHeight ||
        birdY + birdWidth > obstacle.gapHeight + OBSTACLE_GAP);

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
      obstacle.x -= IS_SMALL_SCREEN ? 0.8 : 1;
    }
  });
};
