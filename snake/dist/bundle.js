(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var keyDirections = {
  'ArrowUp': _model.Direction.up,
  'ArrowDown': _model.Direction.down,
  'ArrowLeft': _model.Direction.left,
  'ArrowRight': _model.Direction.right
};

var Controller = /*#__PURE__*/function () {
  function Controller(model, view) {
    _classCallCheck(this, Controller);

    this.model = model;
    this.view = view;
    this.touch0 = null;
  }

  _createClass(Controller, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.model.reset();
      document.addEventListener('keydown', function (event) {
        var direction = keyDirections[event.key];

        if (!direction) {
          return;
        }

        _this.model.snakeDirection = direction;
        event.preventDefault();
      });
      canvas.addEventListener('touchstart', function (event) {
        event.preventDefault();
        _this.touch0 = event.touches[0];
      });
      canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        var touch = event.touches[0];

        if (_this.touch0) {
          var diffX = touch.clientX - _this.touch0.clientX;
          var diffY = touch.clientY - _this.touch0.clientY;

          if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              _this.model.snakeDirection = _model.Direction.left;
            } else {
              _this.model.snakeDirection = _model.Direction.right;
            }
          } else {
            if (diffY < 0) {
              _this.model.snakeDirection = _model.Direction.up;
            } else {
              _this.model.snakeDirection = _model.Direction.down;
            }
          }
        }
      }); // Rendering loop

      setInterval(function () {
        _this.view.update();
      }); // Logic loop

      setInterval(function () {
        _this.model.next();
      }, 1000 / 60);
    }
  }]);

  return Controller;
}();

exports.Controller = Controller;

},{"./model":3}],2:[function(require,module,exports){
"use strict";

var _controller = require("./controller");

var _model = require("./model");

var _view = require("./view");

var model = new _model.Model();
var view = new _view.View(model);
var controller = new _controller.Controller(model, view);
controller.start();

},{"./controller":1,"./model":3,"./view":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Direction = exports.Point = exports.Model = void 0;

var _directionOffset, _directionOpposites;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);

    this.gridWidth = 25;
    this.gridHeight = 25;
    this.snake = null;
    this.food = null;
    this.gameOver = false;
  }

  _createClass(Model, [{
    key: "isOutOfBounds",
    value: function isOutOfBounds(point) {
      if (point.x < 0) {
        return true;
      }

      if (point.y < 0) {
        return true;
      }

      if (point.x >= this.gridWidth) {
        return true;
      }

      if (point.y >= this.gridHeight) {
        return true;
      }

      return false;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.snake = new Snake(new Point(Math.floor(this.gridWidth / 2), Math.floor(this.gridHeight / 2)), 2);
      this.generateFood();
    }
  }, {
    key: "next",
    value: function next() {
      if (this.snake && !this.gameOver) {
        this.snake.next();

        if (this.snake.isSelfIntersecting || this.isOutOfBounds(this.snake.head)) {
          this.gameOver = true;
          return;
        }

        if (this.food && this.snake.includes(this.food)) {
          this.snake.eat();
          this.generateFood();
        }
      }
    }
  }, {
    key: "generateFood",
    value: function generateFood() {
      var _this = this;

      while (true) {
        var _this$snake;

        this.food = new Point(randInt(1, this.gridWidth - 1), randInt(1, this.gridHeight - 1));

        if (!((_this$snake = this.snake) !== null && _this$snake !== void 0 && _this$snake.positions.some(function (e) {
          return e.equals(_this.food);
        }))) {
          return;
        }
      }
    }
  }, {
    key: "foodPosition",
    get: function get() {
      return this.food;
    }
  }, {
    key: "snakePositions",
    get: function get() {
      if (!this.snake) {
        return [];
      }

      return this.snake.positions;
    }
  }, {
    key: "snakeDirection",
    set: function set(direction) {
      if (!this.snake) {
        return;
      }

      this.snake.direction = direction;
    }
  }]);

  return Model;
}();

exports.Model = Model;

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "add",
    value: function add(other) {
      return new Point(this.x + other.x, this.y + other.y);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this.x === other.x && this.y === other.y;
    }
  }]);

  return Point;
}();

