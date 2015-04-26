var showcase = (function(){

  'use strict';

  // parts
  var scene, collection, 
      x = 0, y = 0;
  
  // merge geometries to improve performance
  // http://learningthreejs.com/blog/2013/08/02/how-to-do-a-procedural-city-in-100lines/

  // black wood texture
  // var table = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('images/table.png') });
  // var wood = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
  
  var table = new THREE.MeshPhongMaterial({ color:  new THREE.Color("#626363") });
  var wood = new THREE.MeshPhongMaterial({ color:  new THREE.Color("#F2D585") });
  var tableGroup = new THREE.Group();
  // var material = new THREE.Color("rgb(255,0,0)");

  function cubeFactory(data, scene, type) {
    // left side panel
    var partGeometry = new THREE.BoxGeometry(data.width, data.length, data.depth);
    // var textureNoiseColor = THREE.ImageUtils.loadTexture( "images/table.png" );
    var mat = {};
    // textureNoiseColor.repeat.set( 1, 1 );
    // textureNoiseColor.wrapS = textureNoiseColor.wrapT = THREE.RepeatWrapping;
    // textureNoiseColor.format = THREE.RGBFormat;    
    if (type == "wood") {
      // var mat = THREE.ImageUtils.loadTexture('images/wood.jpg');
      // var textureNoiseColor = THREE.ImageUtils.loadTexture( "images/wood.jpg" );  
      var part = new THREE.Mesh(partGeometry, wood);
    } else {
      // var mat = THREE.ImageUtils.loadTexture('images/table.png');
      // var mat = new THREE.Color('#626363');
      var part = new THREE.Mesh(partGeometry, table);
    } 

    // unsuccessful experiment with shaders 
    // var material = new THREE.ShaderMaterial({
    //     uniforms: {
    //       color: {type: 'f', value: 0.0},
    //       material: {type: 't', value: mat}
    //     },
    //     vertexShader: document.getElementById('vertShader').text,
    //     fragmentShader: document.getElementById('fragShader').text
    // });

    // var part = new THREE.Mesh(partGeometry, material);
    
    // var shader = THREE.ParallaxShader;
    // var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    // var parameters = {
    //   fragmentShader: shader.fragmentShader,
    //   vertexShader: shader.vertexShader,
    //   uniforms: uniforms
    // };    

    // var material = new THREE.ShaderMaterial( parameters );
    // material.map = mat;
    // var materialLambert = new THREE.MeshPhongMaterial( { shininess: 50, ambient: 0x444444, color: 0xffffff, map: textureNoiseColor } );
    // var part = new THREE.Mesh(partGeometry, materialLambert);
    part.position.x = data.x_pos || 0;
    part.position.y = data.y_pos || 0;
    part.position.z = data.z_pos || 0;

    part.rotation.x = data.x_rot || 0;
    part.rotation.y = data.y_rot || 0;
    part.rotation.z = data.z_rot || 0;

    tableGroup.add(part);
    // part.overdraw = true;   
  }

  function outerBorders(scene, renderer, camera) {
    // table top
    cubeFactory({ 
      width: 20, length: 10, depth: 0.3, 
      z_pos: -49, y_pos: 5, x_pos: 0.2,
      x_rot: 30 
    }, scene);

    // left side panel
    cubeFactory({ 
      width: 10, length: 10, depth: 0.3, 
      z_pos: -50, x_pos: -9.9, y_pos: 0, 
      z_rot: 0, y_rot: -29.8, x_rot: 30 
    }, scene);

    // right side panel
    cubeFactory({ 
      width: 10, length: 10, depth: 0.3, 
      z_pos: -50, x_pos: 9.9, y_pos: 0, 
      z_rot: 0, y_rot: -29.8, x_rot: 30
    }, scene);     
  }

  function centerBackbone(scene, renderer, camera) {
    // table center
    cubeFactory({ 
      width: 10, length: 10, depth: 0.3, 
      z_pos: -49,y_pos: 2, x_pos: -4.5, 
      x_rot: 30 
    }, scene);


    // center top panel
    cubeFactory({ 
      width: 4, length: 8, depth: 0.3, 
      z_pos: -47, y_pos: 2.7, x_pos: 0.6,
      z_rot: 0, y_rot: -29.8, x_rot: 30 
    }, scene);    

    // center bottom panel
    cubeFactory({ 
      width: 5, length: 8, depth: 0.3, 
      z_pos: -47, y_pos: -0.8, x_pos: 0.5,
      z_rot: 0, y_rot: -29.8, x_rot: 30 
    }, scene);   
  }

  function frontMinor(scene, renderer, camera) {
    // center front short panel
    cubeFactory({ 
      width: 10, length: 1, depth: 0.3, 
      z_pos: -46, y_pos: 0.7, x_pos: -4.5,
      z_rot: 0, y_rot: 0, x_rot: 0 
    }, scene);  

    // center front drawer long panel
    cubeFactory({ 
      width: 10.2, length: 4.2, depth: 0.3, 
      z_pos: -45.5, y_pos: -2.4, x_pos: -4.8,
      z_rot: 0, y_rot: 0, x_rot: 0 
    }, scene); 
  }

  function drawerArea(scene, renderer, camera) {
    // drawer bottom
    cubeFactory({ 
      width: 9.5, length: 8.0, depth: 0.3, 
      z_pos: -50,y_pos: -3.7, x_pos: -4.8, 
      x_rot: 30 
    }, scene, 'wood'); 

    // drawer back
    cubeFactory({ 
      width: 10, length: 2, depth: 0.3, 
      z_pos: -54.5, y_pos: -2.2, x_pos: -4.7,
      z_rot: 0, y_rot: 0, x_rot: 0 
    }, scene, 'wood');   

    // left drawer side
    cubeFactory({ 
      width: 2, length: 9.1, depth: 0.3, 
      z_pos: -50.5, x_pos: -9.7, y_pos: -3, 
      z_rot: 0, y_rot: -29.8, x_rot: 30 
    }, scene, 'wood');

    // right drawer side
    cubeFactory({ 
      width: 2, length: 9.1, depth: 0.3, 
      z_pos: -50.5, x_pos: 0.1, y_pos: -3, 
      z_rot: 0, y_rot: -29.8, x_rot: 30 
    }, scene, 'wood');    
  }

  function bottomArea(scene, renderer, camera) {
    // table bottom
    cubeFactory({ 
      width: 19.3, length: 9.8, depth: 0.3, 
      z_pos: -50,y_pos: -4, x_pos: -0.2, 
      x_rot: 30 
    }, scene);    

    // table bottom short
    cubeFactory({ 
      width: 19.3, length: 0.7, depth: 0.3, 
      z_pos: -46, y_pos: -5, x_pos: -0.4,
      z_rot: 0, y_rot: 0, x_rot: 0 
    }, scene); 
  }

  function init(scene, renderer, camera) {
    outerBorders(scene, renderer, camera);
    centerBackbone(scene, renderer, camera);
    frontMinor(scene, renderer, camera);
    drawerArea(scene, renderer, camera);
    bottomArea(scene, renderer, camera);
    scene.add(tableGroup);
  }

  function update(direction) {
    if (direction.moveForward) {
      tableGroup.position.z += 1;
    } else if (direction.moveLeft) {
      tableGroup.position.x -= 1;
    } else if (direction.moveBackward) {
      tableGroup.position.z -= 1;
    } else if (direction.moveRight) {
      tableGroup.position.x += 1;
    } else if (direction.rotateUp) {
      tableGroup.rotateY(0.01);
    } else if (direction.rotateLeft) {
      tableGroup.rotateX(-0.01);
    } else if (direction.rotateDown) {
      tableGroup.rotateY(-0.01);
    } else if (direction.rotateRight) {
      tableGroup.rotateX(0.01);
    }
  }

  return {
    init: init,
    update: update
  }

})();