import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { planets, sunMaterial, moonMaterial, backgroundMap } from './planets';

// initialize the scene--
const scene = new THREE.Scene();
scene.background = backgroundMap;

// add other stuffs
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// sun
const sun = new THREE.Mesh( sphereGeometry, sunMaterial);
sun.scale.setScalar(2);
scene.add(sun);

const createPlanet = (planet) =>{
  // create the mesh and add it to the scene
  const planetMesh = new THREE.Mesh( sphereGeometry, planet.material);
  // set the scale
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
};

const createMoon = (moon) =>{
  // create the mesh and add it to the scene
  const moonMesh = new THREE.Mesh( sphereGeometry,  moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

// loop all planets and create meshes and add too the scene
const planetMeshes = planets.map( (planet) => {
  // create the mesh
  const planetMesh = createPlanet(planet)
  // add it our scene
  scene.add(planetMesh);
  // loop through each moon and create the moon
  planet.moons.forEach( (moon) => {
    // add the moon to the planet
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);

  });
  
  return planetMesh;
});



// add light
const amentLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(amentLight);

const pointLight  = new THREE.PointLight(0xffffff, 200);
scene.add(pointLight);

// initialize the camera--
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer--
const canvas = document.getElementById("canvas"); // DOM element
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
// solve obj pixel issue / antialias--
const maxPixelRatio = Math.min(window.devicePixelRatio, 2); // min 2
renderer.setPixelRatio(maxPixelRatio);


// initialize camera controls--
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom =true
controls.maxDistance = 200;
controls.minDistance = 20;

// resize controller--
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// loop the render obj---
const renderLoop = () => {

  // animation
  planetMeshes.forEach((planet, planetIndex) =>{
    planet.rotation.y += planets[planetIndex].speed;
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;

    planet.children.forEach((moon, moonIndex) =>{
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
    });

  });

  // render a frame--
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
// renderer.render(scene, camera);