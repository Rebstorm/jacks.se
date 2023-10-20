export const IS_SMALL_SCREEN = window.innerWidth < 810;

export const GAME_WINDOW_WIDTH = IS_SMALL_SCREEN
  ? window.innerWidth / 1.05
  : window.innerWidth / 2;
export const GAME_WINDOW_HEIGHT = window.innerHeight / 1.2;

export const PLAYER_WIDTH = 70;
export const PLAYER_HEIGHT = 70;
