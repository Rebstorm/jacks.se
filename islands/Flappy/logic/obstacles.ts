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
  hasBeenPassed: boolean;
}
export const generateObstacles = (
  obstacles: Obstacle[],
  setObstacles: StateUpdater<Obstacle[]>,
) => {
  const MINIMUM_OBSTACLE_SPACING = 300; // This can be adjusted based on your game's difficulty and speed.
  const obstacleInterval = setInterval(() => {
    // We're now determining the position of the new obstacle based on the screen width and existing obstacle positions.
    const lastObstacle = obstacles[obstacles.length - 1];

    const newObstacleX = lastObstacle
      ? Math.max(GAME_WINDOW_WIDTH, lastObstacle.x + MINIMUM_OBSTACLE_SPACING)
      : GAME_WINDOW_WIDTH; // If it's the first obstacle, start at the edge of the game window.

    const randomGapHeight =
      Math.random() * (GAME_WINDOW_HEIGHT * (IS_SMALL_SCREEN ? 0.4 : 0.7)) +
      PLAYER_WIDTH;

    // Add the new obstacle to the state.
    setObstacles((prevObstacles: Obstacle[]) => [
      ...prevObstacles,
      { x: newObstacleX, gapHeight: randomGapHeight, hasBeenPassed: false }, // Ensure you initialize 'hasBeenPassed' here if it's being used.
    ]);
  }, 2000); // New obstacle every 2 seconds

  return () => {
    clearInterval(obstacleInterval); // Clean up the interval when necessary.
  };
};