exports.Point = Point;

var Snake = /*#__PURE__*/function () {
  function Snake(position, length) {
    _classCallCheck(this, Snake);

    this._positions = [];
    this._direction = null;
    this._uncomittedDirection = null;
    this._speed = 2;
    this._countdown = 0;
    this.length = 0;
    this._positions = [position];
    this.length = length;
    this.resetCountdown();
  }

  _createClass(Snake, [{
    key: "resetCountdown",
    value: function resetCountdown() {
      this._countdown = Math.floor(30 / this._speed);
    }
  }, {
    key: "next",
    value: function next() {
      if (this.head && this._uncomittedDirection) {
        if (this._countdown-- === 0) {
          var next = this.head.add(directionOffset[this._uncomittedDirection]);

          this._positions.unshift(next);

          this._positions = this._positions.slice(0, this.length);
          this.resetCountdown();
          this._direction = this._uncomittedDirection;
        }
      }
    }
  }, {
    key: "includes",
    value: function includes(point) {
      return this.positions.some(function (e) {
        return e.equals(point);
      });
    }
  }, {
    key: "eat",
    value: function eat() {
      this._speed++;
      this.length++;
    }
  }, {
    key: "head",
    get: function get() {
      if (this._positions.length === 0) {
        return null;
      }

      return this._positions[0];
    }
  }, {
    key: "positions",
    get: function get() {
      return this._positions;
    }
  }, {
    key: "direction",
    set: function set(direction) {
      if (this._direction && directionOpposites[this._direction] === direction) {
        return;
      }

      this._uncomittedDirection = direction;
    }
  }, {
    key: "isSelfIntersecting",
    get: function get() {
      for (var i = 1; i < this._positions.length; i++) {
        if (this._positions[0].equals(this._positions[i])) {
          return true;
        }
      }

      return false;
    }
  }]);

  return Snake;
}();

var Direction;
exports.Direction = Direction;

(function (Direction) {
  Direction[Direction["up"] = 1] = "up";
  Direction[Direction["down"] = 2] = "down";
  Direction[Direction["left"] = 3] = "left";
  Direction[Direction["right"] = 4] = "right";
})(Direction || (exports.Direction = Direction = {}));

function randInt(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

var directionOffset = (_directionOffset = {}, _defineProperty(_directionOffset, Direction.up, new Point(0, -1)), _defineProperty(_directionOffset, Direction.down, new Point(0, 1)), _defineProperty(_directionOffset, Direction.left, new Point(-1, 0)), _defineProperty(_directionOffset, Direction.right, new Point(1, 0)), _directionOffset);
var directionOpposites = (_directionOpposites = {}, _defineProperty(_directionOpposites, Direction.up, Direction.down), _defineProperty(_directionOpposites, Direction.down, Direction.up), _defineProperty(_directionOpposites, Direction.left, Direction.right), _defineProperty(_directionOpposites, Direction.right, Direction.left), _directionOpposites);

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');

var View = /*#__PURE__*/function () {
  function View(model) {
    _classCallCheck(this, View);

    this.model = model;
  }

  _createClass(View, [{
    key: "update",
    value: function update() {
      var cellWidth = canvas.width / this.model.gridWidth;
      var cellHeight = canvas.height / this.model.gridHeight;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (this.model.foodPosition) {
        var position = this.model.foodPosition;
        ctx.fillStyle = 'red';
        drawCell(ctx, position.x, position.y, cellWidth, cellHeight);
      }

      ctx.fillStyle = 'green';

      var _iterator = _createForOfIteratorHelper(this.model.snakePositions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var point = _step.value;
          drawCell(ctx, point.x, point.y, cellWidth, cellHeight);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (this.model.gameOver) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = "48px VT323";
        ctx.fillStyle = 'white';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
      }
    }
  }]);

  return View;
}();

exports.View = View;

function drawCell(ctx, x, y, w, h) {
  ctx.fillRect(Math.floor(x * w), Math.floor(y * h), Math.ceil(w), Math.ceil(h));
}

},{}]},{},[2]);
