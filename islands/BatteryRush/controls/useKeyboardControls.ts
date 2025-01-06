// controls/useKeyboardControls.ts
import { useEffect, useState } from "preact/hooks";

export const useKeyboardControls = (initialX: number, maxX: number) => {
    const [playerX, setPlayerX] = useState(initialX);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft" || event.key === "a") {
                setPlayerX((prevX) => Math.max(prevX - 20, 0));
            } else if (event.key === "ArrowRight" || event.key === "d") {
                setPlayerX((prevX) => Math.min(prevX + 20, maxX));
            }
        };

        globalThis.addEventListener("keydown", handleKeyDown);
        return () => globalThis.removeEventListener("keydown", handleKeyDown);
    }, [maxX]);

    return playerX;
};
