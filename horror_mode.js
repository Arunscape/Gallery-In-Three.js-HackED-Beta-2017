var scene = new THREE.Scene();

var color1 = new THREE.Color(0x110000);
scene.background = color1;
scene.fog = new THREE.Fog(0x110000, 1, 240);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 300 );
camera.rotation.y = Math.PI;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

var cssScene = new THREE.Scene();

//--------------------------------------------------------------

var aLight2 = new THREE.AmbientLight( 0xffffff, 2);
scene.add(aLight2);

//--------------------------------------------------------------

var cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild( cssRenderer.domElement );

//--------------------------------------------------------------

//--------------------------------------------------------------

var ay = new THREE.Color(0xffffff);
var aLight = new THREE.AmbientLight( ay, 0.6 ); // soft white light
scene.add( aLight );

//--------------------------------------------------------------

var geo = new THREE.BoxGeometry( 2000, 200, 200);
var mat = new THREE.MeshStandardMaterial( {color: 0xbbbbbb} );
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


	var ye = new THREE.Color(0x883300);

	var darkMat = new THREE.MeshStandardMaterial( {color: ye} );
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

//=============================================================//
//               ===  S C A R Y  -  M O D E  ===               //
//=============================================================//

var links = [

	//'https://thumbs.gfycat.com/AliveUnpleasantHerring-max-1mb.gif',
	//'https://thumbs.gfycat.com/AliveUnpleasantHerring-max-1mb.gif',
	'https://zippy.gfycat.com/SeveralPowerlessLcont.webm',
	'https://zippy.gfycat.com/SeveralPowerlessLcont.webm',
	'https://zippy.gfycat.com/MintyHardtofindCob.webm',
	'https://zippy.gfycat.com/SplendidPeskyCat.webm',
	'https://thumbs.gfycat.com/SinglePepperyGreendarnerdragonfly-mobile.mp4',
	'https://thumbs.gfycat.com/FrightenedSilkyHalibut-mobile.mp4',
	'https://giant.gfycat.com/PrestigiousWeirdConure.webm',
	'https://zippy.gfycat.com/AcclaimedNaiveFennecfox.webm'

];

var oo;

for (let j = 0; j < 8; j++) {


	oo = Math.floor(j * (Math.random() * 320)) + (j * 100);

	console.log(oo);

	if (oo % 2 === 0){

		wall_link(oo, true, links[j]);

	} else {

		wall_link(oo, false, links[j]);

	}

}

for (let j = 0; j < 8; j++) {


	oo = -1 * (Math.floor(j * (Math.random() * 320)) + (j * 100));

	console.log(oo);

	if (oo % 2 === 0){

		wall_link(oo, true, links[j]);

	} else {

		wall_link(oo, false, links[j]);

	}

}


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

//green flash light

spotLight = new THREE.SpotLight(0x638059);
spotLight.intensity = 3;
spotLight.angle = Math.PI/8;
spotLight.distance = 1200;
spotLight.decay = 1;
camera.add(spotLight);
scene.add(camera);

spotLight.position.set(0,0,50);
spotLight.target = camera;



//--------------------------------------------------------------
//Control scheme

var t = 0.001;
var spinToggle = false;
var forward = false;
var backward = false;
var left = false;
var right = false;
var spooked = false;

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
//-----------------------------------------------------------
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





var t2 = 0;
var t3 = 0;
var t4 = 0;
var hT = 0;

var addColor = new THREE.Color(0x010101);

var animate = function () {

	requestAnimationFrame( animate );
    
    if (spinToggle === true){
        t += 0.005;
    }
    if (forward === true){
        camera.position.z -= Math.cos(t)*1.2;
        camera.position.x -= Math.sin(t)*1.2;
    }
    if (backward === true){
        camera.position.z += Math.cos(t)*1.2;
        camera.position.x += Math.sin(t)*1.2;
    }
    if (left === true){
        t += 0.04;
    }
    if (right === true){
        t -= 0.04;
    }
    
    camera.rotation.y = t;    
	
	
	t3 += 0.1 * Math.random();
	t4 += 0.1 * Math.random();
	hT += 0.1 * Math.random();

	if ( Math.floor(t3) % 10 === 0 ) {

		aLight2.intensity = 1;

	}

	else {

		aLight2.intensity = 0;

	}
	
	
	// erratic flicker of the flash light
	if ( Math.floor(t4) % Math.floor(Math.random() * 5) === 0 ) {

		spotLight.intensity = 3;

	}

	else if ( Math.floor(t4) % Math.floor(Math.random() * 3) === 0 ) {

		spotLight.intensity = 0;

	}
	
    var listener = new THREE.AudioListener();
    camera.add( listener );
    
    // create a global audio source
    var sound = new THREE.Audio( listener );

    var audioLoader = new THREE.AudioLoader();

	// shake camera
    
	if (Math.floor(hT) % 30 === 0 ) {
		camera.position.z = 80 * Math.random();
		camera.position.x = 80 * Math.random();
		camera.position.y = 10 * Math.random();
        if (spooked == false){
            spooked = true;

            audioLoader.load( '/reee.mp3', function( buffer ) {
            sound.hasPlaybackControl = true;
            sound.setBuffer( buffer );
            //sound.setLoop( true );
            sound.setVolume( 1 );
            sound.play();
            }); 
        }
	}

	ay.add(addColor);

	renderer.render( scene, camera );
	cssRenderer.render( cssScene, camera );
};

animate();