var scene = new THREE.Scene();

var color1 = new THREE.Color(0x00CCFF);
scene.background = color1;
scene.fog = new THREE.Fog(0x00000, 1, 20);

//--------------------------------------------------------------

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );


//--------------------------------------------------------------

var cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;


//--------------------------------------------------------------

var aLight = new THREE.AmbientLight( 0xffffff, 1, ); // soft white light
scene.add( aLight );

//--------------------------------------------------------------

var geometry2 = new THREE.PlaneGeometry();
var material2 = new THREE.MeshBasicMaterial({ wireframe: true });
material2.side = THREE.DoubleSide;
//material2.color = new THREE.Color(0xff1111);
var plane = new THREE.Mesh( geometry2, material2 );
scene.add ( plane );

//--------------------------------------------------------------

// create the plane mesh
var material = new THREE.MeshBasicMaterial({ wireframe: true });
var geometry = new THREE.PlaneGeometry();
var planeMesh= new THREE.Mesh( geometry, material );
// add it to the WebGL scene
scene.add(planeMesh);

//--------------------------------------------------------------

// create the dom Element
var element = document.createElement( 'img' );
element.src = 'res/images/image.jpg';
// create the object3d for this element
var cssObject = new THREE.CSS3DObject( element );
// we reference the same position and rotation 
cssObject.position = planeMesh.position;
cssObject.rotation = planeMesh.rotation;
// add it to the css scene
scene.add(cssObject);

//--------------------------------------------------------------



var animate = function () {

	requestAnimationFrame( animate );

	renderer.render(scene, camera);
};

animate();
