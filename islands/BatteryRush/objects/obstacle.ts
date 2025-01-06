// controls/Obstacle.ts
export class Obstacle {
    x: number;
    size: number;
    speed: number;

    constructor(canvasWidth: number) {
        this.x = Math.random() * canvasWidth; // Random starting position
        this.size = 30; // Initial size
        this.speed = 2; // Initial speed
    }

    update() {
        // Grow in size to simulate 2.5D perspective
        this.size += 0.2;
        this.speed += 0.02;
    }

    isOffScreen(canvasHeight: number) {
        // Check if the obstacle has gone off-screen
        return this.size > canvasHeight / 10;
    }
}