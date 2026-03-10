import { FunctionalComponent } from "preact";
import type { GameState } from "../logic/types.ts";

interface OverlayProps {
  gameState: Exclude<GameState, "playing">;
  onStart: () => void;
}

export const Overlay: FunctionalComponent<OverlayProps> = (
  { gameState, onStart },
) => (
  <div class="gravity-overlay">
    {gameState === "idle" && (
      <>
        <h2 class="gradient-text">Obstacle</h2>
        <p>Drag to roll the ball through the course!</p>
        <button type="button" class="funButton" onClick={onStart}>
          Play
        </button>
      </>
    )}

    {gameState === "loading" && (
      <>
        <div class="gravity-loader" />
        <p class="gravity-loading-text">Loading…</p>
      </>
    )}

    {gameState === "won" && (
      <>
        <h2 class="gradient-text">You made it! 🏁</h2>
        <button type="button" class="funButton" onClick={onStart}>
          Play Again
        </button>
      </>
    )}
  </div>
);
