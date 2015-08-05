app.service('Soldier', function(){

  'use strict';

  var blendMesh, render, scene, camera;

  function Soldier(inputScene, inputCamera, inputRender) {
    scene = inputScene;
    camera = inputCamera;
    render = inputRender;
    blendMesh = new THREE.BlendCharacter();
    blendMesh.load( "js/webgl/models/marine/marine_anims.js", this.start );
  }

  Soldier.prototype.start = function() {
    // blendMesh.position.set(0, 15, 50);
    scene.add(blendMesh);
    blendMesh.animations[ 'idle' ].weight = 1 / 3;
    blendMesh.animations[ 'walk' ].weight = 1 / 3;
    blendMesh.animations[ 'run' ].weight = 1 / 3;   
    render(); 
  }

  Soldier.prototype.moveX = function(movement) {
    this.camera.position.x += movementRate * movement;
    this.camera.__dirtyPosition = true;
    playerBox.position.x += movementRate * movement;
    playerBox.__dirtyPosition = true;
  };

  Soldier.prototype.moveZ = function(movement) {
    this.camera.position.z += movementRate * movement;
    this.camera.__dirtyPosition = true;
    playerBox.position.z += movementRate * movement;
    playerBox.__dirtyPosition = true;

    checkIfPlayerAtFinish();
  };

  Soldier

  return Soldier;  

});