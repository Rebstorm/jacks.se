import { FunctionalComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDeviceMotion } from "./controls/useAccelerometer.ts";
import { Obstacle } from "./objects/obstacle.ts";
import { drawGame } from "./logic/drawGame.ts";
import { detectCollision } from "./logic/detectCollision.ts";

const BatteryRush: FunctionalComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Game state
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [motionPermissionGranted, setMotionPermissionGranted] = useState(false);

    // Player position based on accelerometer
    const playerX = useDeviceMotion(
        typeof window !== "undefined" && motionPermissionGranted
            ? globalThis.innerWidth / 2
            : 0,
        typeof window !== "undefined" ? globalThis.innerWidth : 0
    );

    // Obstacle reference
    const obstaclesRef = useRef<Obstacle[]>([]);

    // Timer to control obstacle generation
    const lastObstacleTime = useRef<number>(0);

    // Request motion permission
    const requestMotionPermission = async () => {

        if (
            typeof DeviceMotionEvent !== "undefined" &&
            typeof DeviceMotionEvent.requestPermission === "function"
        ) {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === "granted") {
                    setMotionPermissionGranted(true);
                    setIsGameRunning(true);
                } else {
                    alert("Motion controls are required to play this game.");
                }
            } catch (error) {
                console.error("DeviceMotion permission request failed:", error);
            }
        } else {
            // For browsers that don't require permission
            setMotionPermissionGranted(true);
            setIsGameRunning(true);
        }
    };

    // Game update logic (fixed 60 FPS)
    useEffect(() => {
        if (!isGameRunning) return;

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
                    setIsGameRunning(false);
                }
            });
        };

        // Run game update logic at 60 FPS
        const intervalId = setInterval(updateGame, 1000 / 60);

        return () => clearInterval(intervalId);
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
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={requestMotionPermission}
                        style={{
                            padding: "15px 30px",
                            fontSize: "20px",
                            backgroundColor: "#3498db",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Start Game
                    </button>
                </div>
            )}

            <canvas
                ref={canvasRef}
                style={{
                    border: "1px solid #000",
                    width: "100%",
                    height: "70vh",
                    display: isGameRunning ? "block" : "none",
                }}
            />
        </div>
    );
};

export default BatteryRush;
