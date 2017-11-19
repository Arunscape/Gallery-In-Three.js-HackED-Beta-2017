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

var geometry = new THREE.CylinderGeometry( 10, 10, 5, 7 );
var material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
material.side = THREE.DoubleSide;
var cylinder = new THREE.Mesh( geometry, material );
cylinder.receiveShadow = true;
scene.add( cylinder );

//--------------------------------------------------------------

var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
var material2 = new THREE.MeshStandardMaterial( {color:0xf4f4f4} );
var cube = new THREE.Mesh( geometry2, material2 );
cube.castShadow = true;
cube.receiveShadow = true;
scene.add ( cube );

camera.position.z = -3;
camera.position.y = 0;
camera.position.x = 0;

var t = 0;


var animate = function () {

	requestAnimationFrame( animate );
/*
	t +=0.004;
	camera.position.z = 4 * Math.sin(t);
	camera.position.x = 4 * Math.cos(t);
	camera.position.y = 2 * Math.cos(t);
*/
	//camera.lookAt(cylinder.position);
    //camera.position.x+=0.04;
	renderer.render(scene, camera);
    //TODO: fix input "lag"
    document.addEventListener('keypress', function(event) {
        //Forward
        if (event.keyCode == 38) {
            camera.position.z-=0.001;
        }
        //Backwards
        else if (event.keyCode == 40) {
            camera.position.z+=0.001;
        }
        //Left
        else if (event.keyCode == 40) {
            camera.rotation.y+=0.001;
        }
        //Right
        else if (event.keyCode == 40) {
            camera.position.z+=0.001;
        }
    }, true);
    
};
   
//camera.lookAt(cylinder.position);
animate();
/*
 document.addEventListener('keydown', function(event) {
        if (event.keyCode == 37) {
            alert('Left was pressed');
        }
        else if (event.keyCode == 39) {
            alert('Right was pressed');
        }
    }, true);
    
};
*/