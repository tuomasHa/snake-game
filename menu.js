"use strict";

//global settings object, initialized here
var settings = {
  color: "blue"
};

//global object providing menu functionality
var menu = {

  initialize() {
    $("#start-game-button").click( function() {
      this.disabled = true;
      game.start();
    });

    $("#player-color-select").change( function () {
      settings.color = $(this).val();
    })
  },

  updatePlayerScore() {
    $("#player-score-number").html(state.score);
  },

  updatePlayerColors() {
    var select = $("#player-color-select");
    var colors = [
      "blue",
      "green",
      "yellow"
    ];
    select.empty();
    $.each(colors, function (i, color) {
      if (state.unlocks.colors[color]) {
        select.append($("<option></option>").attr("value", color).text(capitalize(color)));
      }
    });
  },

  enableNewGame() {
    $("#start-game-button")[0].disabled = false;
  }
};

// utility functions

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
