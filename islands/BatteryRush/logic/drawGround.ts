let laneOffset = 0;
let grassPattern: CanvasPattern | null = null;

export const drawGround = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
) => {
  // Preload grass texture if not already loaded
  if (!grassPattern) {
    const grassImage = new Image();
    grassImage.src = "../../experiments/battery-rush/grass-pattern.svg";
    grassImage.onload = () => {
      grassPattern = ctx.createPattern(grassImage, "repeat");
    };
  }

  // Draw grass on the left and right sides
  if (grassPattern) {
    ctx.fillStyle = grassPattern;
    ctx.fillRect(0, 0, canvasWidth * 0.2, canvasHeight); // Left side
    ctx.fillRect(canvasWidth * 0.8, 0, canvasWidth * 0.2, canvasHeight); // Right side
  }

  // Draw the asphalt road in the middle
  ctx.fillStyle = "#333";
  ctx.fillRect(canvasWidth * 0.2, 0, canvasWidth * 0.6, canvasHeight);

  // Draw the moving dashed center lane marker
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.setLineDash([40, 30]); // 40px dash, 30px gap
  ctx.lineDashOffset = -laneOffset; // Move dashes downward
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.stroke();

  // Draw solid white side lane markers
  ctx.setLineDash([]);
  ctx.lineWidth = 6;

  // Left lane marker
  ctx.beginPath();
  ctx.moveTo(canvasWidth * 0.2, 0);
  ctx.lineTo(canvasWidth * 0.2, canvasHeight);
  ctx.stroke();

  // Right lane marker
  ctx.beginPath();
  ctx.moveTo(canvasWidth * 0.8, 0);
  ctx.lineTo(canvasWidth * 0.8, canvasHeight);
  ctx.stroke();

  // Update the lane offset to create the scrolling effect
  laneOffset += 2; // Adjust speed here
  if (laneOffset > 700) {
    laneOffset = 0;
  }
};
