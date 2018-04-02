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
      this.blur();
      game.start();
    });

    $("#player-color-select").change( function () {
      settings.color = $(this).val();
    });

    $("#sounds-mute-check").change( function () {
      sound.muteSounds(this.checked);
    });

    $('#game-over-modal').on('shown.bs.modal', function () {
      $("#game-over-modal-close").focus();
    });

    $('#game-over-modal').on('hidden.bs.modal', function () {
      $("#start-game-button").focus();
    });

    //update sound mute gameState
    sound.muteSounds($("#sounds-mute-check")[0].checked);
  },

  updatePlayerScore() {
    $("#player-score-number").html(state.score);
  },

  updatePlayerColors() {
    var select = $("#player-color-select");
    var colors = [
      "blue",
      "green",
      "yellow",
      "red"
    ];
    select.empty();
    $.each(colors, function (i, color) {
      if (state.unlocks.colors[color]) {
        select.append($("<option></option>").attr("value", color).text(capitalize(color)));
      }
    });
  },

  gameOver(score) {
    var save = false;
    $("#game-over-player-score").html(score);
    if (score > state.score) {
      save = true;
      sound.highScore.play();
      state.score = score;
      this.updatePlayerScore();
      $("#game-over-modal-highscore-badge").show();
    }
    else {
      sound.gameOver.play();
      $("#game-over-modal-highscore-badge").hide();
    }
    var unlocked = this.checkUnlocks(score);
    if (unlocked.length > 0) {
      save = true;
      var unlockedList = $('#game-over-modal-unlocked-list').empty();
      unlocked.forEach(function (e) {
        var item = $('<li/>').html(e);
        unlockedList.append(item);
      });
      this.updatePlayerColors();
      $('#game-over-modal-unlocked').show();
    }
    else {
      $('#game-over-modal-unlocked').hide();
    }
    if (save) {
      app.save();
    }
    $('#game-over-modal').modal('show');
    $("#start-game-button")[0].disabled = false;
  },

  checkUnlocks(score) {
    var unlocked = [];
    if (!state.unlocks.colors.green && score >= 100) {
      unlocked.push('Color: green');
      state.unlocks.colors.green = true;
    }
    if (!state.unlocks.colors.yellow && score >= 300) {
      unlocked.push('Color: yellow');
      state.unlocks.colors.yellow = true;
    }
    if (!state.unlocks.colors.red && score >= 500) {
      unlocked.push('Color: red');
      state.unlocks.colors.red = true;
    }
    return unlocked;
  }
};

// utility functions

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
