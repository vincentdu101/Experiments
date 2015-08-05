app.service('World', function(){

  'use strict';

  function World(scene) {
    this.scene = scene;
    this.addSceneObjects();
  }

  function setupSceneLighting(scene) {
    var ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 200, -50);
    scene.add(spotLight);
  }

  function getRand(min, max) {
    return Math.random() * (max - min) + min;
  }  

  World.prototype.createRoad = function(zPos) {
    var road = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 1, 250),
      new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('img/road.jpg')}),
      0
    );

    road.name = "road";
    road.position.y = 1;
    road.position.z = zPos;
    this.scene.add(road);
  };

  World.prototype.createLake = function(zPos) {
    var lake = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 1, 250),
      new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('img/water.jpg')}),
      0
    );
    lake.name = 'lake';
    lake.position.y = 1;
    lake.position.z = zPos;
    this.scene.add(lake);
  };

  World.prototype.createTree = function(x, z) {
    var treeTexture = THREE.ImageUtils.loadTexture('img/tree.jpg');
    var treeBaseWidth = getRand(15, 22);

    var tree = new THREE.Mesh(
        new THREE.CylinderGeometry(1, treeBaseWidth, 60, 9, 9, false),
        new THREE.MeshLambertMaterial({ ambient: 0x003311 * getRand(0, 5), map: treeTexture }),
        0
    );

    var stump = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 20, 9, 9, false),
        new THREE.MeshLambertMaterial({ ambient: 0x552211  }),
        0
    );

    tree.add(stump);

    stump.position.y = -40;

    tree.name = "tree";
    tree.position.set(x, 40, z);

    this.scene.add(tree);
  };  

  World.prototype.addSceneObjects = function() {
    
    var grassTexture = new THREE.ImageUtils.loadTexture('img/grass.png');
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(25, 25);

    var material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({map: grassTexture}),
      0.9,
      0.1
    );

    var ground = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2000, 1, 2000),
      material,
      0
    );

    ground.name = "ground";
    ground.position.y = 0;
    this.scene.add(ground);

    this.createRoad(-100);

    for(var i = 0; i < 20; i++) {
      this.createTree(getRand(-500, 500), getRand(-250, -320));
    }

    this.createRoad(-500);
    this.createLake(-900);
    setupSceneLighting(this.scene);
  };

  return World;

});