import {
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  DynamicTexture,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { BALL_RADIUS } from "./constants.ts";

export function createScene(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.05, 0.05, 0.1, 1);
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
    14,
    Vector3.Zero(),
    scene,
  );
  camera.lowerRadiusLimit = 14;
  camera.upperRadiusLimit = 14;
  return camera;
}

export function createLights(scene: Scene) {
  const hemi = new HemisphericLight(
    "hemi",
    new Vector3(0, 1, 0.3),
    scene,
  );
  hemi.intensity = 0.85;
  hemi.groundColor = new Color3(0.1, 0.1, 0.2);

  const dir = new DirectionalLight(
    "dir",
    new Vector3(-0.5, -1, -0.5),
    scene,
  );
  dir.intensity = 0.4;
}

export function createGround(scene: Scene) {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 22, height: 22 },
    scene,
  );
  const mat = new StandardMaterial("gMat", scene);
  mat.diffuseColor = new Color3(0.1, 0.12, 0.18);
  mat.specularColor = new Color3(0.03, 0.03, 0.06);
  ground.material = mat;
}

export function createPlayer(scene: Scene) {
  const player = MeshBuilder.CreateSphere(
    "player",
    { diameter: BALL_RADIUS * 2, segments: 32 },
    scene,
  );
  player.position.set(0, BALL_RADIUS, 0);

  // Checkerboard DynamicTexture — makes rotation clearly visible
  const tex = new DynamicTexture("ballTex", { width: 256, height: 256 }, scene);
  const ctx = tex.getContext();
  const tileSize = 64; // 4×4 grid of tiles
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? "#3a7fff" : "#0e2a6e";
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
  tex.update();

  const mat = new StandardMaterial("pMat", scene);
  mat.diffuseTexture = tex;
  mat.specularColor = new Color3(0.6, 0.7, 1.0);
  mat.specularPower = 48;
  player.material = mat;
  return player;
}
