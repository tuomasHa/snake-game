"use strict";

//constants
var canvasWidth = 400;
var canvasHeight = 400;
var segmentSize = 20; //snake segment width and height
var gameBackgroundColor = "LawnGreen";
var foodColor = "Tomato";

//global graphics object
var graphics = {

  initialize() {
    this.canvas = $("#game-area-canvas")[0];
    this.context = this.canvas.getContext('2d');

    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvas.style.backgroundColor = gameBackgroundColor;
  },

  setGraphicsOptions(playerColor) {
    switch (playerColor) {
      case "yellow":
        this.snakeColor = "Yellow";
        break;
      case "green":
          this.snakeColor = "SeaGreen";
        break;
      case "blue":
      default:
        this.snakeColor = "DarkTurquoise";
    }

  },

  drawSnake(snake) {
    this.context.fillStyle = this.snakeColor;
    snake.forEach( function (e) {
      graphics.drawSegment(e.x, e.y);
    })
  },

  drawSegment(x, y) {
    this.context.beginPath();
    this.context.rect(x, y, segmentSize, segmentSize);
    this.context.closePath();
    this.context.fill();
  },

  drawFood(food) {
    this.context.fillStyle = foodColor;
    if (food.x >= 0 && food.y >= 0) {
      this.context.beginPath();
      this.context.arc(food.x + segmentSize / 2, food.y + segmentSize / 2,
         segmentSize / 2, 0, Math.PI*2, true);
      this.context.closePath();
      this.context.fill();
    }
  },

  getCanvasWidth() {
    return canvasWidth;
  },

  getCanvasHeight() {
    return canvasHeight;
  },

  getSegmentSize() {
    return segmentSize;
  }
};
