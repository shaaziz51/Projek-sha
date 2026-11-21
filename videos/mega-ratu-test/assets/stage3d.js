// All 3D in the Mega Ratu test, drawn into one full-stage canvas (1080x1920 px, y down):
// the bottle (turned from its outline traced off the product photo) and the ingredients on the cards.
// window.megaStage3D.render({ bottle: {...}, items: [...] }) draws one frame; nothing here keeps time.
import * as THREE from "three";
import { RoomEnvironment } from "./three/RoomEnvironment.js";
import { megaRatu } from "./megaRatuProfile.js";

const W = 1080, H = 1920;
const lerp = (a, b, p) => a + (b - a) * p;
const canvas = document.getElementById("stage3d");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.75;
const camera = new THREE.OrthographicCamera(0, W, 0, -H, -3000, 3000);   // stage pixels
camera.position.z = 1500;
const key = new THREE.DirectionalLight("#fff4e6", 2.6);
key.position.set(-600, 900, 900);
const rim = new THREE.DirectionalLight("#fff9f0", 2.2);
rim.position.set(700, 300, -600);
scene.add(key, rim, new THREE.AmbientLight("#ffffff", 0.35));

// Every model is built to 1 unit tall, centred on its middle, so `size` in px is its height on screen.
function centred(obj) {
  const box = new THREE.Box3().setFromObject(obj), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  const inner = new THREE.Group();
  obj.position.sub(c);
  inner.add(obj);
  inner.scale.setScalar(1 / size.y);
  const outer = new THREE.Group();
  outer.add(inner);
  scene.add(outer);
  return outer;
}

// ---- Bottle: lathe of the traced outline, gold foil cap, label wrapped on the front ----
const labelTex = await new THREE.TextureLoader().loadAsync("assets/mega-bottle-label.png");
labelTex.colorSpace = THREE.SRGBColorSpace;
labelTex.anisotropy = 8;
function buildBottle() {
  const t = megaRatu.bottle;
  const pts = t.points.map(([r, y]) => new THREE.Vector2(r, t.bottomY - y));
  const foilY = t.bottomY - t.foilEndY, topY = t.bottomY - t.topY;
  const body = [new THREE.Vector2(0, 0)], cap = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], n = pts[i + 1];
    if (p.y <= foilY) body.push(p);
    if (p.y >= foilY) cap.push(p);
    if (n && p.y < foilY && n.y > foilY) {
      const k = (foilY - p.y) / (n.y - p.y), s = new THREE.Vector2(p.x + (n.x - p.x) * k, foilY);
      body.push(s); cap.push(s);
    }
  }
  cap.push(new THREE.Vector2(0, topY));
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.LatheGeometry(body, 128),
    new THREE.MeshPhysicalMaterial({ color: "#3a0b18", roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 })));
  g.add(new THREE.Mesh(new THREE.LatheGeometry(cap, 128),
    new THREE.MeshStandardMaterial({ color: "#d4a94e", metalness: 1, roughness: 0.28 })));
  const l = megaRatu.label, ly0 = t.bottomY - l.y1, ly1 = t.bottomY - l.y0;
  const lp = pts.filter((p) => p.y >= ly0 - 2 && p.y <= ly1 + 2).map((p) => new THREE.Vector2(p.x * 1.006, p.y));
  const arc = 2 * Math.asin(Math.min(0.99, (l.x1 - l.x0) / 2 / lp[Math.floor(lp.length / 2)].x));
  g.add(new THREE.Mesh(new THREE.LatheGeometry(lp, 48, -arc / 2, arc),
    new THREE.MeshStandardMaterial({ map: labelTex, transparent: true, roughness: 0.35, depthWrite: false })));
  return g;
}

// ---- Box: the real box faces (front cut from the product photo, plain sides with the gold band) ----
const loadTex = async (url) => { const t = await new THREE.TextureLoader().loadAsync(url); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const boxFront = await loadTex("assets/mega-box-front.png"), boxSide = await loadTex("assets/mega-box-side.png");
function buildBox() {
  const b = megaRatu.box, w = b.x1 - b.x0 + 4, h = b.y1 - b.y0, d = w * 0.85;
  const card = (map) => new THREE.MeshStandardMaterial({ map, roughness: 0.55, metalness: 0, color: "#d0d0d0" });
  const plain = new THREE.MeshStandardMaterial({ color: "#121012", roughness: 0.6 });
  // face order: +x, -x, +y, -y, +z (front), -z (back)
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [card(boxSide), card(boxSide), plain, plain, card(boxFront), card(boxSide)]);
}
export const BOX_TO_BOTTLE = (megaRatu.box.y1 - megaRatu.box.y0) / (megaRatu.bottle.bottomY - megaRatu.bottle.topY);

