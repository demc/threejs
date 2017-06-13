var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.width, canvas.height);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
scene.add(camera);

var loader = new THREE.TextureLoader();

loader.load(
  "/first/webgl-logo-256.jpg",
  (texture) => {
    var material = new THREE.MeshPhongMaterial({ map: texture });
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    
    var cube = new THREE.Mesh(geometry, material);
    cube.position.z = -8;
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      cube.rotation.y += 0.01;

    }

    animate();
  }
);

