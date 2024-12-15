import { FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

const BatteryRush: FunctionalComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [batteryCharge, setBatteryCharge] = useState(100); // Battery charge level
    const [batteryX, setBatteryX] = useState(50); // Battery's horizontal position
    const [batteryY, setBatteryY] = useState(50); // Battery's vertical position
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const GAME_WINDOW_WIDTH = 400;
    const GAME_WINDOW_HEIGHT = 300;
    const BATTERY_SIZE = 20;

    const restartGame = () => {
        setBatteryCharge(100);
        setBatteryX(50);
        setBatteryY(50);
        setScore(0);
        setIsGameOver(false);
    };

    // Handle swipe gestures
    const handleSwipe = (direction: "up" | "down" | "left" | "right") => {
        if (isGameOver) return;

        if (direction === "up") setBatteryY((y) => Math.max(0, y - 20));
        if (direction === "down")
            setBatteryY((y) => Math.min(GAME_WINDOW_HEIGHT - BATTERY_SIZE, y + 20));
        if (direction === "left") setBatteryX((x) => Math.max(0, x - 20));
        if (direction === "right")
            setBatteryX((x) => Math.min(GAME_WINDOW_WIDTH - BATTERY_SIZE, x + 20));
    };

    useEffect(() => {
        // Handle touch events for swipe detection
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Determine swipe direction
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) handleSwipe("right");
                else handleSwipe("left");
            } else {
                if (deltaY > 0) handleSwipe("down");
                else handleSwipe("up");
            }
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isGameOver]);

    useEffect(() => {
        if (batteryCharge <= 0) {
            setIsGameOver(true);
        }
    }, [batteryCharge]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isGameOver) {
                setBatteryCharge((charge) => Math.max(0, charge - 1));
                setScore((s) => s + 1); // Increment score over time
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isGameOver]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the battery
            context.fillStyle = "green";
            context.fillRect(batteryX, batteryY, BATTERY_SIZE, BATTERY_SIZE);

            // Draw the battery charge as text
            context.fillStyle = "black";
            context.font = "16px Arial";
            context.fillText(`Charge: ${batteryCharge}%`, 10, 20);

            // Draw the score
            context.fillText(`Score: ${score}`, 10, 40);
        };

        draw();
    }, [batteryX, batteryY, batteryCharge, score]);

    return (
        <div style={{ textAlign: "center" }}>
            {isGameOver ? (
                <div>
                    <h2>Game Over!</h2>
                    <p>Your score: {score}</p>
                    <button onClick={restartGame}>Restart</button>
                </div>
            ) : (
                <canvas
                    ref={canvasRef}
                    width={GAME_WINDOW_WIDTH}
                    height={GAME_WINDOW_HEIGHT}
                    style={{
                        border: "1px solid black",
                        marginTop: "20px",
                        touchAction: "none", // Disable default scrolling on touch
                    }}
                ></canvas>
            )}
        </div>
    );
};

export default BatteryRush;
