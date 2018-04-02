"use strict";

//global application object
var app = {
  initialize() {
    window.addEventListener("message", function(evt) {
      console.log("Received message", evt.data);
      var msg = evt.data;
      if (msg) {
        if (msg.messageType == "LOAD") {
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
          app.error = false;
          menu.alert(app.error);
        }
        else if (msg.messageType == "ERROR") {
          app.error = msg.info || true;
          menu.alert(app.error);
        }
      }
    });

    //initialize key objects
    menu.initialize();
    game.initialize();

    //send settings to parent
    var settingMessage =  {
      messageType: "SETTING",
      options: {
        width: graphics.getCanvasWidth() + 260,
        height: graphics.getCanvasHeight() + 20
        }
    };
    window.parent.postMessage(settingMessage, "*");

    //request load
    var loadRequestMessage =  {
      messageType: "LOAD_REQUEST"
    };
    window.parent.postMessage(loadRequestMessage, "*");
  },

  save() {
    if (!this.error) {
      var saveMessage = {
        messageType: "SAVE",
        gameState: state
      };
      window.parent.postMessage(saveMessage, "*");
    }
  },

  postScore(score) {
    var scoreMessage = {
      messageType: "SCORE",
      score: score
    };
    window.parent.postMessage(scoreMessage, "*");
  }
}

$(document).ready( function() {

  app.initialize();

});
