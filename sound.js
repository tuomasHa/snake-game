"use strict";

//global sound object
var sound = {
  initialize() {
    this.container = $("#sound-container");
    this.food = this.createSound("sounds/food.mp3", 1.7);
    this.gameOver = this.createSound("sounds/game_over.mp3");
    this.highScore = this.createSound("sounds/high_score.mp3");
  },

  createSound(src, end) {
    var audio = $("<audio/>").attr("type", "audio/mpeg").attr("src", src)
      .attr("preload", "auto").attr("controls", "none");

    if (end > 0) {
      audio.bind('timeupdate', function () {
        if (this.currentTime >= end) {
          audio.stop();
        }
      });
    }

    audio.play = function () {
      console.log(audio)
      if (audio.prop('paused')) {
        audio.prop("currentTime", 0);
        audio.trigger('play');
      }
    };

    audio.stop = function () {
      audio.trigger('pause');
    };
    this.container.append(audio);
    return audio;
  }
}
