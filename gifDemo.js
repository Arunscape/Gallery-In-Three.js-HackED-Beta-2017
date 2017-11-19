var scene = new THREE.Scene();

var color1 = new THREE.Color(0x00CCFF);
scene.background = color1;
scene.fog = new THREE.Fog(0x00000, 1, 20);

//--------------------------------------------------------------

var cssScene = new THREE.Scene();

//--------------------------------------------------------------

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

//--------------------------------------------------------------

// create the plane mesh
var material = new THREE.MeshBasicMaterial({ color: 0x00FF00});
var geometry = new THREE.PlaneGeometry(1,1);
material.side = THREE.DoubleSide;
var planeMesh= new THREE.Mesh( geometry, material );
// add it to the WebGL scene
scene.add(planeMesh);

//--------------------------------------------------------------

// create the dom Element
var element = document.createElement( 'video' );
element.setAttribute("autoplay", true);
element.setAttribute("loop", true);
element.width = 100;
element.height = 100;
element.src = 'res/gifs/coolio_1.webm';
// create the object3d for this element
var cssObject = new THREE.CSS3DObject( element );
// we reference the same position and rotation 
cssObject.position = planeMesh.position;
cssObject.position.x = planeMesh.position.x - 60;
cssObject.rotation = planeMesh.rotation;
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
element2.src = 'res/gifs/coolio_2.webm';
var cssObject2 = new THREE.CSS3DObject( element2 );
cssObject2.position = cssObject.position;
cssObject2.position.x = planeMesh.position.x + 60;
cssObject2.rotation = cssObject.rotation;
cssScene.add(cssObject2);

//--------------------------------------------------------------


var material   = new THREE.MeshBasicMaterial();
material.color.set('black')
material.opacity   = 0;
material.blending  = THREE.NoBlending;
// any mesh using this material will act as a see-thru to the css renderer

camera.translateZ(100);
camera.lookAt(planeMesh.position);

var t = 0;


var animate = function () {

	requestAnimationFrame( animate );

	/*
	planeMesh.rotation.x += 0.0003;
	planeMesh.rotation.y += 0.0003;
	cssObject.rotation.x = planeMesh.rotation.x;
	cssObject.rotation.y = planeMesh.rotation.y;
	*/

	camera.position.x = 40 * Math.sin(t);
	t += 0.01;

	camera.rotation.y = 0.4 * Math.sin(2 * t);
	camera.rotation.x = 0.05 * Math.sin( 2 * t );

	renderer.render(scene, camera);
	cssRenderer.render(cssScene, camera);
};

animate();
