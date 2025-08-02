import { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_WIDTH,
  IS_SMALL_SCREEN,
} from "./logic/constants.ts";
import {generateObstacles, Obstacle} from "./logic/obstacles.ts";
import { drawObstacles, drawPlayer } from "./logic/draw.ts";
import { checkCollisionAndUpdate } from "./logic/collision.ts";
import { H2 } from "../../components/h2.tsx";
import { HighscoreUser } from "../../server/highscore/highscore.ts";
import { SubmitHighscore } from "./components/submit-highscore.tsx";
import { Instructions } from "./components/instructions.tsx";

interface GameWindowProps {
  highscores: HighscoreUser[];
}

const shouldSubmitNewScore = (
  score: number,
  highscoreUsers?: HighscoreUser[]
) => {
  const lowestScore = highscoreUsers?.[highscoreUsers.length - 1] || {
    score: 0,
    username: "",
  };
  return score > lowestScore?.score;
};

const GameWindow: FunctionalComponent<GameWindowProps> = (props: GameWindowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [birdImage, setBirdImage] = useState<null | HTMLImageElement>(null);
  const [birdY, setBirdY] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]); // This will contain each obstacle's x position and height.
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);
  const [highscoreList, setHighscoreList] = useState<HighscoreUser[]>(
    props.highscores || []
  );
  const [gameState, setGameState] = useState<"initial" | "running">("initial");

  // Resetting the game to its initial state
  const restartGame = () => {
    setBirdY(300); // Reset bird position
    setBirdVelocity(0); // Reset bird velocity
    setObstacles([]); // Clear obstacles
    setScore(0); // Reset score
    setIsGameOver(false); // Game is now running again
    setGameState("running");
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
      handleSpaceListener();
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
    <div className="game-window-center">
      {gameState === "initial" && (
        <div>
          <Instructions />
          <div className="funButton" onClick={() => restartGame()}>
            Start!
          </div>
        </div>
      )}
      {isGameOver && gameState === "running" && (
        <div>
          <H2 gradientColor> Your Score: {score}⭐</H2>

          <div className="funButton" onClick={() => restartGame()}>
            Restart
          </div>

          {shouldSubmitNewScore(score, highscoreList) && (
            <SubmitHighscore
              score={score}
              onClosed={(list: HighscoreUser[]) => {
                setHighscoreList(list);
              }}
            />
          )}
          <div className="game-high-scores">
            <H2 noMargin gradientColor>
              Highscores
            </H2>
            {highscoreList.map((highScore) => (
              <div>
                <div className="player-headline">{highScore.username}</div>
                <div>{highScore.score}⭐</div>
              </div>
            ))}
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