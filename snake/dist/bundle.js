(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configurations = void 0;
var configurations = {
  fps: 60,
  grid: {
    size: 32
  },
  snake: {
    startLength: 2,
    startSpeed: 2
  }
};
exports.configurations = configurations;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

var _configurations = require("./configurations");

var _direction = require("./direction");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');

var Controller = /*#__PURE__*/function () {
  function Controller(model, view) {
    _classCallCheck(this, Controller);

    this.model = model;
    this.view = view;
  }

  _createClass(Controller, [{
    key: "start",
    value: function start() {
      var _this = this;

      document.addEventListener('keydown', function (event) {
        _this.onKeyDown(event);
      });
      canvas.addEventListener('touchstart', function (event) {
        _this.onTouchStart(event);
      });
      canvas.addEventListener('touchend', function (event) {
        _this.onTouchEnd(event);
      });
      setInterval(function () {
        _this.model.next();

        _this.view.update();
      }, 1000 / _configurations.configurations.fps);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var direction = keyDirectionMap[event.key];

      if (direction) {
        this.model.direction = direction;
        event.preventDefault();
      }
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      event.preventDefault();
      this.touch = event.touches[0];
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      event.preventDefault();
      var touch = event.changedTouches[0];

      if (this.touch) {
        var diffX = touch.clientX - this.touch.clientX;
        var diffY = touch.clientY - this.touch.clientY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            this.model.direction = _direction.Direction.left;
          } else {
            this.model.direction = _direction.Direction.right;
          }
        } else {
          if (diffY < 0) {
            this.model.direction = _direction.Direction.up;
          } else {
            this.model.direction = _direction.Direction.down;
          }
        }
      }

      this.touch = touch;
    }
  }]);

  return Controller;
}();

exports.Controller = Controller;
var keyDirectionMap = {
  'ArrowUp': _direction.Direction.up,
  'ArrowDown': _direction.Direction.down,
  'ArrowLeft': _direction.Direction.left,
  'ArrowRight': _direction.Direction.right
};

},{"./configurations":1,"./direction":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opposites = exports.offsets = exports.Direction = void 0;

var _point = require("./point");

var _offsets, _opposites;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Direction;
exports.Direction = Direction;

(function (Direction) {
  Direction[Direction["up"] = 1] = "up";
  Direction[Direction["down"] = 2] = "down";
  Direction[Direction["left"] = 3] = "left";
  Direction[Direction["right"] = 4] = "right";
})(Direction || (exports.Direction = Direction = {}));

var offsets = (_offsets = {}, _defineProperty(_offsets, Direction.up, new _point.Point(0, -1)), _defineProperty(_offsets, Direction.down, new _point.Point(0, 1)), _defineProperty(_offsets, Direction.left, new _point.Point(-1, 0)), _defineProperty(_offsets, Direction.right, new _point.Point(1, 0)), _offsets);
exports.offsets = offsets;
var opposites = (_opposites = {}, _defineProperty(_opposites, Direction.up, Direction.down), _defineProperty(_opposites, Direction.down, Direction.up), _defineProperty(_opposites, Direction.left, Direction.right), _defineProperty(_opposites, Direction.right, Direction.left), _opposites);
exports.opposites = opposites;

},{"./point":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameState = void 0;
var GameState;
exports.GameState = GameState;

(function (GameState) {
  GameState[GameState["new"] = 1] = "new";
  GameState[GameState["running"] = 2] = "running";
  GameState[GameState["over"] = 3] = "over";
})(GameState || (exports.GameState = GameState = {}));

},{}],5:[function(require,module,exports){
"use strict";

var _controller = require("./controller");

var _model = require("./model");

var _view = require("./view");

var model = new _model.Model();
var view = new _view.View(model);
var controller = new _controller.Controller(model, view);
controller.start();

},{"./controller":2,"./model":6,"./view":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var _configurations = require("./configurations");

var _game_state = require("./game_state");

var _point = require("./point");

var _snake = require("./snake");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);

    this.reset();
  }

  _createClass(Model, [{
    key: "reset",
    value: function reset() {
      this.gameState = _game_state.GameState["new"];
      this.snake = new _snake.Snake();
      this.food = this.createFood();
      this.score = 0;
      this.resetGameOverCountdown();
    }
  }, {
    key: "resetGameOverCountdown",
    value: function resetGameOverCountdown() {
      this.gameOverCountdown = _configurations.configurations.fps * 3;
    }
  }, {
    key: "next",
    value: function next() {
      switch (this.gameState) {
        case _game_state.GameState["new"]:
          break;

        case _game_state.GameState.running:
          this.snake.next();

          if (this.snake.collided()) {
            navigator.vibrate(100);
            this.gameState = _game_state.GameState.over;
            break;
          }

          if (this.snake.includes(this.food)) {
            this.snake.eat();
            this.score++;
            this.food = this.createFood();
          }

          break;

        case _game_state.GameState.over:
          if (this.gameOverCountdown-- === 0) {
            this.reset();
          }

          break;
      }
    }
  }, {
    key: "createFood",
    value: function createFood() {
      while (true) {
        var food = new _point.Point(randInt(1, _configurations.configurations.grid.size - 1), randInt(1, _configurations.configurations.grid.size - 1));

        if (!this.snake.includes(food)) {
          return food;
        }
      }
    }
  }, {
    key: "direction",
    set: function set(direction) {
      this.snake.bufferedDirection = direction;

      if (this.gameState !== _game_state.GameState.running) {
        this.gameState = _game_state.GameState.running;
      }
    }
  }]);

  return Model;
}();

