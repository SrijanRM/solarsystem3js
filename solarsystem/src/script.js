import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from "tweakpane";

// initialize a pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add mesh
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfff700 });

const sun = new THREE.Mesh(sphereGeometry, sunMaterial)
sun.scale.setScalar(5);
scene.add(sun);


// initialize the camera 
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.z = 100
camera.position.y = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio, 2);

// initilize controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// render loop
const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop);
}
renderLoop();