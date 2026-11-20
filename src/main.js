import * as THREE from "three";

// Scene, camera and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color("#12040a");

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.2, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// The box
const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
const material = new THREE.MeshStandardMaterial({ color: "#e1b377", roughness: 0.45, metalness: 0.1 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Light: soft fill plus a warm key from above-front
scene.add(new THREE.AmbientLight("#ffffff", 0.6));
const key = new THREE.DirectionalLight("#fff9f0", 2.2);
key.position.set(3, 4, 5);
scene.add(key);

// Keep the view correct when the window changes size
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Turn the box every frame
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  box.rotation.y += dt * 0.8;
  box.rotation.x += dt * 0.3;
  renderer.render(scene, camera);
});
