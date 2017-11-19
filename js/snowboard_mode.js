
//-------------------------------------------------------------


var scene = new THREE.Scene();

var color1 = new THREE.Color(0x99ccff);
scene.background = color1;
scene.fog = new THREE.Fog(0x99ccff, 40, 800);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

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


var bulbLight = new THREE.PointLight( 0xffffff, 1, 200, 2 );
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

var ay = new THREE.Color(0xaaffaa);
var aLight = new THREE.AmbientLight( ay, 0.1 ); // soft white light
scene.add( aLight );

//--------------------------------------------------------------

var why = new THREE.Color(0x0044FF);
var geo_yeah = new THREE.BoxGeometry(2000, 50, 200);
var mat_yeah = new THREE.MeshBasicMaterial( {color: 0xff0000} );
//mat_yeah.lights = true;
mat_yeah.side = THREE.DoubleSide;

var floor_mesh = new THREE.Mesh(geo_yeah, mat_yeah);
floor_mesh.recieveShadow = true;

scene.add(floor_mesh);

floor_mesh.position.y = -85;

//--------------------------------------------------------------

var geo = new THREE.BoxGeometry( 2000, 200, 200);
var mat = new THREE.MeshStandardMaterial( {color: 0xffccaa} );
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
//scene.add ( cube );

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

//Control Scheme

var t = 0.001;
var spinToggle = false;
var forward = false;
var backward = false;
var left = false;
var right = false;


document.addEventListener('keydown', function(event) {
    //Forward
    if (event.keyCode == 38) {
        forward = true;
    }
    //Backwards
    if (event.keyCode == 40) {
        backward = true;
    }
    //Left
    if (event.keyCode == 37) {
        left = true;
    }
    //Right
    if (event.keyCode == 39) {
        right = true;
    }
    //Spacebar, toggles auto-rotate
    if (event.keyCode == 32) {
        spinToggle = !spinToggle;
    }

    //Bound the camera's z and x position to the shape of the
    //cylinder.

    //NOTE: Dispite the cylinder having a radius of 10, the bounds must be smaller to prevent the camera clipping. Alternative mathod would be to change camera clip distance, but this could have unforseen consequences.
    camera.position.z = Math.min(Math.max(camera.position.z,-40),40);
    camera.position.x = Math.min(Math.max(camera.position.x,-580),580);
    //Math.min(Math.max(number,1),20);
}, true);

document.addEventListener('keyup', function(event) {
    //Forward
    if (event.keyCode == 38) {
        forward = false;
    }
    //Backwards
    if (event.keyCode == 40) {
        backward = false;
    }
    //Left
    if (event.keyCode == 37) {
        left = false;
    }
    //Right
    if (event.keyCode == 39) {
        right = false;
    }
}, true);


//--------------------------------------------------------------
//------------------------------------------
//Add sound
var listener = new THREE.AudioListener();
camera.add( listener );
var sound = new THREE.Audio( listener );
var audioLoader = new THREE.AudioLoader();
audioLoader.load( '/acid.mp3', function( buffer ) {
sound.hasPlaybackControl = true;
sound.setBuffer( buffer );
//sound.setLoop( true );
sound.setVolume( 0.5 );
sound.play();
});


//------------------------------------------



//--------------------------------------------------------------

var wall_link = function(i, wall, gifLink){

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


	gif_element.src = gifLink;


	var ye = new THREE.Color(0x99ccff);

	var darkMat = new THREE.MeshStandardMaterial( {color: ye} );
	var planeGeo = new THREE.PlaneGeometry(110, 210);
	var gif_planeMesh = new THREE.Mesh( planeGeo, darkMat );

	darkMat.side = THREE.DoubleSide;
	console.log(i);
	gif_planeMesh.position.x = i;

	if (wall){

		gif_planeMesh.position.z = 99;

	} else {

		gif_planeMesh.position.z = -99;

	}


	scene.add(gif_planeMesh);
}

//=============================================================//
//               ===  S C A R Y  -  M O D E  ===               //
//=============================================================//

var links = [

	'https://giant.gfycat.com/DetailedBelatedCur.webm',
	'https://giant.gfycat.com/ForcefulAdvancedCanary.webm',
	'https://fat.gfycat.com/SelfreliantSmoothBlacklemur.webm',
	'https://giant.gfycat.com/IndolentShamefulDesertpupfish.webm',
	'https://fat.gfycat.com/JitteryWellwornIndianrockpython.webm',
	'https://giant.gfycat.com/SpiritedGreenBeagle.webm',
	'https://giant.gfycat.com/AdeptBouncyIberianlynx.webm',
	'https://giant.gfycat.com/HappyIdleBaboon.webm',
	'https://fat.gfycat.com/VillainousSeveralArgentineruddyduck.webm',
	'https://giant.gfycat.com/EthicalChiefCob.webm',
	'https://giant.gfycat.com/BeautifulSparklingDikdik.webm',
	'https://giant.gfycat.com/MadYoungGraysquirrel.webm'

];

for (let j = 0; j < 6; j++) {

	wall_link(j * 150, true, links[j]);

	wall_link(j * 150, false, links[j+1]);

}

for (let j = 6; j < 12; j++) {


	wall_link((j - 5) * -150, true, links[j]);

	wall_link((j - 5) * -150, false, links[j+1]);

}

// wall_link(0,false,0)
// wall_link(0,true,1)
//
// wall_link(-150, false, 2);
// wall_link(150, true, 3);
// wall_link(-150, true, 4);
// wall_link(150, false, 5);
// wall_link(-300, false, 6);
// wall_link(300, true, 7);
// wall_link(-300, true, 8);
// wall_link(300, false, 9);




//=============================================================//
//               ===  S C A R Y  - M O D E  ===                //
//=============================================================//


var pillar_geo = new THREE.CylinderGeometry( 10, 10, 400, 9);

var makePillar = function( i ){

	let pillar_mesh1 = new THREE.Mesh( pillar_geo, pillar_mat );
	let pillar_mesh2 = new THREE.Mesh( pillar_geo, pillar_mat );

	var ye = Math.floor(0xffffff * Math.random());

	var pillar_mat = new THREE.MeshStandardMaterial( { color: ye } );
	pillar_mat.recieveShadow = true;

	pillar_mesh1.position.z =  105;
	pillar_mesh2.position.z = -105;

	pillar_mesh1.position.x = 70 + i * 150;
	pillar_mesh2.position.x = 70 + i * 150;

	scene.add(pillar_mesh1);
	scene.add(pillar_mesh2);

}



//--------------------------------------------------------------

var t = 0;
var t2 = 0;
var t3 = 0;

var spotLight = new THREE.SpotLight();

spotLight.intensity = 2;
spotLight.angle = Math.PI/8;
spotLight.distance = 500;
spotLight.decay = 2;
camera.add(spotLight);
scene.add(camera);

spotLight.position.set(0,0,50);
spotLight.target = camera;

var animate = function () {

	requestAnimationFrame( animate );

	t3 +=0.1;

	spotLight.intensity = (1+Math.sin(t3));

	if (spinToggle === true){
        t += 0.005;
    }
    if (forward === true){
        camera.position.z -= Math.cos(t);
        camera.position.x -= Math.sin(t);
    }
    if (backward === true){
        camera.position.z += Math.cos(t);
        camera.position.x += Math.sin(t);
    }
    if (left === true){
        t += 0.04;
    }
    if (right === true){
        t -= 0.04;
    }

    camera.rotation.y = t;

	renderer.render( scene, camera );
	cssRenderer.render( cssScene, camera );
};

animate();
