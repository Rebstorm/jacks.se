import { FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useDeviceMotion } from "./controls/useAccelerometer.ts";
import { Obstacle } from "./objects/obstacle.ts";
import { drawGame } from "./logic/drawGame.ts";

const BatteryRush: FunctionalComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Player position based on accelerometer
    const playerX = useDeviceMotion(
        typeof window !== "undefined" ? globalThis.innerWidth / 2 : 0,
        typeof window !== "undefined" ? globalThis.innerWidth : 0
    );

    // Obstacle reference
    const obstacleRef = useRef<Obstacle | null>(null);

    // Timer to control obstacle generation
    const lastObstacleTime = useRef<number>(0);

    // Game update logic (fixed 60 FPS, or, uh, I try to)
    useEffect(() => {
        const updateGame = () => {
            const currentTime = performance.now();

            // Generate a new obstacle every 2 seconds
            if (!obstacleRef.current && currentTime - lastObstacleTime.current > 2000) {
                obstacleRef.current = new Obstacle(globalThis.innerWidth);
                lastObstacleTime.current = currentTime;
            }

            // Update obstacle if it exists
            if (obstacleRef.current) {
                obstacleRef.current.update();

                // Remove obstacle if it goes off-screen
                if (obstacleRef.current.isOffScreen(globalThis.innerHeight)) {
                    obstacleRef.current = null;
                }
            }
        };

        // Run game update logic at 60 FPS
        const intervalId = setInterval(updateGame, 1000 / 60);

        return () => clearInterval(intervalId);
    }, []);

    // Canvas drawing (matches device's refresh rate)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            drawGame(ctx, playerX, obstacleRef.current, canvas.width, canvas.height);
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
