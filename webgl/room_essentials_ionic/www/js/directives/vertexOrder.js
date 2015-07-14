var camera, scene, renderer;

app.directive('vertexOrder', [
  'UdacityEnvironment',
  function(UdacityEnvironment){

    return {
      restrict: "A",
      template: "<div id='container'></div>",
      scope: {},
      controller: function($scope) {
        var windowScale;

        function someObject(material) {
          var geometry = new THREE.Geometry();

          geometry.vertices.push( new THREE.Vector3(3, 3, 0) );
          geometry.vertices.push( new THREE.Vector3(7, 3, 0) );
          geometry.vertices.push( new THREE.Vector3(7, 7, 0) );
          geometry.vertices.push( new THREE.Vector3(3, 7, 0) );

          geometry.faces.push( new THREE.Face3(0, 1, 2) );
          geometry.faces.push( new THREE.Face3(0, 2, 3) );

          var mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
        }

        function init() {
          // setting up some parameters
          var canvasWidth = 846;
          var canvasHeight = 494;
          // For grading the window is fixed in size; here's general code:
          //var canvasWidth = window.innerWidth;
          //var canvasHeight = window.innerHeight;        
          var canvasRatio = canvasWidth / canvasHeight;

          // scene
          scene = new THREE.Scene();

          // camera: Y up, X right, Z up
          windowScale = 10;
          var windowWidth = windowScale * canvasRatio;
          var windowHeight = windowScale;

          camera = new THREE.OrthographicCamera( windowWidth / -2, 
            windowWidth / 2, windowHeight / 2, windowHeight / -2, 0, 40);

          var focus = new THREE.Vector3(5, 4, 0);
          camera.position.x = focus.x;
          camera.position.y = focus.y;
          camera.position.z = 10;
          camera.lookAt(focus);

          renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
          renderer.gammaInput = true;
          renderer.gammaOutput = true;
          renderer.setSize( canvasWidth, canvasHeight );
          renderer.setClearColor( 0xFFFFFF, 1.0 );        
        }

        function render() {
          renderer.render( scene, camera );
        }

        try {
          init();
          UdacityEnvironment.showGrids();
          var material = new THREE.MeshBasicMaterial({ color: 0xF6831E, side: THREE.FrontSide });
          someObject(material);
          UdacityEnvironment.addToDOM();
          render();
        } catch(e) {
          var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
          $('#container').append(errorReport+e);        
        }
      }
    };

  }
]);