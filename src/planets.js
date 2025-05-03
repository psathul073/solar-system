import * as THREE from "three";

// loading manager
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
  console.log('All loaded!');
  document.getElementById('loader').style.display = 'none'; // hide loader
};

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  // console.log(`Loading: ${url} (${itemsLoaded}/${itemsTotal})`);
  const percent = Math.floor((itemsLoaded / itemsTotal) * 100);
  document.getElementById('loader').textContent = `Loading ${percent}%`;
};
loadingManager.onError = (url) => {
  console.error('There was an error loading ' + url);
};


// initialize the texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
cubeTextureLoader.setPath("src/static/textures/Cube-Map/");

// adding texture
const sunTexture = textureLoader.load("src/static/textures/2k_sun.jpg");
const mercuryTexture = textureLoader.load("src/static/textures/2k_mercury.jpg");
const venusTexture = textureLoader.load("src/static/textures/2k_venus_surface.jpg");
const marsTexture = textureLoader.load("src/static/textures/2k_mars.jpg");
const earthTexture = textureLoader.load("src/static/textures/2k_earth_daymap.jpg");
const moonTexture = textureLoader.load("src/static/textures/2k_moon.jpg");
const backgroundMap = cubeTextureLoader.load( [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
] );


// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture
});

const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture
});

const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture
});
const sunMaterial = new THREE.MeshBasicMaterial({
  map : sunTexture,
});

// planets
const planets = [ 
    {
      name: 'Mercury',
      radius: 0.5,
      distance: 10,
      speed: 0.01,
      material: mercuryMaterial,
      moons: []
    },
    {
      name: 'Venus',
      radius: 0.8,
      distance: 15,
      speed: 0.007,
      material: venusMaterial,
      moons: []
    },
    {
      name: 'Earth',
      radius: 1,
      distance: 20,
      speed: 0.005,
      material: earthMaterial,
      moons: [{
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      }],
    },
    {
      name: 'Mars',
      radius: 0.7,
      distance: 25,
      speed: 0.003,
      material: marsMaterial,
      moons: [{
        name: 'Phobos',
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff
      },
    ],
    },
  ];
  

export { sunTexture, sunMaterial, moonMaterial, backgroundMap, planets }