"use strict";

//global game state object, initialized here
var state = {
  score: 0.0, // float
  unlocks: { //boolean values
      colors: {
        blue: true,
        green: false,
        yellow: false,
        red: false
      }
  }
};

//handlers
var dirChanged = false; //allow only one direction change per step
var queuedDir = '';
function step() {

  //move
  game.movePlayer();
  game.spawnFood();
  //draw
  if (game.running) {
    graphics.clearScreen();
    graphics.drawSnake(game.snake, game.direction);
    graphics.drawFood(game.food);
    graphics.drawScore(game.score);
  } else {
    clearInterval(game.stepInterval);
  }
}

function gameInput(event) {
  var newDir = '';
  var oldDir = game.direction;
  if (game.running && !dirChanged) {
    switch (event.keyCode) {
      case 37: //left arrow
      case 65: //'a'
        newDir = 'l';
        break;
      case 40: //down arrow
      case 83: //'s'
        newDir = 'd';
        break;
      case 39: //right arrow
      case 68: //'d'
        newDir = 'r';
        break;
      case 38: //up arrow
      case 87: //'w'
        newDir = 'u';
        break;
    }
    //if snake can turn
    if ((oldDir == 'l' || oldDir == 'r') && (newDir == 'u' || newDir == 'd') ||
        (oldDir == 'u' || oldDir == 'd') && (newDir == 'l' || newDir == 'r')) {
          game.direction = newDir;
          dirChanged = true;
    }
  }
}

//global game logic object
var game = {
  initialize() {

    graphics.initialize();
    sound.initialize();

    $(document).keydown(gameInput);
  },

  start() {
    if (!this.running) {
      this.score = 0.0;
      this.direction = 'l';
      this.food = {
        x: -1,
        y: -1
      };
      this.running = true;

      graphics.setGraphicsOptions(settings.color);

      this.createSnake();

      //create intervals
      this.stepInterval = setInterval(step, 100); //10 fps
    }
  },

  over() {
    this.running = false;
    menu.gameOver(this.score);
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
    if (this.food.x < 0) {
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
    var valid = true;
    this.snake.forEach( function (e) {
      if (e.x == food.x && e.y == food.y){
        valid = false
      }
    });
    return valid;
  },

  movePlayer() {
    var old = this.snake[0];
    var coordinates = {
      x: old.x,
      y: old.y
    };
    switch (this.direction) {
      case 'd':
        coordinates.y += graphics.getSegmentSize();
        break;
      case 'r':
        coordinates.x += graphics.getSegmentSize();
        break;
      case 'u':
        coordinates.y -= graphics.getSegmentSize();
        break;
      case 'l':
      default:
        coordinates.x -= graphics.getSegmentSize();
    }
    this.newSegment(coordinates);
    if (this.running) {
      this.checkFood(coordinates);
    }
    dirChanged = false; //allow another direction change
  },

  newSegment(coordinates) {
    if (coordinates.x < 0 || coordinates.x >= graphics.getCanvasWidth() ||
        coordinates.y < 0 || coordinates.y >= graphics.getCanvasHeight()) {
          return this.over();
    }

    //it's impossible to hit the first three segments
    for (var i = 3; i < this.snake.length; i++) {
      if (this.snake[i].x == coordinates.x && this.snake[i].y == coordinates.y) {
        return this.over();
      }
    }

    //location is ok, add new head
    this.snake.unshift(coordinates);
  },

  checkFood(coordinates) {
    if (this.food.x == coordinates.x && this.food.y == coordinates.y) {
      this.score += 10;
      sound.food.play();
      //set food as eaten
      this.food.x = -1;
      this.food.y = -1;
    } else {
      this.snake.pop();
    }
  }
};
