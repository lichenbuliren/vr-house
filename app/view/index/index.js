import {
  Three,
  dat,
  Stats
} from '../../vendor';

import * as common from '../../common/';
require('../../main.css');

let init = () => {
  let scene, camera, renderer, spotLight, ;
  let dat, stats;

  scene = sceneInit();
  camera = cameraInit();
  renderer = rendererInit();
  stats = statsInit();
  helperInit();

  
};

let sceneInit = () => {
  return new Three.Scene();
}

let cameraInit = () => {
  var camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  return camera;
}

let rendererInit = () => {
  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

let statsInit = () => {
  var stats = new Stats();
  // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
  return stats;
}

let spotLightInit = () => {
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 10, 30);
  spotLight.castShadow = true;
  return spotLight;
}

let helperInit = (scene, spotLight) => {
  var axisHelper = new THREE.AxisHelper(200);
  var spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  scene.add(axisHelper);
}

let resize = (camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let helperInit = (scene) => {
  var axisHelper = new THREE.AxisHelper(2000);
  scene.add(axisHelper);
}

window.onload = init();
window.addEventListener('resize', common.util.throttle(resize, 500), false);