// ---- Grape cluster: berries in a tapering cone, stem and one leaf ----
function buildGrapes() {
  const g = new THREE.Group();
  const berry = new THREE.MeshPhysicalMaterial({ color: "#2e0b3a", roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.18,
                                                 sheen: 0.35, sheenColor: new THREE.Color("#8f6aa8") });
  const geo = new THREE.SphereGeometry(0.5, 32, 24);
  const rows = [[0, 4, 1.15], [1, 4, 0.95], [2, 3, 0.75], [3, 2, 0.5], [4, 1, 0]];   // row, count, ring radius
  rows.forEach(([row, n, r]) => {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + row * 0.6;
      const m = new THREE.Mesh(geo, berry);
      m.position.set(Math.cos(a) * r, -row * 0.82, Math.sin(a) * r);
      m.scale.setScalar(1 - row * 0.05);
      g.add(m);
    }
  });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 1.0, 12),
    new THREE.MeshStandardMaterial({ color: "#6b4a2b", roughness: 0.7 }));
  stem.position.set(0.1, 0.85, 0); stem.rotation.z = -0.35;
  g.add(stem);
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0); leafShape.bezierCurveTo(0.5, 0.25, 0.9, 0.7, 1.2, 0.2); leafShape.bezierCurveTo(0.8, -0.3, 0.4, -0.25, 0, 0);
  const leaf = new THREE.Mesh(new THREE.ExtrudeGeometry(leafShape, { depth: 0.04, bevelEnabled: false }),
    new THREE.MeshStandardMaterial({ color: "#4f7a2e", roughness: 0.5, side: THREE.DoubleSide }));
  leaf.position.set(0.2, 1.05, 0); leaf.rotation.set(0.3, 0, 0.25);
  g.add(leaf);
  return g;
}

// ---- Strawberry: lathe body, seeds set into the surface, leaf crown ----
function buildStrawberry() {
  const g = new THREE.Group();
  // outline: pointed tip at the bottom, widest near the top, rounded shoulders (radius, height)
  const shape = [[0.001, 0], [0.12, 0.08], [0.3, 0.3], [0.5, 0.58], [0.68, 0.88], [0.78, 1.16], [0.77, 1.34],
                 [0.66, 1.48], [0.46, 1.58], [0.22, 1.63], [0.001, 1.65]];
  const prof = [];
  for (let i = 0; i <= 24; i++) {
    const f = (i / 24) * (shape.length - 1), k = Math.min(shape.length - 2, Math.floor(f)), u = f - k;
    prof.push(new THREE.Vector2(lerp(shape[k][0], shape[k + 1][0], u), lerp(shape[k][1], shape[k + 1][1], u)));
  }
  const bodyProf = prof.map((p) => p.clone());
  g.add(new THREE.Mesh(new THREE.LatheGeometry(bodyProf, 64),
    new THREE.MeshPhysicalMaterial({ color: "#c8102e", roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15 })));
  const seedGeo = new THREE.SphereGeometry(0.035, 8, 6), seedMat = new THREE.MeshStandardMaterial({ color: "#f2d16b", roughness: 0.5 });
  for (let i = 0; i < 70; i++) {           // golden-angle spiral, a fixed pattern
    const v = 0.08 + (i / 70) * 0.8, a = i * 2.39996;
    const idx = Math.round(v * 24), p = prof[idx];
    const s = new THREE.Mesh(seedGeo, seedMat);
    s.scale.set(1, 1.6, 1);
    s.position.set(Math.cos(a) * p.x * 1.01, p.y, Math.sin(a) * p.x * 1.01);
    g.add(s);
  }
  const leafMat = new THREE.MeshStandardMaterial({ color: "#3f8a2c", roughness: 0.5, side: THREE.DoubleSide });
  for (let i = 0; i < 6; i++) {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.6, 8, 1, true), leafMat);
    const a = (i / 6) * Math.PI * 2;
    leaf.position.set(Math.cos(a) * 0.2, 1.62, Math.sin(a) * 0.2);
    leaf.rotation.set(0, -a, Math.PI / 2 - 0.25);
    leaf.lookAt(Math.cos(a) * 2, 1.45, Math.sin(a) * 2);
    leaf.rotateX(Math.PI / 2);
    g.add(leaf);
  }
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.3, 8), leafMat);
  stalk.position.y = 1.76;
  g.add(stalk);
  return g;
}

// ---- Biji Crista: three glossy seeds ----
function buildSeeds() {
  const g = new THREE.Group();
  const mat = new THREE.MeshPhysicalMaterial({ color: "#8a5a2b", roughness: 0.35, clearcoat: 0.6 });
  const ridgeMat = new THREE.MeshStandardMaterial({ color: "#5e3a17", roughness: 0.6 });
  [[0, 0.15, 0, 0.1], [-0.55, -0.25, 0.2, 0.55], [0.55, -0.3, -0.1, -0.45]].forEach(([x, y, z, rz]) => {
    const s = new THREE.Group();
    s.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 24), mat));
    const ridge = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.025, 8, 48), ridgeMat);
    ridge.rotation.y = Math.PI / 2;
    s.add(ridge);
    s.scale.set(0.55, 0.9, 0.42);
    s.position.set(x, y, z); s.rotation.z = rz;
    g.add(s);
  });
  return g;
}

const models = {
  bottle: centred(buildBottle()),
  grapes: centred(buildGrapes()),
  strawberry: centred(buildStrawberry()),
  seeds: centred(buildSeeds()),
  miniBottle: centred(buildBottle()),
  box: centred(buildBox()),
};

function place(obj, { x, y, size, rot = 0, spin = 0, tilt = 0.1, stretch = 1, z = 0, visible = true }) {
  obj.visible = visible && size > 0.5;
  if (!obj.visible) return;
  obj.position.set(x, -y, z);
  obj.rotation.set(tilt, THREE.MathUtils.degToRad(spin), -THREE.MathUtils.degToRad(rot), "ZXY");
  obj.scale.set(size, size * stretch, size);
}

window.megaStage3D = {
  boxToBottle: BOX_TO_BOTTLE,
  render({ bottle, box, items = {} }) {
    place(models.bottle, bottle);
    place(models.box, box || { visible: false, size: 0 });
    for (const k of ["grapes", "strawberry", "seeds", "miniBottle"]) place(models[k], items[k] || { visible: false, size: 0 });
    renderer.render(scene, camera);
  },
};
window.dispatchEvent(new Event("stage3d-ready"));
