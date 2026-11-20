import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildMegaRatu } from "./megaRatu.js";

// One full turn in 5 seconds at 30 fps. Every frame is a function of its frame number,
// so the live view and the saved frames show exactly the same motion.
export const FPS = 30;
export const SECONDS = 5;
export const FRAMES = FPS * SECONDS;

const CHERRY = "#d2042d";
const WINE = "#722f37";

const capture = new URLSearchParams(location.search).has("capture");
const width = () => (capture ? 1920 : window.innerWidth);
const height = () => (capture ? 1080 : window.innerHeight);

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: capture });
renderer.setPixelRatio(capture ? 1 : Math.min(window.devicePixelRatio, 2));
renderer.setSize(width(), height());
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild(renderer.domElement);

// --- Scene: wine red ground with a cherry red glow behind the product ---
const scene = new THREE.Scene();
function gradientTexture() {
  const c = document.createElement("canvas");
  c.width = 1920;
  c.height = 1080;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(960, 470, 0, 960, 470, 1150);
  grad.addColorStop(0, CHERRY);
  grad.addColorStop(0.45, "#a31a31");
  grad.addColorStop(1, WINE);
  g.fillStyle = grad;
  g.fillRect(0, 0, c.width, c.height);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
scene.background = gradientTexture();

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.4;

const camera = new THREE.PerspectiveCamera(30, width() / height(), 0.1, 100);
camera.position.set(0, 3.6, 15.5);
camera.lookAt(0, 2.55, 0);

// --- Light: warm key that casts the soft shadow, a cool fill, a cherry rim ---
const key = new THREE.DirectionalLight("#fff4e6", 2.0);
key.position.set(-3, 11, 6);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.camera.left = -6;
key.shadow.camera.right = 6;
key.shadow.camera.top = 6;
key.shadow.camera.bottom = -6;
key.shadow.camera.near = 1;
key.shadow.camera.far = 30;
key.shadow.radius = 28;
key.shadow.blurSamples = 32;
key.shadow.bias = -0.0005;
scene.add(key);

const fill = new THREE.DirectionalLight("#e8eeff", 0.6);
fill.position.set(6, 3, 5);
scene.add(fill);

const rim = new THREE.DirectionalLight(CHERRY, 2.0);
rim.position.set(3, 5, -8);
scene.add(rim);

// Floor that only shows the shadow, so the gradient stays clean.
const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.42 }));
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// A soft dark patch right under the product, so it sits on the ground at every angle.
function contactShadow() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.55)");
  grad.addColorStop(0.5, "rgba(0,0,0,0.22)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 3.6),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.002;
  return mesh;
}
scene.add(contactShadow());

// --- Product ---
const manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);
const load = (path) => {
  const t = loader.load(path);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};
const textures = {
  front: load("textures/mega-box-front.png"),
  side: load("textures/mega-box-side.png"),
  label: load("textures/mega-bottle-label.png"),
};
const { group: product } = buildMegaRatu(textures);
scene.add(product);

// The frame number alone sets the pose.
function setFrame(n) {
  const f = ((n % FRAMES) + FRAMES) % FRAMES;
  product.rotation.y = (f / FRAMES) * Math.PI * 2;
}

function render(n) {
  setFrame(n);
  renderer.render(scene, camera);
}

const ready = new Promise((resolve) => {
  manager.onLoad = resolve;
});

if (capture) {
  // Used by tools/render-frames.cjs: draw frame n and hand back the PNG.
  window.mega = {
    frames: FRAMES,
    fps: FPS,
    ready,
    frame(n) {
      render(n);
      return renderer.domElement.toDataURL("image/png");
    },
  };
} else {
  window.addEventListener("resize", () => {
    camera.aspect = width() / height();
    camera.updateProjectionMatrix();
    renderer.setSize(width(), height());
  });
  const start = performance.now();
  ready.then(() => {
    renderer.setAnimationLoop(() => {
      const n = Math.floor(((performance.now() - start) / 1000) * FPS);
      render(n);
    });
  });
}
