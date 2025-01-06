// objects/obstacle.ts
export class Obstacle {
    x: number;
    y: number;
    size: number;
    speed: number;

    constructor(canvasWidth: number) {
        this.x = Math.random() * canvasWidth;
        this.y = 0; // Start at the top of the canvas
        this.size = 20; // Fixed size
        this.speed = 2 + Math.random() * 2; // Random speed
    }

    update() {
        this.y += this.speed; // Move downward
    }

    isOffScreen(canvasHeight: number) {
        return this.y - this.size > canvasHeight;
    }
}
