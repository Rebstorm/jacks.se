import { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_WIDTH,
  IS_SMALL_SCREEN,
} from "./logic/constants.ts";
import { generateObstacles } from "./logic/obstacles.ts";
import { drawPlayer, drawObstacles } from "./logic/draw.ts";
import { checkCollisionAndUpdate } from "./logic/collision.ts";
import { H2 } from "../../components/h2.tsx";
import { HighscoreUser } from "../../server/highscore/highscore.ts";
import { H3 } from "../../components/h3.tsx";
import { SubmitHighscore } from "./components/submit-highscore.tsx";

interface GameWindowProps {
  highscores: HighscoreUser[];
}

const shouldSubmitNewScore = (
  score: number,
  highscoreUsers: HighscoreUser[]
) => {
  const lowestScore = highscoreUsers[highscoreUsers.length - 1];
  return score > lowestScore.score;
};

const GameWindow: FunctionalComponent = (props: GameWindowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [birdImage, setBirdImage] = useState(null);
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
    setBirdVelocity(IS_SMALL_SCREEN ? -1.5 : -1);
  };

  function handleSpaceListener() {
    return (e: KeyboardEvent) => {
      e.key === " " ? handleCanvasClick() : null;
    };
  }

  useEffect(() => {
    // Load the image when the component mounts
    const img = new Image();
    img.onload = () => setBirdImage(img);
    img.src = "../experiments/flappy/drone.png"; // Put the actual path of your image here
  }, []);

  useEffect(() => {
    // Here, we're just calling the function and it will return the cleanup function directly
    const cleanup = generateObstacles(obstacles, setObstacles);

    addEventListener("keydown", handleSpaceListener());

    return () => {
      cleanup();
      handleSpaceListener(); // Call the cleanup function on component unmount
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
      drawPlayer(
        canvas,
        context,
        birdY,
        birdVelocity,
        setBirdY,
        setBirdVelocity,
        birdImage
      );
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
    <div className={"game-window-center"}>
      {isGameOver && (
        <div>
          <H2 gradientColor> Your Score: {score}</H2>
          <div className={"game-high-scores"}>
            <H2 noMargin gradientColor>
              Highscores
            </H2>
            {props.highscores.map((highScore) => (
              <div>
                <H3 className={"player-headline"}>{highScore.username}</H3>
                <div>{highScore.score}</div>
              </div>
            ))}
            {shouldSubmitNewScore && <SubmitHighscore score={score} />}
          </div>

          <div className={"funButton"} onClick={() => restartGame()}>
            Restart
          </div>
        </div>
      )}
      {!isGameOver && (
        <canvas ref={canvasRef} onClick={handleCanvasClick}></canvas>
      )}
    </div>
  );
};

export default GameWindow;
