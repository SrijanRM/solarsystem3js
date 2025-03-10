import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { log } from 'three/tsl';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "violet" })
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

// initialize the camera , 2 type PerspectiveCamera and OrthographicCamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 200);
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight)

// initilize controls 
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.enableDamping = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

const renderLoop = () => {
  console.log("render loop");
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop);
}
renderLoop();