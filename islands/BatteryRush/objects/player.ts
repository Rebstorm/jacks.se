export const PLAYER_SIZE = 80;

export class Player {
  x: number;
  y: number;
  size: number;
  private static offscreenCanvas: HTMLCanvasElement | null = null;
  private lastDirection: "left" | "right" = "right"; // Track last direction

  constructor(x: number, y: number, size: number = PLAYER_SIZE) {
    this.x = x;
    this.y = y;
    this.size = size;

    // Create an offscreen canvas once
    if (!Player.offscreenCanvas) {
      const canvas = document.createElement("canvas");
      canvas.width = size * 2;
      canvas.height = size * 2;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const image = new Image();
        image.src = "../../experiments/battery-rush/battery.webp"; // Adjust path as needed
        image.onload = () => {
          ctx.drawImage(image, 0, 0, size * 2, size * 2);
        };
      }

      Player.offscreenCanvas = canvas;
    }
  }

  updateDirection(newX: number) {
    if (newX < this.x) {
      this.lastDirection = "left";
    } else if (newX > this.x) {
      this.lastDirection = "right";
    }
    this.x = newX;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (Player.offscreenCanvas) {
      ctx.save(); // Save the current state

      if (this.lastDirection === "left") {
        // Flip the canvas horizontally
        ctx.translate(this.x + this.size, this.y - this.size);
        ctx.scale(-1, 1);
        ctx.drawImage(Player.offscreenCanvas, -this.size, -this.size);
      } else {
        // Draw normally
        ctx.drawImage(
          Player.offscreenCanvas,
          this.x - this.size,
          this.y - this.size,
        );
      }

      ctx.restore(); // Restore the previous state
    }
  }
}
