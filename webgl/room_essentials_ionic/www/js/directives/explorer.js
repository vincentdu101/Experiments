var camera, scene, renderer;

app.directive('explorer', [
  'PointerLock',
  'World',
  'Player',
  'GameControls',
  'Soldier',
  function(PointerLock, World, Player, GameControls, Soldier){

    return {
      restrict: "A",
      scope: {},
      template: "<div id='container'></div>",
      controller: function($scope) {
        
        "use strict";

        Physijs.scripts.worker = 'js/webgl/physijs_worker.js';
        Physijs.scripts.ammo = 'ammo.js';

        var scene = new Physijs.Scene(),
            camera,
            clock = new THREE.Clock(),
            width = window.innerWidth,
            height = window.innerHeight - 10,
            playerBox,
            renderer = new THREE.WebGLRenderer(),
            playerActive = true,
            lives = 3,
            controls, 
            world,
            player;

        renderer.setSize(width, height);
        renderer.setClearColor(0xE0EEEE);

        camera = new THREE.PerspectiveCamera(
          35,
          width / height,
          1,
          1000
        );

        scene.add(camera);
        scene.fog = new THREE.Fog(0xE0EEEE, 250, 600);
        scene.setGravity(new THREE.Vector3(0, -100, 0));

        function init() {
          document.getElementById("container").appendChild(renderer.domElement);
          resetScene();
          PointerLock.init(camera, scene);
          world = new World(scene);
          player = new Player(scene, camera);
          // player = new Soldier(scene, camera, render);
          controls = new GameControls(player);
          render();
        }

        function resetScene() {
          camera.position.set(0, 20, 200);
          camera.rotation.set(0, 0, 0);
        }

        function removeLife() {
          lives -= 1;
          document.getElementById("numberOfLives").innerHTML = lives;

          if (lives == 0) {
            alert('game over');
          }
        }

        function render() {
          scene.simulate();
          PointerLock.getControls().update();
          var delta = clock.getDelta();
          renderer.render(scene, camera);
          requestAnimationFrame(render);
      }

        init();
      }
    }

  }
])