app.factory('PointerLock', function(){

  var controls;

  function init(camera, scene){

      controls = new THREE.PointerLockControls(camera);
      
      scene.add(controls.getObject());

      //pointerlock needs click to activate
      document.addEventListener('click', function (event) {

          var element = document.getElementsByTagName("canvas")[0];

          function pointerlockchange(event) {

              if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                  controls.enabled = true;
              } else {
                  controls.enabled = false;
              }
          }

          document.addEventListener('pointerlockchange', pointerlockchange, false);
          document.addEventListener('mozpointerlockchange', pointerlockchange, false);
          document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

          element.requestPointerLock = element.requestPointerLock ||
              element.mozRequestPointerLock ||
              element.webkitRequestPointerLock;

          element.requestPointerLock();

      }, false);
  }

  function getControls() {
    return controls;
  }

  return{
      init: init,
      getControls: getControls
  }

});