$(document).ready( function() {
  "use strict";

  window.addEventListener("message", function(evt) {
    console.log("Received message", evt.data);
    var msg = evt.data;
    if (msg) {
      if (msg.messageType === "LOAD") {
        if (msg.gameState) {

          //replace values if truthy (true), else keep old value

          state.score = msg.gameState.score || state.score;

          if (msg.gameState.unlocks) {
            var unlocks = msg.gameState.unlocks;

            if (unlocks.colors) {
              var colorKeys = Object.keys(state.unlocks.colors);
              colorKeys.forEach( function(key) {
                state.unlocks.colors[key] = unlocks.colors[key] || state.unlocks.colors[key];
              });
            }

          }

        }

        console.log(state);
        menu.updatePlayerScore();
        menu.updatePlayerColors();
      }
    }
  });

  //send settings to parent
  var settingMessage =  {
    messageType: "SETTING",
    options: {
      "width": canvasWidth + 260,
      "height": canvasHeight + 10
      }
  };
  window.parent.postMessage(settingMessage, "*");

  game.initialize();
  game.start();
});
