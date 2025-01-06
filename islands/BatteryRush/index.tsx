import { FunctionalComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDeviceMotion } from "./controls/useAccelerometer.ts";
import { Obstacle } from "./objects/obstacle.ts";
import { drawGame } from "./logic/drawGame.ts";
import { detectCollision } from "./logic/detectCollision.ts";

const BatteryRush: FunctionalComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Player position based on accelerometer
    const playerX = useDeviceMotion(
        typeof window !== "undefined" ? globalThis.innerWidth / 2 : 0,
        typeof window !== "undefined" ? globalThis.innerWidth : 0
    );

    // Obstacle reference
    const obstaclesRef = useRef<Obstacle[]>([]);

    // Timer to control obstacle generation
    const lastObstacleTime = useRef<number>(0);

    // Game state
    const [isGameOver, setIsGameOver] = useState(false);

    // Restart the game
    const restartGame = () => {
        obstaclesRef.current = [];
        lastObstacleTime.current = performance.now();
        setIsGameOver(false);
    };

    // Game update logic (fixed 60 FPS)
    useEffect(() => {
        const updateGame = () => {
            if (isGameOver) return;

            const currentTime = performance.now();

            // Generate a new obstacle every 1.5 seconds
            if (currentTime - lastObstacleTime.current > 1500 && obstaclesRef.current.length < 10) {
                obstaclesRef.current.push(new Obstacle(globalThis.innerWidth));
                lastObstacleTime.current = currentTime;
            }

            // Update obstacles
            obstaclesRef.current.forEach((obstacle) => obstacle.update());

            // Remove off-screen obstacles
            obstaclesRef.current = obstaclesRef.current.filter(
                (obstacle) => !obstacle.isOffScreen(globalThis.innerHeight)
            );

            // Collision detection
            const playerY = globalThis.innerHeight - 100;
            obstaclesRef.current.forEach((obstacle) => {
                const isCollision = detectCollision(
                    playerX,
                    playerY,
                    20, // Player radius
                    obstacle,
                    globalThis.innerHeight
                );

                if (isCollision) {
                    setIsGameOver(true);
                }
            });
        };

        // Run game update logic at 60 FPS
        const intervalId = setInterval(updateGame, 1000 / 60);

        return () => clearInterval(intervalId);
    }, [playerX, isGameOver]);

    // Canvas drawing (matches device's refresh rate)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            drawGame(ctx, playerX, obstaclesRef.current, canvas.width, canvas.height);

            if (!isGameOver) {
                requestAnimationFrame(draw);
            } else {
                // Draw "Game Over" text
                ctx.font = "48px Arial";
                ctx.fillStyle = "#e74c3c";
                ctx.textAlign = "center";
                ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
            }
        };

        // Set canvas size and start drawing
        canvas.width = globalThis.innerWidth;
        canvas.height = globalThis.innerHeight;
        draw();
    }, [playerX, isGameOver]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{
                    border: "1px solid #000",
                    width: "100%",
                    height: "70vh",
                    display: "block",
                }}
            />
            {isGameOver && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={restartGame}
                        style={{
                            padding: "10px 20px",
                            fontSize: "18px",
                            backgroundColor: "#3498db",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Restart Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default BatteryRush;
