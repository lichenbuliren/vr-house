import { dat, Stats, THREE } from '../../vendor';

import * as common from '../../common/';
require('../../main.css');

let init = () => {
  let scene, camera, renderer, spotLight;
  let dat, stats;

  scene = sceneInit();
  camera = cameraInit(scene);

  var orbitControls = new THREE.OrbitControls(camera);
  // orbitControls.autoRotate = true;
  var clock = new THREE.Clock();

  renderer = rendererInit();
  spotLight = spotLightInit(scene);
  stats = statsInit();
  helperInit(scene);

  var directionLight = new THREE.DirectionalLight(0xdddddd);
  scene.add(directionLight);

  // 创建一个球体
  let sphere = createSphere(30, 30, 30);
  scene.add(sphere);

  let render = () => {
    stats.update();
    var delta = clock.getDelta();
    orbitControls.update(delta);
    // sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  window.addEventListener('resize', common.util.throttle(resize(camera, renderer), 500), false);
}

let resize = (camera, renderer) => {
  return () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

let createSphere = (radius, widthSegment, heightSegment) => {
  var sphereGeometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
  var sphereMaterial = new THREE.MeshNormalMaterial({
    shading: THREE.FlatShading
  });
  return new THREE.Mesh(sphereGeometry, sphereMaterial);
}

let sceneInit = () => {
  return new THREE.Scene();
}

let cameraInit = (scene) => {
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 250;
  camera.position.x = -20;
  camera.position.y = 100;
  camera.lookAt(new THREE.Vector3());
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

let spotLightInit = (scene) => {
  var spotLight = new THREE.SpotLight(0xff00ff);
  spotLight.position.set(10, 10, 30);
  scene.add(spotLight);
  return spotLight;
}

let helperInit = (scene) => {
  var axisHelper = new THREE.AxisHelper(2000);
  scene.add(axisHelper);
}

window.onload = init();