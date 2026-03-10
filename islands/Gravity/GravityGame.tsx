import { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { BallState, GameState } from "./logic/types.ts";
import {
  createCamera,
  createGround,
  createLights,
  createObstacles,
  createPlayer,
  createScene,
  createSkybox,
} from "./logic/scene.ts";
import { RAMPS } from "./logic/obstacles.ts";
import { clampSpeed, updateBall } from "./logic/ball.ts";
import { resolveCollision, resolveRampCollision } from "./logic/collision.ts";
import { initPins, updatePin } from "./logic/pin.ts";
import {
  applyDragVelocity,
  attachDragControls,
} from "./controls/dragControls.ts";
import { Overlay } from "./components/Overlay.tsx";

const GravityGame: FunctionalComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const gameStateRef = useRef<GameState>("idle");
  const [sessionKey, setSessionKey] = useState(0);

  const isDragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  const startGame = () => {
    gameStateRef.current = "loading";
    setGameState("loading");
    setSessionKey((k) => k + 1);
  };

  useEffect(() => {
    if (sessionKey === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    // deno-lint-ignore no-explicit-any
    let engine: any = null;

    const init = () => {
      const { engine: eng, scene } = createScene(canvas);
      engine = eng;

      const camera = createCamera(scene);
      createLights(scene);
      createSkybox(scene);
      createGround(scene);

      const player = createPlayer(scene);
      const pinMeshes = createObstacles(scene);
      const pins = initPins(pinMeshes);
      const ball: BallState = { velX: 0, velZ: 0, velY: 0 };
      let prevPointer: { x: number; y: number } | null = null;

      const detachControls = attachDragControls(canvas, {
        isDragging,
        lastPointer,
      });

      engine.runRenderLoop(() => {
        if (disposed) return;

        const dt = Math.min(engine.getDeltaTime() / 1000, 0.05);

        prevPointer = applyDragVelocity(
          ball,
          isDragging.current,
          lastPointer.current,
          prevPointer,
          dt,
        );
        clampSpeed(ball);
        updateBall(ball, player, dt, isDragging.current, RAMPS);
        resolveRampCollision(ball, player, RAMPS);
        for (const pin of pins) {
          updatePin(pin, dt);
          resolveCollision(ball, player, pin);
        }

        // Smoothly track camera to player
        camera.target.x += (player.position.x - camera.target.x) * 0.08;
        camera.target.z += (player.position.z - camera.target.z) * 0.08;

        scene.render();
      });

      const onResize = () => engine.resize();
      globalThis.addEventListener("resize", onResize);
      engine.resize();

      gameStateRef.current = "playing";
      setGameState("playing");

      return detachControls;
    };

    let detach: (() => void) | undefined;
    try {
      detach = init();
    } catch (err) {
      console.error(err);
    }

    return () => {
      disposed = true;
      isDragging.current = false;
      lastPointer.current = null;
      detach?.();
      engine?.dispose();
    };
  }, [sessionKey]);

  return (
    <div class="gravity-container">
      <canvas
        ref={canvasRef}
        class="gravity-canvas"
        style={{
          display: gameState === "idle" || gameState === "won" ? "none" : "block",
        }}
      />
      {gameState !== "playing" && (
        <Overlay gameState={gameState} onStart={startGame} />
      )}
    </div>
  );
};

export default GravityGame;
