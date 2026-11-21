// The Mega Ratu bottle in 3D, drawn into a full-stage canvas (1080x1920 px, y down).
// Shape: the bottle's outline traced from source/mega-ratu-photo.jpg (megaRatuProfile.js), turned on a lathe.
// window.megaBottle3D.render({ x, y, rot, height, stretch, spin }) draws one frame; nothing here keeps time.
import * as THREE from "three";
import { RoomEnvironment } from "./three/RoomEnvironment.js";
import { megaRatu } from "./megaRatuProfile.js";

const W = 1080, H = 1920;
const canvas = document.getElementById("bottle3d");
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

// Orthographic camera in stage pixels, so x/y match the page exactly.
const camera = new THREE.OrthographicCamera(0, W, 0, -H, -3000, 3000);
camera.position.z = 1500;

const key = new THREE.DirectionalLight("#fff4e6", 2.6);   // warm key from the upper left
key.position.set(-600, 900, 900);
const rim = new THREE.DirectionalLight("#fff9f0", 2.2);   // cream rim from behind right, to lift the dark glass
rim.position.set(700, 300, -600);
scene.add(key, rim, new THREE.AmbientLight("#ffffff", 0.35));

// ---- Bottle geometry (photo pixels; base at y = 0) ----
const t = megaRatu.bottle;
const pts = t.points.map(([r, y]) => new THREE.Vector2(r, t.bottomY - y));   // bottom first
const foilY = t.bottomY - t.foilEndY;
const topY = t.bottomY - t.topY;
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

const glass = new THREE.MeshPhysicalMaterial({ color: "#3a0b18", roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 });
const gold = new THREE.MeshStandardMaterial({ color: "#d4a94e", metalness: 1, roughness: 0.28 });
const inner = new THREE.Group();
inner.add(new THREE.Mesh(new THREE.LatheGeometry(body, 128), glass));
inner.add(new THREE.Mesh(new THREE.LatheGeometry(cap, 128), gold));

// Label print, wrapped on the front (+z faces the camera) over the same outline.
const l = megaRatu.label;
const ly0 = t.bottomY - l.y1, ly1 = t.bottomY - l.y0;
const labelPts = pts.filter((p) => p.y >= ly0 - 2 && p.y <= ly1 + 2).map((p) => new THREE.Vector2(p.x * 1.006, p.y));
const midR = labelPts[Math.floor(labelPts.length / 2)].x;
const arc = 2 * Math.asin(Math.min(0.99, (l.x1 - l.x0) / 2 / midR));
const labelTex = await new THREE.TextureLoader().loadAsync("assets/mega-bottle-label.png");
labelTex.colorSpace = THREE.SRGBColorSpace;
labelTex.anisotropy = 8;
inner.add(new THREE.Mesh(new THREE.LatheGeometry(labelPts, 48, -arc / 2, arc),
  new THREE.MeshStandardMaterial({ map: labelTex, transparent: true, roughness: 0.35, depthWrite: false })));

inner.position.y = -topY / 2;            // pivot at the middle of the bottle, like the page's anchor
const bottle = new THREE.Group();
bottle.add(inner);
scene.add(bottle);
const PHOTO_H = topY;                    // bottle height in photo pixels

window.megaBottle3D = {
  render({ x, y, rot = 0, height, stretch = 1, spin = 0, visible = true }) {
    bottle.visible = visible && height > 0.5;
    const s = height / PHOTO_H;
    bottle.position.set(x, -y, 0);
    bottle.rotation.set(0.10, THREE.MathUtils.degToRad(spin), -THREE.MathUtils.degToRad(rot), "ZXY");
    bottle.scale.set(s, s * stretch, s);
    renderer.render(scene, camera);
  },
};
window.dispatchEvent(new Event("bottle3d-ready"));
