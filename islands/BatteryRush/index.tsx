import { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDeviceMotion } from "./controls/useAccelerometer.ts";
import { useKeyboardControls } from "./controls/useKeyboardControls.ts";
import { Obstacle } from "./objects/obstacle.ts";
import { drawGame } from "./logic/drawGame.ts";
import { detectCollision } from "./logic/detectCollision.ts";
import StartScreen from "./views/StartScreen.tsx";
import { PLAYER_SIZE } from "./objects/player.ts";

const BatteryRush: FunctionalComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [useMotionControls, setUseMotionControls] = useState(false);

  // Player position
  const playerXFromMotion = useDeviceMotion(
    typeof window !== "undefined" && useMotionControls
      ? globalThis.innerWidth / 2
      : 0,
    typeof window !== "undefined" ? globalThis.innerWidth : 0,
  );
  const playerXFromKeyboard = useKeyboardControls(
    typeof window !== "undefined" ? globalThis.innerWidth / 2 : 0,
    typeof window !== "undefined" ? globalThis.innerWidth : 0,
  );

  const playerX = useMotionControls ? playerXFromMotion : playerXFromKeyboard;

  // Obstacle reference
  const obstaclesRef = useRef<Obstacle[]>([]);

  // Timer to control obstacle generation
  const lastObstacleTime = useRef<number>(0);

  const [score, setScore] = useState(0);

  // Game update logic (fixed 60 FPS)
  useEffect(() => {
    if (!isGameRunning) return;

    let lastFrameTime = performance.now();
    let animationFrameId: number;

    const updateGame = () => {
      const currentTime = performance.now();

      // Obstacle generation logic
      if (
        currentTime - lastObstacleTime.current > 1500 &&
        obstaclesRef.current.length < 10
      ) {
        obstaclesRef.current.push(new Obstacle(globalThis.innerWidth));
        lastObstacleTime.current = currentTime;
      }

      obstaclesRef.current.forEach((obstacle) => obstacle.update());
      obstaclesRef.current = obstaclesRef.current.filter((obstacle) => {
        if (obstacle.isOffScreen(globalThis.innerHeight)) {
          setScore((prevScore) => prevScore + 1);
          return false;
        }
        return true;
      });

      // Collision detection
      const playerY = globalThis.innerHeight - 100;
      obstaclesRef.current.forEach((obstacle) => {
        if (
          detectCollision(
            playerX,
            playerY,
            PLAYER_SIZE,
            obstacle,
            globalThis.innerHeight,
          )
        ) {
          obstaclesRef.current = [];
          setIsGameRunning(false);
        }
      });

      // Schedule next frame
      lastFrameTime = currentTime;
      animationFrameId = requestAnimationFrame(updateGame);
    };

    updateGame();

    return () => cancelAnimationFrame(animationFrameId);
  }, [playerX, isGameRunning]);

  // Canvas drawing (matches device's refresh rate)
  useEffect(() => {
    if (!isGameRunning || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      drawGame(ctx, playerX, obstaclesRef.current, canvas.width, canvas.height);

      if (isGameRunning) {
        requestAnimationFrame(draw);
      }
    };

    // Set canvas size and start drawing
    canvas.width = globalThis.innerWidth;
    canvas.height = globalThis.innerHeight;
    draw();
  }, [playerX, isGameRunning]);

  return (
    <div>
      {!isGameRunning && (
        <StartScreen
          onStart={(useMotionControls) => {
            setUseMotionControls(useMotionControls);
            setIsGameRunning(true);
            setScore(0);
          }}
          score={score}
        />
      )}
      <canvas
        ref={canvasRef}
        className="gameWindow"
        style={{
          display: isGameRunning ? "block" : "none",
        }}
      />
    </div>
  );
};

export default BatteryRush;
