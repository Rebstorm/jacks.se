import {
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_WIDTH,
  IS_SMALL_SCREEN,
  PLAYER_WIDTH,
} from "./constants.ts";
import { StateUpdater } from "preact/hooks";

export interface Obstacle {
  x: number;
  gapHeight: number;
}
export const generateObstacles = (
  obstacles: Obstacle[],
  setObstacles: StateUpdater<Obstacle[]>
) => {
  const obstacleInterval = setInterval(() => {
    const lastObstacle = obstacles[obstacles.length - 1];
    let newObstacleX = GAME_WINDOW_WIDTH;

    if (lastObstacle) {
      newObstacleX = lastObstacle.x + 300; // 300 pixels between obstacles
    }

    // Random height for the "gap" in the obstacles
    const randomGapHeight =
      Math.random() * (GAME_WINDOW_HEIGHT * 0.7) + PLAYER_WIDTH;

    setObstacles((prev: Obstacle) => [
      ...prev,
      { x: newObstacleX, gapHeight: randomGapHeight },
    ]);
  }, 2000); // New obstacle every 2 seconds

  return () => {
    clearInterval(obstacleInterval);
  };
};
