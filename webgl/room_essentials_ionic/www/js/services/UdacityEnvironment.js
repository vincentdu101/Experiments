app.service('UdacityEnvironment', function(){

  function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length > 0) {
      container.removeChild(canvas[0]);
    }
    container.appendChild(renderer.domElement);
  }

  function showGrids() {
    Coordinates.drawGrid({size:100,scale:1,orientation:"z"});
    Coordinates.drawAxes({axisLength:11,axisOrientation:"x",axisRadius:0.04});
    Coordinates.drawAxes({axisLength:11,axisOrientation:"y",axisRadius:0.04});
  }  

  return {
    addToDOM: addToDOM,
    showGrids: showGrids
  }

});