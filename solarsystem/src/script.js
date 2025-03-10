import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { log } from 'three/tsl';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// const cubeMaterial1 = new THREE.MeshBasicMaterial({ color: "violet" })
const cubeMaterial2 = new THREE.MeshBasicMaterial({ color: "pink", wireframe: true })
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial2)
scene.add(cubeMesh)

cubeMesh.rotation.y=3;

// const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial1)
// const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial1)
// const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial2)
// const cubeMesh4 = new THREE.Mesh(cubeGeometry, cubeMaterial1)
// const cubeMesh5 = new THREE.Mesh(cubeGeometry, cubeMaterial1)
// const group = new THREE.Group();
// group.add(cubeMesh1);
// group.add(cubeMesh2);
// group.add(cubeMesh3);
// group.add(cubeMesh4);
// group.add(cubeMesh5);
// scene.add(group);

// cubeMesh.position.y = 1;
// cubeMesh.position.x = 1;
// cubeMesh.position.z = 1;

// cubeMesh1.position.y = 2;
// cubeMesh1.position.x = 2;
// cubeMesh1.position.z = 1;

// cubeMesh2.position.y = 2;
// cubeMesh2.position.x = 1;
// cubeMesh2.position.z = 2;

// cubeMesh3.position.y = 1;
// cubeMesh3.position.x = 2;
// cubeMesh3.position.z = 2;

// cubeMesh4.position.y = 2;
// cubeMesh4.position.x = 2;
// cubeMesh4.position.z = 2;

// cubeMesh5.position.y = 2;
// cubeMesh5.position.x = 1;
// cubeMesh5.position.z = 1;

// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper);

const axesHelper = new THREE.AxesHelper(2)
cubeMesh.add(axesHelper);

// initialize the camera , 2 type PerspectiveCamera and OrthographicCamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 200);
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)

// smoothness
// const maxPilxelRatio = Math.min(window.devicePixelRatio ,2);
// renderer.setPixelRatio(maxPilxelRatio)

// initilize controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

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