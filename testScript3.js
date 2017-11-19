var scene = new THREE.Scene();

var color1 = new THREE.Color(0x00CCFF);
scene.background = color1;
scene.fog = new THREE.Fog(0x00000, 1, 20);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

//--------------------------------------------------------------

var bulbLight = new THREE.PointLight( 0xff1111, 0.6, 100, 2 );
var bulbGeometry = new THREE.SphereGeometry( 0.02, 2, 2 );
bulbMat = new THREE.MeshStandardMaterial( {
	emissive: 0xffffff,
	emissiveIntensity: 1,
	color: 0x000000
});
bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
bulbLight.position.set( 1, 2, 0 );
bulbLight.castShadow = true;
scene.add( bulbLight );

bulbLight.shadow.mapSize.width = 512;  // default
bulbLight.shadow.mapSize.height = 512; // default
bulbLight.shadow.camera.near = 0.5;       // default
bulbLight.shadow.camera.far = 500      // default

//--------------------------------------------------------------

var aLight = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( aLight );

//--------------------------------------------------------------

var geometry = new THREE.BoxGeometry( 20, 10, 10 );
var material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
material.side = THREE.DoubleSide;
var rectangle = new THREE.Mesh( geometry, material );
rectangle.receiveShadow = true;
//scene.add( rectangle );

//--------------------------------------------------------------

var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
var material2 = new THREE.MeshStandardMaterial( {color:0xf4f4f4} );
var cube = new THREE.Mesh( geometry2, material2 );
cube.castShadow = true;
cube.receiveShadow = true;
scene.add ( cube );

camera.position.z = 0;
camera.position.y = 0;
camera.position.x = 0;

var t = 0;


var animate = function () {

	requestAnimationFrame( animate );
/*
	t +=0.004;
	camera.position.z = 3 ; //forward/backwards
	camera.position.x = 0 ;	// left right
	camera.position.y = 0 ; // y is up
	camera.lookAt(cube.position);

	renderer.render(scene, camera);
};

animate();
