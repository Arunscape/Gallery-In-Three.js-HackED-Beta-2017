var scene = new THREE.Scene();

var color1 = new THREE.Color(0x00CCFF);
scene.background = color1;
scene.fog = new THREE.Fog(0x00000, 1, 400);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

var cssScene = new THREE.Scene();

//--------------------------------------------------------------

var cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild( cssRenderer.domElement );

//--------------------------------------------------------------

var bulbLight = new THREE.PointLight( 0xffaabb, 1, 200, 2 );
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

var aLight = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
scene.add( aLight );

//--------------------------------------------------------------

var geo = new THREE.BoxGeometry( 2000, 200, 200);
var mat = new THREE.MeshStandardMaterial( {color: 0xffffff} );
mat.side = THREE.DoubleSide;
var cylinder = new THREE.Mesh( geo, mat );
cylinder.receiveShadow = true;
scene.add( cylinder );

//--------------------------------------------------------------

var geo2 = new THREE.BoxGeometry( 1, 1, 1 );
var mat2 = new THREE.MeshStandardMaterial( {color:0xf4f4f4} );
var cube = new THREE.Mesh( geo2, mat2 );
cube.castShadow = true;
cube.receiveShadow = true;
scene.add ( cube );

camera.position.z = -3;
camera.position.y = 0;
camera.position.x = 0;

//--------------------------------------------------------------

// create the dom Element
var element = document.createElement( 'video' );
element.setAttribute("autoplay", true);
element.setAttribute("loop", true);
element.width = 100;
element.height = 100;
// create the object3d for this element
var cssObject = new THREE.CSS3DObject( element );
// we reference the same position and rotation
cssObject.position = cube.position;
cssObject.position.z = -100;
cssObject.rotation = cube.rotation;
// add it to the css scene
cssScene.add(cssObject);

//--------------------------------------------------------------

var cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild( cssRenderer.domElement );

//--------------------------------------------------------------

var element2 = document.createElement( 'video' );
element2.setAttribute("autoplay", true);
element2.setAttribute("loop", true);
element2.width = 100;
element2.height = 100;
var cssObject2 = new THREE.CSS3DObject( element2 );
cssObject2.position = cssObject.position;
cssObject2.position.z = 100;
cssObject2.rotation = cssObject.rotation;
cssScene.add(cssObject2);

//--------------------------------------------------------------

var darkMat = new THREE.MeshStandardMaterial( {color: 0xbe9c91} );
var planeGeo = new THREE.PlaneGeometry(110, 210);
var planeMesh1 = new THREE.Mesh( planeGeo, darkMat );
var planeMesh2 = new THREE.Mesh( planeGeo, darkMat );

darkMat.side = THREE.DoubleSide;

planeMesh1.position.z = 99
planeMesh2.position.z = -99;

scene.add(planeMesh1);
scene.add(planeMesh2);

//--------------------------------------------------------------

var randomNumber1 = Math.floor(Math.random() * 100);
var randomNumber2 = Math.floor(Math.random() * 100);


getGyfs().then(function(gyfs) {

	element2.src = gyfs[randomNumber1];
	element.src = gyfs[randomNumber2];
})

//--------------------------------------------------------------

var wall = function(i, wall, gif_number){

	var gif_element = document.createElement( 'video' );
	gif_element.setAttribute("autoplay", true);
	gif_element.setAttribute("loop", true);
	gif_element.width = 100;
	gif_element.height = 100;
	var gif_cssObject = new THREE.CSS3DObject( gif_element );
	gif_cssObject.position = cssObject.position;


	if (wall){

		gif_cssObject.position.z = 100;

	} else {

		gif_cssObject.position.z = -100;

	}



	gif_cssObject.position.x = i;
	gif_cssObject.rotation = cssObject.rotation;
	cssScene.add(gif_cssObject);

	getGyfs().then(function(gyfs) {

		gif_element.src = gyfs[gif_number];

	})

	var darkMat = new THREE.MeshStandardMaterial( {color: 0xbe9c91} );
	var planeGeo = new THREE.PlaneGeometry(110, 210);
	var gif_planeMesh = new THREE.Mesh( planeGeo, darkMat );

	darkMat.side = THREE.DoubleSide;

	gif_planeMesh.position.x = i;

	if (wall){

		gif_planeMesh.position.z = 99;

	} else {

		gif_planeMesh.position.z = -99;

	}


	scene.add(gif_planeMesh);
}

//--------------------------------------------------------------

wall(-150, false, 30);
wall(150, true, 40);
wall(-150, true, 32);
wall(150, false, 23);
wall(-300, false, 72);
wall(300, true, 81);
wall(-300, true, 11);
wall(300, false, 12);

var t = 0;


var animate = function () {

	requestAnimationFrame( animate );

	t +=0.004;
	camera.position.z = 80 * Math.sin(t);
	camera.position.x = 80 * Math.cos(t);
	camera.position.y = 10 * Math.cos(t);

	camera.lookAt(cube.position);

	renderer.render( scene, camera );
	cssRenderer.render( cssScene, camera );
};

animate();
