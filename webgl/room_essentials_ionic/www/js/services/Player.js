app.service('Player', function(){

  'use strict';

  var movementRate = 2,
      playerBox,
      playerBoxMaterial, 
      finishLineZPos = -920;

  function Player(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    createPlayer(this.scene);
  }

  function checkIfPlayerAtFinish() {
    if (playerBox.position.z <= finishLineZPos) {

    }
  }

  function createPlayer(scene) {

    playerBoxMaterial = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({ visible: false}),
      0.1, // friction
      0.5  // bounciness
    );

    var personMaterial = new THREE.MeshPhongMaterial({
      ambient: 0x0dd00,
      transparent: true
    });

    var playerBody = new Physijs.BoxMesh(
      new THREE.BoxGeometry(8, 5, 5),
      personMaterial,
      0.1
    );

    playerBody.position.y = -8;

    var playerLLeg = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2, 5, 5),
      personMaterial,
      0.1
    );

    playerBody.add(playerLLeg);
    playerLLeg.position.y = -5;
    playerLLeg.position.x = -2;

    var playerRLeg = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2, 5, 5),
      personMaterial,
      0.1
    );

    playerBody.add(playerRLeg);
    playerRLeg.position.y = -5;
    playerRLeg.position.x = 2;

    playerBox = new Physijs.BoxMesh(
      new THREE.BoxGeometry(10, 10, 10),
      playerBoxMaterial,
      0.1
    );

    playerBox.position.set(0, 15, 50);
    playerBox.name = "playerBox";
    playerBox.add(playerBody);
    playerBody.position.y = 2;
    window.playerBox = playerBox;
    scene.add(playerBox);
  }


  Player.prototype.moveX = function(movement) {
    this.camera.position.x += movementRate * movement;
    this.camera.__dirtyPosition = true;
    playerBox.position.x += movementRate * movement;
    playerBox.__dirtyPosition = true;
  };

  Player.prototype.moveZ = function(movement) {
    this.camera.position.z += movementRate * movement;
    this.camera.__dirtyPosition = true;
    playerBox.position.z += movementRate * movement;
    playerBox.__dirtyPosition = true;

    checkIfPlayerAtFinish();
  };

  return Player;
  

});