import {
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  DynamicTexture,
  Engine,
  FresnelParameters,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { CellMaterial } from "@babylonjs/materials";
import { BALL_RADIUS, BOUNDS } from "./constants.ts";
import { BUMPS, PIN_POSITIONS, RAMPS } from "./obstacles.ts";
import { createBumpMeshes } from "./bump.ts";
import { createRampMeshes } from "./ramp.ts";
import { createPinMeshes } from "./pin.ts";

export function createScene(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.82, 0.93, 1.0, 1);
  return { engine, scene };
}

/**
 * 2/3 over-the-shoulder camera — beta = 2/3 of PI/2 puts the camera
 * 60° from top (30° above horizontal). Returns the camera so the render
 * loop can track it to the player each frame.
 */
export function createCamera(scene: Scene) {
  const camera = new ArcRotateCamera(
    "cam",
    -Math.PI / 2,
    (2 / 3) * (Math.PI / 2),
    22,
    Vector3.Zero(),
    scene,
  );
  camera.lowerRadiusLimit = 22;
  camera.upperRadiusLimit = 22;
  return camera;
}

export function createLights(scene: Scene) {
  const hemi = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
  hemi.intensity = 1.1;
  hemi.diffuse = new Color3(0.9, 0.95, 1.0);
  hemi.groundColor = new Color3(0.4, 0.55, 0.3);

  const sun = new DirectionalLight("sun", new Vector3(-0.6, -1, -0.4), scene);
  sun.intensity = 1.2;
  sun.diffuse = new Color3(1.0, 0.97, 0.88);
}

export function createSkybox(scene: Scene) {
  const skybox = MeshBuilder.CreateBox("skybox", { size: 500 }, scene);
  skybox.infiniteDistance = true;

  const mat = new StandardMaterial("skyMat", scene);
  mat.backFaceCulling = false;
  mat.disableLighting = true;

  const tex = new DynamicTexture("skyTex", { width: 2, height: 256 }, scene);
  const ctx = tex.getContext();
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#1a6fff");
  grad.addColorStop(0.55, "#1a6fff");
  grad.addColorStop(1, "#d2ecff");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2, 256);
  tex.update();

  mat.emissiveTexture = tex;
  mat.emissiveTexture.wrapU = 0;
  mat.emissiveTexture.wrapV = 0;
  skybox.material = mat;
}

export function createGround(scene: Scene) {
  const size = BOUNDS * 2;
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: size, height: size },
    scene,
  );

  // Mosaic of slightly varied greens — no grid lines.
  // The CellMaterial posterizes the lighting on top, giving the toon/cell look.
  const texSize = 512;
  const patchSize = 24;
  const shades = ["#3d7a1a", "#4a8f28", "#528c24", "#426e1c", "#4e9426", "#3f8020"];

  const tex = new DynamicTexture("groundTex", { width: texSize, height: texSize }, scene);
  const ctx = tex.getContext();

  for (let y = 0; y < texSize; y += patchSize) {
    for (let x = 0; x < texSize; x += patchSize) {
      const ix = (x / patchSize) | 0;
      const iy = (y / patchSize) | 0;
      const idx = ((ix * 7 + iy * 13 + ix * iy * 3) % shades.length + shades.length) % shades.length;
      ctx.fillStyle = shades[idx];
      ctx.fillRect(x, y, patchSize, patchSize);
    }
  }
  tex.update();

  const mat = new CellMaterial("groundMat", scene);
  mat.diffuseTexture = tex;
  mat.computeHighLevel = true;
  ground.material = mat;
}

export function createPlayer(scene: Scene) {
  const player = MeshBuilder.CreateSphere(
    "player",
    { diameter: BALL_RADIUS * 2, segments: 48 },
    scene,
  );
  player.position.set(0, BALL_RADIUS, 0);

  // ── Marble swirl texture ──────────────────────────────────────────────────
  const S = 512;
  const tex = new DynamicTexture("marbleTex", { width: S, height: S }, scene);
  const ctx = tex.getContext() as unknown as CanvasRenderingContext2D;

  ctx.fillStyle = "#ede8df";
  ctx.fillRect(0, 0, S, S);

  const vein = (
    x0: number, y0: number,
    cx0: number, cy0: number,
    cx1: number, cy1: number,
    x1: number, y1: number,
    color: string, width: number, alpha: number,
  ) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(cx0, cy0, cx1, cy1, x1, y1);
    ctx.stroke();
    ctx.restore();
  };

  // Broad gray veins — classic Carrara style
  vein(0, 220, 140, 40,  370, 460, 512, 300, "#9a9090", 18, 0.45);
  vein(60, 0,  200, 140, 310, 370, 440, 512, "#b0a8a0", 12, 0.35);
  vein(0, 420, 160, 480, 350, 80,  512, 100, "#888080",  9, 0.50);
  // Fine dark veins
  vein(0,  90,  180, 20,  330, 490, 512, 390, "#7a7272",  5, 0.65);
  vein(100, 0,  160, 200, 340, 290, 510, 512, "#8090a0",  3, 0.40);
  vein(0,  340, 100, 380, 410, 100, 512, 200, "#706868",  4, 0.45);
  vein(0, 480, 150, 500, 360, 10,  512, 50,  "#c0b8b0",  3, 0.30);

  const glow = ctx.createRadialGradient(190, 160, 8, 190, 160, 160);
  glow.addColorStop(0,   "rgba(255,255,255,0.50)");
  glow.addColorStop(0.4, "rgba(240,235,228,0.20)");
  glow.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, S, S);

  tex.update();

  const mat = new StandardMaterial("marbleMat", scene);
  mat.diffuseTexture = tex;
  mat.specularColor = new Color3(1, 1, 1);
  mat.specularPower = 280;

  mat.refractionFresnelParameters = new FresnelParameters();
  mat.refractionFresnelParameters.leftColor  = Color3.White();
  mat.refractionFresnelParameters.rightColor = Color3.Black();
  mat.refractionFresnelParameters.power = 3;
  mat.refractionFresnelParameters.bias  = 0.1;

  mat.emissiveColor = new Color3(0.08, 0.07, 0.06);

  player.material = mat;
  return player;
}

export function createObstacles(scene: Scene): Mesh[] {
  createRampMeshes(scene, RAMPS);
  createBumpMeshes(scene, BUMPS);
  return createPinMeshes(scene, PIN_POSITIONS);
}
