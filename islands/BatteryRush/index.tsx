import {FunctionalComponent} from "preact";
import {useEffect, useRef} from "preact/hooks";
import {useDeviceMotion} from "./controls/useAccelerometer.ts";

const BatteryRush: FunctionalComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // because ssr.
    const playerX = useDeviceMotion(typeof window !== 'undefined' ? globalThis.innerWidth / 2 : 0, typeof window !== 'undefined' ? globalThis.innerWidth : 0);


    // Set up canvas and draw player
    useEffect(() => {
        if (typeof window === "undefined") return;

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const draw = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw player dot
                    ctx.beginPath();
                    ctx.arc(playerX, canvas.height - 100, 20, 0, Math.PI * 2);
                    ctx.fillStyle = "#3498db";
                    ctx.fill();

                    requestAnimationFrame(draw);
                };

                // Set canvas size and start drawing
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                draw();
            }
        }
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
