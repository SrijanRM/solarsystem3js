import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from "tweakpane";

// initialize a pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene()

// initilize geomerty
const geometry = new THREE.BoxGeometry(1, 1, 1);

// initilize material 
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });

const fog = new THREE.Fog(0xffffff,1,10);
scene.fog = fog;
scene.background = new THREE.Color('white')
// initialze mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.position.x = 1.5;
scene.add(mesh)
scene.add(mesh2)


// initialize the camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)


// initilize controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})


const renderLoop = () => {
  console.log("render loop here");
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop);
}
renderLoop();