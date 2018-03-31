"use strict";

//global settings object, initialized here
var settings = {
  color: 1
};

//global object providing menu functionality
var menu = {

  updatePlayerScore() {
    $(".player-score-number").first().html(state.score);
  },

  updatePlayerColors() {
    var select = $(".player-color-select").first();
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
  }
};

// utility functions

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}