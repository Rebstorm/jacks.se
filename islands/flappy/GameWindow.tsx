import { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { GAME_WINDOW_HEIGHT, GAME_WINDOW_WIDTH } from "./logic/constants.ts";
import { generateObstacles } from "./logic/obstacles.ts";
import { drawBird, drawObstacles } from "./logic/draw.ts";
import { checkCollisionAndUpdate } from "./logic/collision.ts";

const GameWindow: FunctionalComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [birdY, setBirdY] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]); // This will contain each obstacle's x position and height.
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Resetting the game to its initial state
  const restartGame = () => {
    setBirdY(300); // Reset bird position
    setBirdVelocity(0); // Reset bird velocity
    setObstacles([]); // Clear obstacles
    setScore(0); // Reset score
    setIsGameOver(false); // Game is now running again
    // If you have a game loop, you might want to restart it here.
  };

  const handleCanvasClick = () => {
    // This will simulate the "flap" by giving the bird some upward velocity
    setBirdVelocity(-1);
  };

  useEffect(() => {
    // Here, we're just calling the function and it will return the cleanup function directly
    const cleanup = generateObstacles(obstacles, setObstacles);

    return () => {
      cleanup(); // Call the cleanup function on component unmount
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = GAME_WINDOW_WIDTH;
    canvas.height = GAME_WINDOW_HEIGHT;

    let animationFrameId: number;

    const gameOverHandler = () => {
      setIsGameOver(true);
      cancelAnimationFrame(animationFrameId);
    };

    const scoreHandler = () => {
      setScore((prev: number) => prev + 1);
    };

    // The main draw function
    const draw = () => {
      drawBird(canvas, context, birdY, birdVelocity, setBirdY, setBirdVelocity);
      drawObstacles(canvas, context, obstacles);

      checkCollisionAndUpdate(
        obstacles,
        birdY,
        isGameOver,
        gameOverHandler,
        scoreHandler
      );

      // Cleanup when game over
      if (birdY > canvas.height) {
        setIsGameOver(true);
        cancelAnimationFrame(animationFrameId);
      }

      if (!isGameOver) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw(); // Initial draw

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [birdY, birdVelocity, obstacles, isGameOver]);

  return (
    <div>
      {isGameOver && (
        <>
          <div>Game Over! Score: {score}</div>
          <div onClick={() => restartGame()}> Restart </div>
        </>
      )}
      {!isGameOver && (
        <canvas
          ref={canvasRef}
          style={{ border: "1px solid black" }}
          onClick={handleCanvasClick}
        ></canvas>
      )}
    </div>
  );
};

export default GameWindow;
