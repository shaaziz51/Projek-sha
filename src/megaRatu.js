import * as THREE from "three";
import { megaRatu } from "./megaRatuProfile.js";

// Builds the Mega Ratu box and bottle from measurements taken off the product photo
// (see tools/extract_mega_ratu.py). One world unit is 100 photo pixels; y = 0 is the floor.
export function buildMegaRatu(textures) {
  const U = megaRatu.unitPx;
  const group = new THREE.Group();

  // --- Box ---
  const b = megaRatu.box;
  const boxW = (b.x1 - b.x0 + 4) / U; // the texture crop sits a few px inside the card edges
  const boxH = (b.y1 - b.y0) / U;
  const boxD = boxW * 0.85;
  const card = (map) =>
    new THREE.MeshStandardMaterial({ map, roughness: 0.62, metalness: 0, color: "#8f8f8f" });
  const plain = new THREE.MeshStandardMaterial({ color: "#0e0c0d", roughness: 0.6 });
  // BoxGeometry face order: +x, -x, +y, -y, +z (front), -z (back)
  const box = new THREE.Mesh(new THREE.BoxGeometry(boxW, boxH, boxD), [
    card(textures.side),
    card(textures.side),
    plain,
    plain,
    card(textures.front),
    card(textures.side),
  ]);
  box.position.y = boxH / 2;
  box.castShadow = true;
  box.receiveShadow = true;
  group.add(box);

  // --- Bottle: a lathe of the outline traced from the photo ---
  const t = megaRatu.bottle;
  const toWorld = ([r, y]) => new THREE.Vector2(r / U, (t.bottomY - y) / U);
  const outline = t.points.map(toWorld); // bottom first
  const foilY = (t.bottomY - t.foilEndY) / U;
  const topY = (t.bottomY - t.topY) / U;

  const body = [new THREE.Vector2(0, 0)];
  const cap = [];
  for (let i = 0; i < outline.length; i++) {
    const p = outline[i];
    if (p.y <= foilY) body.push(p);
    if (p.y >= foilY) cap.push(p);
    const next = outline[i + 1];
    if (next && p.y < foilY && next.y > foilY) {
      const k = (foilY - p.y) / (next.y - p.y);
      const seam = new THREE.Vector2(p.x + (next.x - p.x) * k, foilY);
      body.push(seam);
      cap.push(seam);
    }
  }
  cap.push(new THREE.Vector2(0, topY));

  const glass = new THREE.MeshPhysicalMaterial({
    color: "#2b0812",
    roughness: 0.12,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
  });
  const gold = new THREE.MeshStandardMaterial({ color: "#c9a04a", metalness: 1, roughness: 0.3 });

  const bottle = new THREE.Group();
  const bodyMesh = new THREE.Mesh(new THREE.LatheGeometry(body, 96), glass);
  const capMesh = new THREE.Mesh(new THREE.LatheGeometry(cap, 96), gold);
  bodyMesh.castShadow = capMesh.castShadow = true;
  bottle.add(bodyMesh, capMesh);

  // Label print, wrapped on the front of the bottle over the same outline.
  const l = megaRatu.label;
  const y0 = (t.bottomY - l.y1) / U;
  const y1 = (t.bottomY - l.y0) / U;
  const labelPts = outline.filter((p) => p.y >= y0 - 0.02 && p.y <= y1 + 0.02).map((p) => new THREE.Vector2(p.x * 1.006, p.y));
  const midR = labelPts[Math.floor(labelPts.length / 2)].x;
  const halfW = (l.x1 - l.x0) / 2 / U;
  const arc = 2 * Math.asin(Math.min(0.99, halfW / midR));
  const label = new THREE.Mesh(
    new THREE.LatheGeometry(labelPts, 48, -arc / 2, arc),
    new THREE.MeshStandardMaterial({ map: textures.label, transparent: true, roughness: 0.35, depthWrite: false }),
  );
  bottle.add(label);

  // Place the bottle where it stands in the photo: right of the box and just in front of it.
  bottle.position.set((t.axisX - (b.x0 + b.x1) / 2) / U, 0, boxD / 2 + 0.5);
  group.add(bottle);

  // Turn about the middle of the pair, not about the box.
  const bounds = new THREE.Box3().setFromObject(group);
  const centre = bounds.getCenter(new THREE.Vector3());
  for (const child of group.children) child.position.x -= centre.x;
  for (const child of group.children) child.position.z -= centre.z;

  return { group, height: bounds.max.y };
}
