import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from "tweakpane";

// initialize a pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene()

// initilize geomerty
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

// initilize material 
const material = new THREE.MeshPhongMaterial();
material.shininess = 90
material.side = THREE.DoubleSide;


// initialze mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

scene.add(mesh, mesh2, plane)

// initilize light 
const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 3); // Brighter light
pointLight.position.set(2, 2, 3); // Move it closer
scene.add(pointLight)


// initialize the camera 
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio);

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