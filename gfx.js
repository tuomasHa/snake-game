"use strict";

//constants
var canvasWidth = 400;
var canvasHeight = 400;
var segmentSize = 20; //snake segment width and height
var gameBackgroundColor = "LawnGreen";
var foodColor = "Tomato";
var eyeColor = "Black";

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

  clearScreen() {
    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
  },

  drawSnake(snake, dir) {
    this.context.fillStyle = this.snakeColor;
    this.context.beginPath();
    snake.forEach( function (e) {
      graphics.context.rect(e.x, e.y, segmentSize, segmentSize);
    });
    //this.drawTail(snake, dir);
    this.context.closePath();
    this.context.fill();

    this.drawEyes(snake, dir);
  },

  /*drawTail(snake) {
    switch (dir) {
      case 'l':
      case 'r':

        break;
      case 'u':
      case 'd':

        break;
      default:

    }
    for (var i = snake.length - 2; i < snake.length; i++) {
      var x = snake[i].x;
      var y = snake[i].y;
      var w = segmentSize;
      var h = segmentSize - ((snake.length - i) * (segmentSize )
    }
  },*/

  drawEyes(snake, dir) {
    var x = snake[0].x;
    var y = snake[0].y;
    var oldColor = this.context.fillStyle;
    this.context.fillStyle = eyeColor;
    this.context.beginPath();
    switch (dir) {
      case 'l':
        this.context.rect(x, y, segmentSize/4, segmentSize/4);
        this.context.rect(x, y + 3*(segmentSize/4), segmentSize/4, segmentSize/4);
        break;
      case 'r':
        this.context.rect(x + 3*(segmentSize/4), y, segmentSize/4, segmentSize/4);
        this.context.rect(x + 3*(segmentSize/4), y + 3*(segmentSize/4), segmentSize/4, segmentSize/4);
        break;
      case 'u':
        this.context.rect(x, y, segmentSize/4, segmentSize/4);
        this.context.rect(x + 3*(segmentSize/4), y, segmentSize/4, segmentSize/4);
        break;
      case 'd':
        this.context.rect(x, y + 3*(segmentSize/4), segmentSize/4, segmentSize/4);
        this.context.rect(x + 3*(segmentSize/4), y + 3*(segmentSize/4), segmentSize/4, segmentSize/4);
    }
    this.context.closePath();
    this.context.fill();
    this.context.fillStyle = oldColor;
  },

  drawFood(food) {
    if (food.x >= 0 && food.y >= 0) {
      this.context.fillStyle = foodColor;
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
