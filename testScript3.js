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
//scene.add( bulbLight );

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

var t = 0.001;
var moving = false;

//---------------------------------------------------------------

/*
var spotLight = new THREE.SpotLight(0xffffff,1,10);
camera.add(spotLight);
spotLight.position.set( 0, 0, 1 );
spotLight.castShadow = true;
spotLight.target = camera;
scene.add(camera);
//scene.add( spotLight );
*/


pointLight = new THREE.PointLight( 0xffffff );
//pointLight.position.set(1,1,2);
camera.add(pointLight);
scene.add(camera);

let helper = new THREE.CameraHelper(camera);
scene.add(helper);






var animate = function () {

	requestAnimationFrame( animate );

    camera.rotation.y = t;
	//spotLight.position.copy( camera.position );
	//spotLight.rotation.copy( camera.rotation );
	//spotLight.target.updateMatrixWorld();
    renderer.render(scene, camera);

};
   
document.addEventListener('keydown', function(event) {
    //Forward
    if (event.keyCode == 38) {
        camera.position.z -= Math.cos(t)*0.10;
        camera.position.x -= Math.sin(t)*0.10;
        //event.keyCode = 0;
        
    }
    //Backwards
    if (event.keyCode == 40) {
        camera.position.z += Math.cos(t)*0.10;
        camera.position.x += Math.sin(t)*0.10;
        //event.keyCode = 0;
    }
    //Left
    if (event.keyCode == 37) {
        t += 0.08;
        //camera.rotation.y += 0.0001;
    }
    //Right
    if (event.keyCode == 39) {
        t -= 0.08;
        //camera.rotation.y -= 0.0001;
    }
    //Bound the camera's z and x position to the shape of the
    //cylinder.
    typeof camera.position.z;
    typeof camera.position.x;
    
    camera.position.z = Math.min(Math.max(camera.position.z,-9),9);
    camera.position.x = Math.min(Math.max(camera.position.x,-9),9);
    //Math.min(Math.max(number,1),20);
}, true);
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