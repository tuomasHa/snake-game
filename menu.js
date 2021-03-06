"use strict";

//global settings object, initialized here
var settings = {
  color: "blue",
  level: "grassland"
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

    $("#level-select").change( function () {
      settings.level = $(this).val();
    });

    $("#sounds-mute-check").change( function () {
      sound.muteSounds(this.checked);
    });

    $('#help-modal').on('shown.bs.modal', function () {
      $("#help-modal-colors-unlocked").html(menu.countColors());
      $("#help-modal-colors-total").html(menu.countColors('all'));
      $("#help-modal-levels-unlocked").html(menu.countLevels());
      $("#help-modal-levels-total").html(menu.countLevels('all'));
      $("#game-over-modal-close").focus();
    });

    $('#game-over-modal').on('shown.bs.modal', function () {
      $("#game-over-modal-close").focus();
    });

    $('#game-over-modal').on('hidden.bs.modal', function () {
      $("#start-game-button").focus();
    });

    //initially hide alert
    this.alert(false);

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

  updateLevels() {
    var select = $("#level-select");
    var levels = [
      "grassland",
      "underground",
      "mountain"
    ];
    select.empty();
    $.each(levels, function (i, level) {
      if (state.unlocks.levels[level]) {
        select.append($("<option></option>").attr("value", level).text(capitalize(level)));
      }
    });
  },

  gameOver(score) {
    var save = false;
    $("#game-over-player-score").html(score);
    app.postScore(score);

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
      this.updateLevels();
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
    if (!state.unlocks.levels.underground && score >= 200) {
      unlocked.push('Level: underground');
      state.unlocks.levels.underground = true;
    }
    if (!state.unlocks.colors.yellow && score >= 300) {
      unlocked.push('Color: yellow');
      state.unlocks.colors.yellow = true;
    }
    if (!state.unlocks.levels.mountain && score >= 400) {
      unlocked.push('Level: mountain');
      state.unlocks.levels.mountain = true;
    }
    if (!state.unlocks.colors.red && score >= 500) {
      unlocked.push('Color: red');
      state.unlocks.colors.red = true;
    }
    return unlocked;
  },

  countColors(all) {
    var total = 0;
    Object.keys(state.unlocks.colors).forEach( function (key) {
      if (state.unlocks.colors[key] || all) {
        total += 1;
      }
    });
    return total;
  },

  countLevels(all) {
    var total = 0;
    Object.keys(state.unlocks.levels).forEach( function (key) {
      if (state.unlocks.levels[key] || all) {
        total += 1;
      }
    });
    return total;
  },

  alert(error) {
    var alert = $("#error-alert");
    if (error) {
      if (typeof error == 'string') {
        console.error(error);
      }
      else {
        console.error('Error loading game data!');
      }
      alert.show();
    }
    else {
      alert.hide();
    }
  }
};

// utility functions

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
