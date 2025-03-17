import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { distance } from 'three/tsl';
import { Pane } from "tweakpane";

// initialize a pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add texture loader 
const textureLoader = new THREE.TextureLoader()

// adding texture
const sunTexture = textureLoader.load('/texture/solar/2k_sun.jpg');
const mercuryTexture = textureLoader.load('/texture/solar/2k_mercury.jpg');
const venusTexture = textureLoader.load('/texture/solar/2k_venus_surface.jpg');
const earthTexture = textureLoader.load('/texture/solar/2k_earth_daymap.jpg');
const marsTexture = textureLoader.load('/texture/solar/2k_mars.jpg');
const jupiterTexture = textureLoader.load('/texture/solar/2k_jupiter.jpg');
const saturnTexture = textureLoader.load('/texture/solar/2k_saturn.jpg');
const uranusTexture = textureLoader.load('/texture/solar/2k_uranus.jpg');
const neptuneTexture = textureLoader.load('/texture/solar/2k_neptune.jpg');
const moonTexture = textureLoader.load('/texture/solar/2k_moon.jpg');

// add mesh
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });

const sun = new THREE.Mesh(sphereGeometry, sunMaterial)
sun.scale.setScalar(5);
scene.add(sun);

const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });;
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });;
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });;
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });;
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });;
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });;
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });;
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });;


const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: []
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
        material: moonMaterial,
      }
    ]
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
        material: moonMaterial,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
        material: moonMaterial,
      }
    ]
  },
  {
    name: "Jupiter",
    radius: 3,
    distance: 35,
    speed: 0.0015,
    material: jupiterMaterial,
    moons: [
      {
        name: "Io",
        radius: 0.4,
        distance: 5,
        speed: 0.02,
        material: moonMaterial,
      },
      {
        name: "Europa",
        radius: 0.35,
        distance: 7,
        speed: 0.018,
        material: moonMaterial,
      },
      {
        name: "Ganymede",
        radius: 0.5,
        distance: 10,
        speed: 0.015,
        material: moonMaterial,
      },
      {
        name: "Callisto",
        radius: 0.45,
        distance: 13,
        speed: 0.012,
        material: moonMaterial,
      }
    ]
  },
  {
    name: "Saturn",
    radius: 2.5,
    distance: 45,
    speed: 0.001,
    material: saturnMaterial,
    moons: [
      {
        name: "Titan",
        radius: 0.5,
        distance: 8,
        speed: 0.02,
        material: moonMaterial,
      },
      {
        name: "Enceladus",
        radius: 0.25,
        distance: 5,
        speed: 0.018,
        material: moonMaterial,
      }
    ]
  },
  {
    name: "Uranus",
    radius: 2,
    distance: 55,
    speed: 0.0007,
    material: uranusMaterial,
    moons: [
      {
        name: "Miranda",
        radius: 0.3,
        distance: 6,
        speed: 0.02,
        material: moonMaterial,
      },
      {
        name: "Ariel",
        radius: 0.35,
        distance: 7,
        speed: 0.018,
        material: moonMaterial,
      },
      {
        name: "Umbriel",
        radius: 0.4,
        distance: 8,
        speed: 0.015,
        material: moonMaterial,
      },
      {
        name: "Titania",
        radius: 0.45,
        distance: 10,
        speed: 0.012,
        material: moonMaterial,
      },
      {
        name: "Oberon",
        radius: 0.5,
        distance: 12,
        speed: 0.01,
        material: moonMaterial,
      }
    ]
  },
  {
    name: "Neptune",
    radius: 1.8,
    distance: 65,
    speed: 0.0005,
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        radius: 0.5,
        distance: 9,
        speed: 0.02,
        material: moonMaterial,
      }
    ]
  }
];

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material)
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  return planetMesh
}

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
  moonMesh.scale.setScalar(moon.radius)
  moonMesh.position.x = moon.distance
  return moonMesh;
}

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet)
  scene.add(planetMesh)
  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon)
    planetMesh.add(moonMesh)
  })
  return planetMesh
})


// cant see bz of stadart material 
// add lights 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

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
controls.maxDistance = 300;
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