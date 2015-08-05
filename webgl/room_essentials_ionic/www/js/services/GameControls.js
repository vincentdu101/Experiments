app.service("GameControls", function(){

  'use strict';

  var player;

  function GameControls(inputPlayer) {
    player = inputPlayer;
    window.onkeydown = this.checkKey;
  }

  GameControls.prototype.checkKey = function(event) {

    if (!player) {
      return;
    }

    var left = 37, 
        up = 38,
        right = 39,
        down = 40,
        increment = 2;

    event = event || window.event;
    console.log(event);
    if (event.keyCode === up) {
      player.moveZ(-increment);
    } else if (event.keyCode === down) {
      player.moveZ(increment);
    } else if (event.keyCode === left) {
      player.moveX(-increment);
    } else if (event.keyCode === right) {
      player.moveX(increment);
    }

  }

  return GameControls

});