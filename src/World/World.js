import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
import { createBall } from "./components/ball.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { TiltControls } from "./systems/TiltControls.js";
import { createLights } from "./components/lights.js";
import { AnimationLoop } from "./systems/AnimationLoop.js";
import { PhysicsLoop } from "./systems/PhysicsLoop.js";
import { Vector2 } from "three";

let camera;
let renderer;
let scene;
let animationLoop;
let physicsLoop;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const cube = createCube();
    const ball = createBall();
    const light = createLights();
    const plane = {
      width: 6,
      height: 6,
    };
    const circle = {
      radius: 0.2,
      centre: new Vector2(0, 0),
      velocity: new Vector2(0, 0),
      acceleration: new Vector2(0, 0),
    };
    const tiltAngles = { x: 0, z: 0 };

    animationLoop = new AnimationLoop(
      camera,
      scene,
      renderer,
      cube,
      tiltAngles,
      circle,
      ball,
    );
    physicsLoop = new PhysicsLoop(tiltAngles, circle);
    scene.add(cube, ball, light);

    const resizer = new Resizer(container, camera, renderer);

    const tiltControl = new TiltControls(container, tiltAngles);
  }
  render() {
    renderer.render(scene, camera);
  }

  start() {
    animationLoop.start();
    physicsLoop.start();
  }

  stop() {
    animationLoop.stop();
    physicsLoop.stop();
  }
}

export { World };
