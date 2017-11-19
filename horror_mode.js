var scene = new THREE.Scene();

var color1 = new THREE.Color(0x000000);
scene.background = color1;
scene.fog = new THREE.Fog(0x110000, 1, 240);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 300 );

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

/*
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
*/

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

var t = 0;
var t2 = 0;
var t3 = 0;

var addColor = new THREE.Color(0x010101);

var animate = function () {

	requestAnimationFrame( animate );

	t +=0.004;

	camera.position.z = 80 * Math.sin(t);
	camera.position.x = 80 * Math.cos(t);
	camera.position.y = 10 * Math.cos(t);

	t3 += 0.1 * Math.random();

	if ( Math.floor(t3) % 10 === 0 ) {

		aLight2.intensity = 1;

	}

	else {

		aLight2.intensity = 0;

	}

	ay.add(addColor);

	camera.lookAt(cube.position);

	renderer.render( scene, camera );
	cssRenderer.render( cssScene, camera );
};

animate();
