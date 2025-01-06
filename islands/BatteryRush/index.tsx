import { FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
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

    // Game update logic (fixed 60 FPS)
    useEffect(() => {
        const updateGame = () => {
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
                    console.log("Game Over");
                    obstaclesRef.current = [];
                }
            });
        };

        // Run game update logic at 60 FPS (ish)
        const intervalId = setInterval(updateGame, 1000 / 60);

        return () => clearInterval(intervalId);
    }, [playerX]);

    // Canvas drawing (matches device's refresh rate)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            drawGame(ctx, playerX, obstaclesRef.current, canvas.width, canvas.height);
            requestAnimationFrame(draw);
        };

        // Set canvas size and start drawing
        canvas.width = globalThis.innerWidth;
        canvas.height = globalThis.innerHeight;
        draw();
    }, [playerX]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                border: "1px solid #000",
                width: "100%",
                height: "70vh",
                display: "block",
            }}
        />
    );
};

export default BatteryRush;
