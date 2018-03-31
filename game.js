"use strict";

//global game state object, initialized here
var state = {
  score: 0.0, // float
  unlocks: { //boolean values
      colors: {
        blue: true,
        green: false,
        yellow: false
      }
  }
};

//global game logic object
var game = {
  initialize() {

    graphics.initialize();

    this.score = 0.0;
  },

  start() {
    this.score = 0.0;
    graphics.setGraphicsOptions(settings.color);

    this.createSnake();
    this.spawnFood();

    //create intervals
    graphics.drawSnake(this.snake);
    graphics.drawFood(this.food);

  },

  over() {
    menu.enableNewGame();
  },

  createSnake() {
    var startX = graphics.getCanvasWidth() / 2;
    var startY = graphics.getCanvasHeight() / 2;
    this.snake = [];
    for (var i = 0; i < 3; i++) {
      this.snake.push({
        x: startX + i * graphics.getSegmentSize(),
        y: startY
      });
    }
  },

  spawnFood() {
    var food;
    var tries = 10; //try max 10 times per step
    while (tries > 0) {
      food = this.getRandomCoordinate();
      if (this.checkValidFood(food)) {
        this.food = food;
        tries = 0;
      } else {
        tries -= 1;
      }
    }

  },

  getRandomCoordinate() {
    var c = {};
    var xRange = graphics.getCanvasWidth() / graphics.getSegmentSize();
    var yRange = graphics.getCanvasHeight() / graphics.getSegmentSize();
    c.x = Math.floor(Math.random() * xRange) * graphics.getSegmentSize();
    c.y = Math.floor(Math.random() * yRange) * graphics.getSegmentSize();
    return c;
  },

  checkValidFood(food) {
    this.snake.forEach( function (e) {
      if (e.x == food.x && e.y == food.y){
        return false
      }
    });
    return true;
  }
};
