var scene = new THREE.Scene();

var color1 = new THREE.Color(0x00CCFF);
scene.background = color1;
scene.fog = new THREE.Fog(0x00000, 1, 8);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var cube2 = new THREE.Mesh(geometry, material);
cube2.translateY(2);
scene.add(cube2);

camera.position.z = 5;
var t = 4;

var animate = function () {
	requestAnimationFrame( animate );

	t +=0.02;
	camera.position.z = 4 * Math.sin(t);
	camera.position.x = 4 * Math.cos(t);
	camera.position.y = 2 * Math.cos(t);

	console.log("camera.position.z = " + camera.position.z);

	camera.lookAt(scene.position);

	renderer.render(scene, camera);
};

animate();