exports.Model = Model;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

},{"./configurations":1,"./game_state":4,"./point":7,"./snake":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "equals",
    value: function equals(other) {
      return this.x === other.x && this.y === other.y;
    }
  }, {
    key: "add",
    value: function add(other) {
      return new Point(this.x + other.x, this.y + other.y);
    }
  }]);

  return Point;
}();

exports.Point = Point;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snake = void 0;

var _configurations = require("./configurations");

var _direction = require("./direction");

var _point = require("./point");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var center = new _point.Point(Math.floor(_configurations.configurations.grid.size / 2), Math.floor(_configurations.configurations.grid.size / 2));

var Snake = /*#__PURE__*/function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.length = _configurations.configurations.snake.startLength;
    this.moveCountdown = 0;
    this.positions = [center];
    this.speed = _configurations.configurations.snake.startSpeed;
    this.resetMoveCountdown();
  }

  _createClass(Snake, [{
    key: "next",
    value: function next() {
      if (this.moveCountdown === 0) {
        if (this.direction !== _direction.opposites[this.bufferedDirection]) {
          this.direction = this.bufferedDirection;
        }

        var next = this.head.add(_direction.offsets[this.direction]);
        this.positions = [next].concat(_toConsumableArray(this.positions)).slice(0, this.length);
        this.resetMoveCountdown();
      }

      this.moveCountdown--;
    }
  }, {
    key: "includes",
    value: function includes(point) {
      return this.positions.some(function (e) {
        return e.equals(point);
      });
    }
  }, {
    key: "collided",
    value: function collided() {
      if (this.head.x < 0 || this.head.x >= _configurations.configurations.grid.size || this.head.y < 0 || this.head.y >= _configurations.configurations.grid.size) {
        return true;
      }

      for (var i = 1; i < this.positions.length; i++) {
        if (this.positions[0].equals(this.positions[i])) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "eat",
    value: function eat() {
      this.length++;
      this.speed++;
      navigator.vibrate(100);
    }
  }, {
    key: "resetMoveCountdown",
    value: function resetMoveCountdown() {
      this.moveCountdown = Math.floor(_configurations.configurations.fps / this.speed);
    }
  }, {
    key: "head",
    get: function get() {
      return this.positions[0];
    }
  }]);

  return Snake;
}();

exports.Snake = Snake;

},{"./configurations":1,"./direction":3,"./point":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _configurations = require("./configurations");

var _game_state = require("./game_state");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var score = document.getElementById('score');
var ctx = canvas.getContext('2d');
var dimension = 320;
canvas.width = dimension;
canvas.height = dimension;
var cellSize = dimension / _configurations.configurations.grid.size;
var center = Math.floor(dimension / 2);

var View = /*#__PURE__*/function () {
  function View(model) {
    _classCallCheck(this, View);

    this.model = model;
  }

  _createClass(View, [{
    key: "update",
    value: function update() {
      clear();
      score.innerText = "Score: ".concat(this.model.score);

      for (var i = 0; i < this.model.snake.positions.length; i++) {
        if (i === 0) {
          ctx.fillStyle = '#ff0';
        } else {
          ctx.fillStyle = '#0f0';
        }

        draw(this.model.snake.positions[i]);
      }

      ctx.fillStyle = '#f00';
      draw(this.model.food);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      switch (this.model.gameState) {
        case _game_state.GameState["new"]:
          ctx.font = '64px VT323';
          ctx.fillText('Snake!', center, center);
          ctx.font = '24px VT323';

          if (navigator.maxTouchPoints) {
            ctx.fillText('Swipe to move', center, center + 64);
          } else {
            ctx.fillText('Use arrow key to move', center, center + 64);
          }

          break;

        case _game_state.GameState.over:
          ctx.font = '24px VT323';
          ctx.fillText('GAME OVER', center, center);
          break;
      }
    }
  }]);

  return View;
}();

exports.View = View;

function clear() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, dimension, dimension);
}

function draw(point) {
  var d = Math.ceil(cellSize);
  ctx.fillRect(Math.floor(point.x * cellSize), Math.floor(point.y * cellSize), d, d);
}

var headBitmap = [[0, 0, 1, 1, 0, 0, 1, 1, 0, 0], [0, 1, 1, 1, 0, 0, 1, 1, 1, 0], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

},{"./configurations":1,"./game_state":4}]},{},[5]);
