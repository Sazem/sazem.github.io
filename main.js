import * as THREE from 'three';
import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const textureLoader = new THREE.TextureLoader();
const gridTexture = textureLoader.load("assets/grid.png");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const loader = new GLTFLoader();

loader.load('assets/basic_cube.glb', function (gltf) {
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.material.map = gridTexture;
      child.material.needsUpdate = true;
    }
  });

  const model = gltf.scene;
  model.position.set(2,1-3);
  scene.add(model);
//   scene.add(gltf.scene);
}, undefined, function (error) {
  console.error(error);
});

// Ambient light for soft overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Key light – strong directional light from one side
const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
keyLight.position.set(5, 10, 5);
keyLight.castShadow = true;
scene.add(keyLight);

// Fill light – softer light from the opposite side
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 5, 5);
scene.add(fillLight);

// Back light – adds rim lighting and depth
const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, 5, -5);
scene.add(backLight);


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.background = new THREE.Color(0x202020);

renderer.shadowMap.enabled = true;
model.traverse(child => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = true;
  }
});

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.ShadowMaterial({ opacity: 0.3 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
ground.receiveShadow = true;
scene.add(ground);


function animate() {

  cube.rotation.x += 0.0;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );

}