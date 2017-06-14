var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.width, canvas.height);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
scene.add(camera);

var room = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6, 8, 8, 8, 8),
  new THREE.MeshBasicMaterial({color: 0x404040, wireframe: true})
);
room.position
// room.position.y = 3;
scene.add(room);

var earthGroup = new THREE.Group();
var earth = new EARTH.Earth(earthGroup, 1, {name: 'Full'});
scene.add(earthGroup);

earthGroup.position.set(3, 3, 3);
// earthGroup.position.z = -8;

var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(0, 0, 2);
scene.add(light);

var controls = new THREE.VRControls(camera);
controls.standing = true;
var effect = new THREE.VREffect(renderer);

WEBVR.getVRDisplay((display) => {
  document.body.appendChild(WEBVR.getButton(display, renderer.domElement));
});

function animate() {
  effect.requestAnimationFrame(animate);
  
  controls.update();

  // renderer.render(scene, camera);
  effect.render(scene, camera);
  earthGroup.rotation.y += 0.01;
}

animate();


