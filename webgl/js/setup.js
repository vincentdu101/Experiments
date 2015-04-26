var setup = (function(){

  'use strict';

  Physijs.scripts.worker = 'js/physijs_worker.js';
  Physijs.scripts.ammo = 'ammo.js';

  // for changing directions, ex: going forward and backwards in 3d
  var velocity = new THREE.Vector3(),
      prevTime = performance.now(),
      time = null,
      direction = {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        x: 0, 
        y: 0
      };

  var scene = new Physijs.Scene(),
      camera, 
      width = window.innerWidth - 300,
      height = window.innerHeight - 100,
      renderer = new THREE.WebGLRenderer(),
      controls;

  renderer.setSize(width, height);
  renderer.setClearColor(0xE0EEEE);

  document.getElementById('webgl-container').appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    35,
    width / height,
    1, 
    1000
  );

  controls = new THREE.TrackballControls( camera );

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

  controls.addEventListener('change', function(event) {
    debugger;
  });

  // controls = new THREE.OrbitControls( camera );
  // controls.maxPolarAngle = Math.PI / 2;
  // controls.minDistance = 0;
  // controls.maxDistance = 50;

  scene.add(camera);
  scene.background = new THREE.Fog(0xE0EEEE, 250, 600);
  scene.setGravity(new THREE.Vector3(0, -100, 0));

  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 1, 1).normalize();
  scene.add(light);

  // looks

  var onKeyAction = function ( event, action ) {
    switch ( event.keyCode ) {
      case 38: // up
        direction.moveForward = action === 'keydown';
        break;      
      case 87: // w
        direction.rotateUp = action === 'keydown';
        break;

      case 37: // left
        direction.moveLeft = action === 'keydown'; 
        break;

      case 65: // a
        direction.rotateLeft = action === 'keydown'; 
        break;

      case 40: // down
        direction.moveBackward = action === 'keydown';
        break;
      case 83: // s
        direction.rotateDown = action === 'keydown';
        break;

      case 39: // right
        direction.moveRight = action === 'keydown';
        break;
      case 68: // d
        direction.rotateRight = action === 'keydown';
        break;

      // case 32: // space
      //   if ( canJump === true ) velocity.y += 350;
      //   canJump = false;
      //   break;
      //   
    }
  };

  var mousemove = function mousemove(event) {
    direction.x = event.x;
    direction.y = event.y;
  };

  var mousedown = function mousedown(event) {
    direction.x = event.x;
    direction.y = event.y;
  };  

  function interactiveMovement() {
    document.addEventListener( 'keydown', function(event) {
      onKeyAction(event, 'keydown');
    }, false );

    document.addEventListener( 'keyup', function(event) {
      onKeyAction(event, 'keyup');
    }, false );    
    // document.addEventListener( 'mousemove', mousemove, false);
    // document.addEventListener( 'mousedown', mousedown, false);
  }

  function init() {
    camera.position.z = 0;
    showcase.init(scene, renderer, camera);
    interactiveMovement();
    render();
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    showcase.update(direction);
    controls.update();
  }

  return {
    init: init
  }

})();

window.onload = setup.init();