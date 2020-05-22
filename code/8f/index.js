"use strict";
var Engine = BABYLON.Engine,Scene = BABYLON.Scene,ArcRotateCamera = BABYLON.ArcRotateCamera,Vector3 = BABYLON.Vector3,MeshBuilder = BABYLON.MeshBuilder,PBRMaterial = BABYLON.PBRMaterial,PointLight = BABYLON.PointLight,SolidParticleSystem = BABYLON.SolidParticleSystem,SolidParticle = BABYLON.SolidParticle,DefaultRenderingPipeline = BABYLON.DefaultRenderingPipeline;
var canvas = document.querySelector('canvas');
var engine = new Engine(canvas);
var scene = new Scene(engine);
scene.clearColor.set(0, 0, 0, 1);
var camera = new ArcRotateCamera('', -Math.PI / 2, Math.PI / 2, 10, new Vector3(0, 0, 0), scene);
camera.fov = Math.PI / 2;
camera.minZ = 1e-4;
var light = new PointLight('', new Vector3(0, -1, 0), scene);
light.intensity = 5e3;
light.diffuse.set(1, 1, 1);
var pp = new DefaultRenderingPipeline('');
pp.bloomEnabled = true;
pp.bloomThreshold = 0.2;
var mat = new PBRMaterial('', scene);
mat.roughness = 1;
var urnd = function (a, b) {
  if (a === void 0) {a = 0;}
  if (b === void 0) {b = 1;}
  return a + Math.random() * (b - a);
};
var rnd = function (a, b) {
  if (a === void 0) {a = 0;}
  if (b === void 0) {b = 1;}
  return urnd(a, b) * (Math.random() < 0.5 ? -1 : 1);
};
var box = MeshBuilder.CreatePolyhedron('', { type: 1, sizeX: 0.2, sizeY: 1, sizeZ: 0.2 });
var sps = new SolidParticleSystem('', scene);
var vy = new WeakMap();
sps.addShape(box, 8e2);
sps.initParticles = function () {
  var _a;
  var a = 0;
  for (var _i = 0, _b = sps.particles; _i < _b.length; _i++) {if (window.CP.shouldStopExecution(0)) break;
    var p = _b[_i];
    a = rnd(0, Math.PI);
    p.position.set(5 * Math.sin(a), urnd(-10, 100), 5 * Math.cos(a));
    p.scaling.y = Math.random() * 2 + 1;
    (_a = p.color) === null || _a === void 0 ? void 0 : _a.set(Math.random(), Math.random(), 1, 1);
    vy.set(p, Math.random() * 0.1 + 0.1);
  }window.CP.exitedLoop(0);
};
sps.updateParticle = function (p) {
  p.position.y -= vy.get(p);
  if (p.position.y < -10) {// passthru cam
    p.position.y = 100;
  }
  return p;
};
sps.initParticles();
sps.buildMesh();
box.dispose();
sps.setParticles();
sps.mesh.material = mat;
sps.mesh.rotation.set(Math.PI / 2, 0, 0);
scene.onBeforeRenderObservable.add(function () {return sps.setParticles();});
window.onresize = function () {return engine.resize();};
engine.runRenderLoop(function () {return scene.render();});
