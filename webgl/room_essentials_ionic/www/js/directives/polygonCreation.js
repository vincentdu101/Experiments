var camera, scene, renderer;

app.directive('polygonCreation', [
  'UdacityEnvironment',
  function(UdacityEnvironment) {

    return {
      restrict: "A",
      template: "<div id='container'></div>",
      scope: {},
      controller: function($scope) {
        var windowScale;

        function PolygonGeometry(sides, location, radius) {
          var geo = new THREE.Geometry();

          // generate vertices
          for (var pt = 0; pt < sides; pt++) {
            // add 90 degrees so we start at +Y axis, rotate counter
            // clockwise around 
            var angle = (Math.PI / 2) + (pt / sides) * 2 * Math.PI;

            var x = (radius * Math.cos(angle)) + location.x;
            var y = (radius * Math.sin(angle)) + location.y;

            // save the vertex location 
            geo.vertices.push( new THREE.Vector3(x, y, 0) );
          }

          // generate minimum number of faces for the polygon
          for (var pt = 0; pt < (sides - 2); pt++) {
            geo.faces.push( new THREE.Face3(0, pt + 1, pt + 2) );
          }
          return geo; 
        } 

        function init() {
          // setup parameters 
          var canvasWidth = 846;
          var canvasHeight = 494; 
          var canvasRatio = canvasWidth / canvasHeight;

          // scene
          scene = new THREE.Scene();

          // camera y up x right z up
          windowScale = 4;
          var windowWidth = windowScale * canvasRatio;
          var windowHeight = windowScale;

          camera = new THREE.OrthographicCamera(windowWidth / -2, windowWidth / 2, windowHeight / 2, windowHeight / -2, 0, 40);

          var focus = new THREE.Vector3(0, 1, 0);
          camera.position.x = focus.x;
          camera.position.y = focus.y;
          camera.position.z = 10;
          camera.lookAt(focus);

          renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true});
          renderer.gammaInput = true;
          renderer.gammaOutput = true;
          renderer.setSize( canvasWidth, canvasHeight );
          renderer.setClearColor( 0xFFFFFF, 1.0 );          
        }

        function render() {
          renderer.render(scene, camera);
        }

        // try {
          init();
          UdacityEnvironment.showGrids();
          var geo = PolygonGeometry(5, new THREE.Vector3(1, 2, 0));
          var material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide});
          var mesh = new THREE.Mesh(geo, material);
          scene.add(mesh);
          UdacityEnvironment.addToDOM();
          render();
        // } catch(e) {
        //   var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
        //   $('#container').append(errorReport+e);
        // }

      }
    };

  }
]);