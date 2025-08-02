export const IS_SMALL_SCREEN = globalThis?.innerWidth < 810;

export const GAME_WINDOW_WIDTH = IS_SMALL_SCREEN
  ? globalThis?.innerWidth / 1.05
  : globalThis?.innerWidth / 2;
export const GAME_WINDOW_HEIGHT = IS_SMALL_SCREEN ? globalThis?.innerHeight / 1.5 : globalThis?.innerHeight / 2 ;

export const PLAYER_WIDTH = 70;
export const PLAYER_HEIGHT = 70;

export const COLUMN_WIDTH = 50;

export const OBSTACLE_GAP = IS_SMALL_SCREEN ? 200 : 300;