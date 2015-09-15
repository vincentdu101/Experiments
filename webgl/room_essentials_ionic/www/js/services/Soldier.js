app.service('Soldier', function(){

  'use strict';

  var blendMesh, render, scene, camera, player;

  function Soldier(inputScene, inputCamera, inputRender) {
    scene = inputScene;
    camera = inputCamera;
    render = inputRender;
    blendMesh = new THREE.BlendCharacter();
    blendMesh.load( "js/webgl/models/marine/marine_anims.js", this.start );
  }

  Soldier.prototype.start = function(geometry, material) {
    player = new Physijs.BoxMesh(
      new THREE.BoxGeometry(10, 10, 10),
      playerBoxMaterial,
      0.1
    );    
    // blendMesh.position.set(0, 15, 50);
    // blendMesh.rotation.y = Math.PI * -135 / 180;
    scene.add(blendMesh);
    blendMesh.animations[ 'idle' ].weight = 1 / 3;
    blendMesh.animations[ 'walk' ].weight = 1 / 3;
    blendMesh.animations[ 'run' ].weight = 1 / 3;  
    var radius = blendMesh.geometry.boundingSphere.radius;
    camera.position.set( 0.0, radius, radius * 3.5 );
    debugger;
    render(); 
  }

  Soldier.prototype.update = function(step) {
    blendMesh.update(step);
  };

  Soldier.prototype.moveX = function(movement) {
    camera.position.x += movementRate * movement;
    camera.__dirtyPosition = true;
    playerBox.position.x += movementRate * movement;
    playerBox.__dirtyPosition = true;
  };

  Soldier.prototype.moveZ = function(movement) {
    camera.position.z += movementRate * movement;
    camera.__dirtyPosition = true;
    playerBox.position.z += movementRate * movement;
    playerBox.__dirtyPosition = true;

    checkIfPlayerAtFinish();
  };

  return Soldier;  

});