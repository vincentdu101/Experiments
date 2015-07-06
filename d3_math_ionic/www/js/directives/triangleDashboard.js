app.directive('triangleDashboard', function(){

  return {
    restrict: "A",
    scope: {

    },
    templateUrl: "templates/triangleDashboard.html",
    controller: function($scope) {
    // integrate polygon and triangles from here
    // http://bl.ocks.org/mbostock/3057239

      // var w = 600,
      //     h = 300;

      // // scales
      // var x = d3.scale.linear().range([0, w]),
      //     y = d3.scale.linear().range([h, 0]);

      // var movement = [
      //   {x: 100, y: 50}, 
      //   {x: 200, y: 150}, 
      //   {x: 300, y: 50}
      // ];

      // var svg = d3.select('div.platform')
      //     .append('svg')
      //     .attr('height', 300)
      //     .attr('width', 600);      

      // svg.data(movement)
      //   .enter()
      //   .append('path')
      //     .style('stroke', 'black')
      //     .style('fill', 'none')
      //     .attr('transform', function(d){ 'translate(' + x(d.x) + ", " + y(d.y) + ")"})  
      //     .attr('d', d3.svg.symbol('triangle-up')); 



    var svg = d3.select('div.platform')
        .append('svg')
        .attr('height', 300)
        .attr('width', 600);      

    svg.append('path')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('d', 'M 100,50, L 200,150, L 300, 50 Z'); 

    }
  };

});