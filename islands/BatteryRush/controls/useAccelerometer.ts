import { useEffect, useState } from "preact/hooks";

export const useDeviceMotion = (initialX: number, maxX: number) => {
    const [playerX, setPlayerX] = useState(initialX);

    useEffect(() => {
        // Only run in the browser
        if (typeof window === "undefined") return;

        const handleMotion = (event: DeviceMotionEvent) => {
            const { gamma } = event.rotationRate || {};
            if (gamma) {
                setPlayerX((prevX) => Math.max(0, Math.min(maxX, prevX - gamma * 0.5)));
            }
        };

        globalThis.addEventListener("devicemotion", handleMotion);

        return () => {
            globalThis.removeEventListener("devicemotion", handleMotion);
        };
    }, [maxX]);

    return playerX;
};
