"use strict";

//constants
var canvasWidth = 500;
var canvasHeight = 500;
var segmentSize = 25; //snake segment width and height
var foodColor = "Tomato";
var eyeColor = "Black";
var textColor = "Black";

//global graphics object
var graphics = {

  initialize() {
    this.canvas = $("#game-area-canvas")[0];
    this.context = this.canvas.getContext('2d');

    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvas.style.backgroundColor = "LawnGreen";
  },

  setGraphicsOptions(playerColor, level) {
    switch (playerColor) {
      case "red":
        this.snakeColor = "FireBrick";
        break;
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
    switch (level) {
      case "mountain":
        this.levelColor = "DarkGray";
        break;
      case "underground":
        this.levelColor = "#885800";
        break;
      case "grassland":
      default:
        this.levelColor = "LawnGreen";
    }
    this.canvas.style.backgroundColor = this.levelColor
    var fontFamily = $("body").css("font-family");
    this.context.font = "20px " + fontFamily;
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

  drawEyes(snake, dir) {
    var x = snake[0].x;
    var y = snake[0].y;
    var block = segmentSize / 4;
    var oldColor = this.context.fillStyle;
    this.context.fillStyle = eyeColor;
    this.context.beginPath();
    switch (dir) {
      case 'l':
        this.context.rect(x + block, y + 2, block, block);
        this.context.rect(x + block, y + (3*block) - 2, block, block);
        break;
      case 'r':
        this.context.rect(x + (2*block), y + 2, block, block);
        this.context.rect(x + (2*block), y + 3*block -2, block, block);
        break;
      case 'u':
        this.context.rect(x + 2, y + block, block, block);
        this.context.rect(x + (3*block) - 2, y + block, block, block);
        break;
      case 'd':
        this.context.rect(x + 2, y + (2*block), block, block);
        this.context.rect(x + (3*block) - 2, y + (2*block), block, block);
    }
    this.context.closePath();
    this.context.fill();
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

  drawScore(score) {
    this.context.fillStyle = textColor;
    this.context.fillText("Score: " + score, 5, 20);
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
