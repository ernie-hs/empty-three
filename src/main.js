import * as THREE from 'three';
import { ArcballControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector("#grid");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
const control = new ArcballControls(camera, canvas, scene);
control.setGizmosVisible(false);

camera.position.set(0, 10, 100);

renderer.setAnimationLoop(animate);

window.addEventListener("resize", (e) => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let a = w / h;
    renderer.pixelRatio = window.devicePixelRatio;
    renderer.setSize(w, h);
    camera.aspect = a;
    camera.updateProjectionMatrix();
});

window.dispatchEvent(new Event("resize"));

const planeMaterial = new THREE.MeshPhysicalMaterial({
    color: "cornflowerblue",
});
const planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
planeGeometry.rotateX(-Math.PI / 2);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

const light = new THREE.PointLight(0xffffff, 100000);
light.position.set(-100, 100, 0);
scene.add(light);

function animate() {
    renderer.render(scene, camera);
}