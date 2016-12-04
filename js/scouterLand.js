

(function(){
//    window.addEventListener("load",preload);
    window.addEventListener("load",init);
    var scene;
    var COLOR_LIST = [0x003399, 0x0066CC, 0x0099FF, 0x33CCFF];
    var ROUND = 2000;
    var words = [];
    var wraps = [];

    var arcs = [];

    var trya;

    var sphere;

    var camera;
    var width = 800, height = 600;

    

    var mesh;
    function preload(){
	WebFont.load({
	    custom:{
		families: ['FontAwesome'],
		urls: [
		    '//netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css'
		    ],
		testString: {
		    'FontAwesome': '\ef001'
		}
	    },
	    active: init   // yomiowattara
	});
    }

    function arc(){
	

    }
    function tryangle(angle  ){
	var LON = 110;
	var SIZE = 15;
	var x, y;
	x = Math.sin(angle)*LON;
	y = Math.cos(angle)*LON;
	var geom = new THREE.Geometry();
	geom.vertices[0] = new THREE.Vector3(-SIZE,SIZE*1.73,0);
	geom.vertices[1] = new THREE.Vector3(SIZE,SIZE*1.73,0);
	geom.vertices[2] = new THREE.Vector3(0,0,0);
	geom.translate(0,-SIZE*1.73/2,0);
	geom.faces[0] = new THREE.Face3(0,1,2);
	geom.rotateZ(-angle);
	geom.translate(x,y,0);

	var material = new THREE.MeshBasicMaterial({color: 0x22ddff, side: THREE.DoubleSide
						   } );
	var tri = new THREE.Mesh(geom, material);
	return tri;
    }

    function mbox(angle  ){
	var LON = 95;
	var SIZE = 15;
	var x, y;
	x = Math.sin(angle)*LON;
	y = Math.cos(angle)*LON;
	var geom = new THREE.CubeGeometry( 30, 30, 30 );
	var material = new THREE.MeshPhongMaterial( { color: 0xffccdd } );
	geom.rotateZ(-angle);
	geom.translate(x,y,0);
	box = new THREE.Mesh( geom, material );
	return box;
    }
    


    function init(){
	scene = new THREE.Scene();
	sphere = new THREE.Mesh(
	    new THREE.SphereGeometry(80,20,20),
	    new THREE.MeshLambertMaterial({color: 0x8dc3ff})
	);
	sphere.position.set(0,0,0);
//	scene.add(sphere);
    var geometry = new THREE.CubeGeometry( 30, 30, 30 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffccdd } );
	mesh = new THREE.Mesh( geometry, material );
//	mesh.position.set(100,10,0);
//	scene.add( mesh );
    //light
	light = new THREE.DirectionalLight(0xfffff,1);
	light.position.set(0,100,30);
	scene.add(light);

	trya = new THREE.Group();
	boxs = new THREE.Group();
	boxar = [];

	for(var i = 0; i < 4; i++){
	    var try1 = tryangle(i*Math.PI/2+Math.PI/4);
	    trya.add(try1);
           boxar[i] = mbox(i*Math.PI/2);
//            boxs.add(boxar[i]);
	    scene.add(boxar[i]);
	}
	scene.add(trya);



//    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
 //   renderer.setSize(width, height);
//    renderer.setClearColor(0xeeeee); background

//	var sct = document.getElementById('scouter');
///	width = sct.clientWidth;
//	height = sct.clientHeight;




//	renderer.setPixelRatio(window.devivePixelRatio);
//    renderer.setSize(width, height);
    var gs =  document.getElementById('gscouter');
	    gs.appendChild(renderer.domElement);
	width = $(window).width();
	height= $(window).height();
    //camera
	camera = new THREE.PerspectiveCamera(45, width /  height, 1, 1000);
//	camera.position.set(200, 100, 300);
//	camera.position.set(0, 100, 300);
	camera.position.set(0, 0, 400);
	camera.lookAt(scene.position);

    renderer.setSize(width, height);
    renderer.setClearColor(0x00000,0);
//    document.getElementById('stage').appendChild(renderer.domElement);

//	var grid = new THREE.GridHelper(2000,2000);
//	grid.setColors(0x888888,0x888888);
//	grid.position.y = -30;
//	scene.add(grid);

    var controls = new THREE.OrbitControls(camera);

    renderer.render(scene, camera);
	$(window).resize(function(){
	width = $(window).width();
	height= $(window).height();
	renderer.setSize(width, height);
	camera.aspect = width/height;
	camera.updateProjectionMatrix();
	console.log("Width+HEight"+width+","+height);
    });



    var lasttime = Date.now();
    function loop(timestamp){
//	console.log(lasttime-timestamp); // around 16.6msec
	lasttime = timestamp;
	requestAnimationFrame(loop);
	controls.update();
	renderer.clear();
	renderer.render(scene,camera);
	

	for(var i = 0; i < 4; i++){
	    var pos = boxar[i].position;
//	    boxar[i].translate(pos.nagete);
//	    pos//	    boxargeom.translate(x,y,0);
//	    boxar[i].rotation.set(
//		0,
//		boxar[i].rotation.y + .01,0
//		boxar[i].rotation.z + .01
//	    );

//	    boxar[i].translate(pos);

	    boxar[i].rotation.set(
		0,0,
//		boxar[i].rotation.y + .01,
		boxar[i].rotation.z + .01
	    );

	}
	trya.rotation.set(0,0,	    trya.rotation.z + .02);
//	boxs.rotation.set(0,0,	    boxs.rotation.z + .02);
    }

	loop();

    }
    // 

})();


