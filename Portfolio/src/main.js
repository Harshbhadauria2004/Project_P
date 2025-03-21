import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from "gsap";

var typed = new Typed('#element', {
  strings: ['Web Developer.', 'Web Designer.', 'Freelancer.'],
  typeSpeed: 100, repeat: true, loop: true, backSpeed: 50
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, -5, 2); // Adjusted for chest-level view
camera.lookAt(1, 2, 0);

let robot;
let mixer;
const loader = new GLTFLoader();
loader.load('./Assets/space_station_3.glb', // Ensure the path is correct
  function (gltf){
    robot = gltf.scene;
    robot.scale.set(1.2, 1.2, 1.2); // Increased scale
    robot.position.set(1,1,0); // Centered position
    // robot.rotation.y = Math.PI/2;
    // robot.rotation.x = Math.PI*1.1;
    // robot.rotation.z = Math.PI*2; // Face forward
    scene.add(robot);

    mixer= new THREE.AnimationMixer(robot);
    mixer.clipAction(gltf.animations[0]).play();
    console.log('Model loaded successfully'); // Log to confirm model is loaded
  },
  function (xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error){
    console.error('An error happened', error);
  }
);

const canvas = document.querySelector('#warrior'); // Corrected the canvas selector
const renderer = new THREE.WebGLRenderer({ 
  canvas,
  antialias: true, 
  alpha: true 
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // Corrected 'windows' to 'window'
// renderer.setClearColor(0x000000, 0); // Ensure the background is transparent
document.body.appendChild(renderer.domElement); // Corrected 'windows' to 'document.body'
console.log('Canvas appended to screen'); // Log to confirm canvas is appended

// Add stronger lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);


window.addEventListener("mousemove", (e) => {
  if (robot) {
    // Convert mouse position to rotation
    const rotationX = ((e.clientX / window.innerWidth) - 1) * Math.PI * 0.2;
    const rotationY = ((e.clientY / window.innerHeight) - 1) * Math.PI * 0.2; 
    gsap.to(robot.rotation, {
      x: rotationY,
      y: rotationX,
      duration: 0.5,
      ease: "power2.out"
    });
  }
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // Corrected 'rightSection' to 'window'
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if(mixer) mixer.update(0.02);
  // Removed rotation animation
}
animate();

