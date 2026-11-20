import * as THREE from "three";
import { kopiRatu } from "./kopiRatuProfile.js";

// A pouch surface: sealed thin at the side seams, swelling toward the base (stand-up pouch)
// or toward the middle (sachet). `depth(v)` is the full thickness at height v (0 = bottom).
function pouchGeometry(width, height, depth, side, segU = 48, segV = 64) {
  const positions = [];
  const uvs = [];
  const index = [];
  for (let j = 0; j <= segV; j++) {
    const v = j / segV;
    for (let i = 0; i <= segU; i++) {
      const u = i / segU;
      const bulge = Math.pow(Math.sin(Math.PI * u), 0.55);
      const z = (side * depth(v) * bulge) / 2;
      positions.push((u - 0.5) * width, v * height, z);
      // The back is seen from behind, so its texture runs the other way.
      uvs.push(side > 0 ? u : 1 - u, v);
    }
  }
  const row = segU + 1;
  for (let j = 0; j < segV; j++) {
    for (let i = 0; i < segU; i++) {
      const a = j * row + i;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      if (side > 0) index.push(a, b, d, a, d, c);
      else index.push(a, d, b, a, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

function pouch({ width, height, depth, front, back, base, backTint }) {
  const group = new THREE.Group();
  const film = (map, tint = "#ffffff") =>
    new THREE.MeshPhysicalMaterial({
      map,
      color: tint,
      alphaTest: 0.5,
      roughness: 0.42,
      clearcoat: 0.6,
      clearcoatRoughness: 0.35,
    });
  const f = new THREE.Mesh(pouchGeometry(width, height, depth, 1), film(front));
  const b = new THREE.Mesh(pouchGeometry(width, height, depth, -1), film(back, backTint));
  f.castShadow = b.castShadow = true;
  group.add(f, b);
  if (base) {
    // Oval gusset that closes the bottom of a stand-up pouch.
    const d0 = depth(0);
    const shape = new THREE.Shape();
    shape.absellipse(0, 0, width / 2, d0 / 2, 0, Math.PI * 2);
    const cap = new THREE.Mesh(new THREE.ShapeGeometry(shape, 48), new THREE.MeshStandardMaterial({ color: base, roughness: 0.5 }));
    cap.rotation.x = Math.PI / 2;
    cap.position.y = 0.002;
    group.add(cap);
  }
  return group;
}

// Builds the big Kopi Ratu pouch with its two sachets, arranged as in the studio photo.
// Front, back and side shape come from the photos in source/ (see tools/extract_kopi_ratu.py).
// Sizes are scaled so the pouch stands a little shorter than the Mega Ratu box.
export function buildKopiRatu(textures, pouchHeight = 5.3) {
  const p = kopiRatu.pouch;
  const s = pouchHeight / p.heightPx; // world units per photo pixel
  const group = new THREE.Group();

  const pouchW = p.widthPx * s;
  const big = pouch({
    width: pouchW,
    height: pouchHeight,
    // Side photos: a straight wedge, sealed thin at the top and widening evenly to the base,
    // where it is about a fifth of the pouch's height deep.
    depth: (v) => 0.06 + 1.1 * Math.pow(1 - v, 1.05),
    front: textures.pouchFront,
    back: textures.pouchBack,
    base: "#d36a08",
    // The back photo was taken under brighter desk light than the studio front.
    backTint: "#d9d4d0",
  });
  group.add(big);

  const sachet = (box, z) => {
    const w = (box.x1 - box.x0) * s;
    const h = (box.y1 - box.y0) * s;
    const m = pouch({
      width: w,
      height: h,
      depth: (v) => 0.03 + 0.22 * Math.pow(Math.sin(Math.PI * v), 0.7),
      front: textures.sachet,
      back: textures.sachet,
    });
    m.position.set(((box.x0 + box.x1) / 2 - p.centreX) * s, 0, z);
    return m;
  };
  // Back sachet just in front of the pouch, front sachet in front of that.
  group.add(sachet(kopiRatu.backSachet, 1.0));
  group.add(sachet(kopiRatu.frontSachet, 1.5));

  const bounds = new THREE.Box3().setFromObject(group);
  const centre = bounds.getCenter(new THREE.Vector3());
  for (const child of group.children) {
    child.position.x -= centre.x;
    child.position.z -= centre.z;
  }
  return { group, height: bounds.max.y, width: bounds.max.x - bounds.min.x };
}
