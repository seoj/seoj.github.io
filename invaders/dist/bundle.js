(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alien = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bullet = require("./bullet");

var _explosion = require("./explosion");

var _point = require("./point");

var _rectangle = require("./rectangle");

var _utils = require("./utils");

var Alien = /*#__PURE__*/function () {
  function Alien(game) {
    (0, _classCallCheck2["default"])(this, Alien);
    this.game = game;
    this.rectangle = new _rectangle.Rectangle(new _point.Point(0, 0), 16, 16);
    this.vx = 0;
    this.vy = 0;
    this.cooldown = 0;
    this.rectangle.position.x = (0, _utils.rand)(0, this.game.rectangle.width - this.rectangle.width);
    var r = (0, _utils.rand)(0, Math.PI * 2);
    this.vx = Math.cos(r);
    this.vy = Math.sin(r);
    this.resetCooldown();
  }

  (0, _createClass2["default"])(Alien, [{
    key: "resetCooldown",
    value: function resetCooldown() {
      this.cooldown = this.game.msToFrames(500);
    }
  }, {
    key: "update",
    value: function update() {
      var rectangle = this.rectangle;
      var position = rectangle.position;

      if (this.cooldown === 0 && (0, _utils.rand)(0, 1) < .01) {
        var bullet = new _bullet.Bullet(this, this.game);
        bullet.vy = 2;
        bullet.rectangle.position.x = this.rectangle.center.x - bullet.rectangle.width / 2;
        bullet.rectangle.position.y = this.rectangle.center.y - bullet.rectangle.height;
        this.game.entities.push(bullet);
        this.resetCooldown();
      }

      if (position.x < 0 || position.x + rectangle.width > this.game.rectangle.width) {
        this.vx = -this.vx;
      }

      if (position.y < 0 || position.y + rectangle.height > this.game.rectangle.height) {
        this.vy = -this.vy;
      }

      position.x += this.vx;
      position.y += this.vy;

      if (this.cooldown > 0) {
        this.cooldown--;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var position = this.rectangle.position;
      ctx.drawImage(this.image, position.x, position.y);
    }
  }, {
    key: "die",
    value: function die() {
      var explosion = new _explosion.Explosion(this.game);
      explosion.position = this.rectangle.position;
      this.game.entities.push(explosion);
      this.game.deleteList.push(this);
    }
  }]);
  return Alien;
}();

exports.Alien = Alien;

},{"./bullet":3,"./explosion":4,"./point":7,"./rectangle":8,"./utils":10,"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/createClass":12,"@babel/runtime/helpers/interopRequireDefault":13}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Assets = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var Assets = /*#__PURE__*/function () {
  function Assets() {
    (0, _classCallCheck2["default"])(this, Assets);
    this.aliens = [];
  }

  (0, _createClass2["default"])(Assets, [{
    key: "load",
    value: function load() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _load('assets/images/background.png');

              case 2:
                this.bg = _context.sent;
                _context.next = 5;
                return _load('assets/images/ship.png');

              case 5:
                this.ship = _context.sent;
                _context.t0 = this.aliens;
                _context.next = 9;
                return _load('assets/images/alien0.png');

              case 9:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

                _context.t2 = this.aliens;
                _context.next = 14;
                return _load('assets/images/alien1.png');

              case 14:
                _context.t3 = _context.sent;

                _context.t2.push.call(_context.t2, _context.t3);

                _context.t4 = this.aliens;
                _context.next = 19;
                return _load('assets/images/alien2.png');

              case 19:
                _context.t5 = _context.sent;

                _context.t4.push.call(_context.t4, _context.t5);

                _context.t6 = this.aliens;
                _context.next = 24;
                return _load('assets/images/alien3.png');

              case 24:
                _context.t7 = _context.sent;

                _context.t6.push.call(_context.t6, _context.t7);

                _context.next = 28;
                return _load('assets/images/explosion.png');

              case 28:
                this.explosion = _context.sent;

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);
  return Assets;
}();

exports.Assets = Assets;

function _load(src) {
  var image = new Image();
  image.src = src;
  return new Promise(function (resolve) {
    image.addEventListener('load', function () {
      resolve(image);
    });
  });
}

},{"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/createClass":12,"@babel/runtime/helpers/interopRequireDefault":13,"@babel/runtime/regenerator":14}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _alien = require("./alien");

var _point = require("./point");

var _rectangle = require("./rectangle");

var _ship = require("./ship");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Bullet = /*#__PURE__*/function () {
  function Bullet(source, game) {
    (0, _classCallCheck2["default"])(this, Bullet);
    this.source = source;
    this.game = game;
    this.rectangle = new _rectangle.Rectangle(new _point.Point(0, 0), 2, 2);
    this.vx = 0;
    this.vy = 0;
  }

  (0, _createClass2["default"])(Bullet, [{
    key: "update",
    value: function update() {
      var position = this.rectangle.position;

      if (position.x < 0 || position.x > this.game.rectangle.width || position.y < 0 || position.y > this.game.rectangle.height) {
        this.remove();
        return;
      }

      if (this.source instanceof _ship.Ship) {
        var _iterator = _createForOfIteratorHelper(this.game.entities),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entity = _step.value;

            if (entity instanceof _alien.Alien && this.rectangle.intersects(entity.rectangle)) {
              entity.die();
              this.remove();
              return;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (this.source instanceof _alien.Alien) {
        var _iterator2 = _createForOfIteratorHelper(this.game.entities),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _entity = _step2.value;

            if (_entity instanceof _ship.Ship && this.rectangle.intersects(_entity.rectangle)) {
              _entity.die();

              this.remove();
              return;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      position.x += this.vx;
      position.y += this.vy;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.game.deleteList.push(this);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.rectangle.position.x, this.rectangle.position.y, this.rectangle.width, this.rectangle.height);
    }
  }]);
  return Bullet;
}();

exports.Bullet = Bullet;

},{"./alien":1,"./point":7,"./rectangle":8,"./ship":9,"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/createClass":12,"@babel/runtime/helpers/interopRequireDefault":13}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explosion = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Explosion = /*#__PURE__*/function () {
  function Explosion(game) {
    (0, _classCallCheck2["default"])(this, Explosion);
    this.game = game;
    this.ttl = 30;
  }

  (0, _createClass2["default"])(Explosion, [{
    key: "update",
    value: function update() {
      if (this.ttl === 0) {
        this.game.deleteList.push(this);
      }

      this.ttl--;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.game.assets.explosion, this.position.x, this.position.y);
    }
  }]);
  return Explosion;
}();

exports.Explosion = Explosion;

},{"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/createClass":12,"@babel/runtime/helpers/interopRequireDefault":13}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _alien = require("./alien");

var _assets = require("./assets");

var _point = require("./point");

var _rectangle = require("./rectangle");

var _ship = require("./ship");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var Game = /*#__PURE__*/function () {
  function Game() {
    (0, _classCallCheck2["default"])(this, Game);
    this.entities = [];
    this.deleteList = [];
    this.assets = new _assets.Assets();
    this.fps = 60;
  }

  (0, _createClass2["default"])(Game, [{
    key: "reset",
    value: function reset() {
      this.entities = [];
      this.entities.push(new _ship.Ship(this));

      for (var r = 0; r < 10; r++) {
        var alien = new _alien.Alien(this);
        alien.image = this.assets.aliens[r % this.assets.aliens.length];
        this.entities.push(alien);
      }
    }
  }, {
    key: "start",
    value: function start() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this = this;

        var canvas;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                canvas = this.ctx.canvas;
                this.rectangle = new _rectangle.Rectangle(new _point.Point(0, 0), canvas.width, canvas.height);
                _context.next = 4;
                return this.assets.load();

              case 4:
                this.reset();
                document.addEventListener('keydown', function (event) {
                  _this.entities.filter(function (e) {
                    return e.keydown;
                  }).forEach(function (e) {
                    return e.keydown(event.key);
                  });

                  event.preventDefault();
                });
                document.addEventListener('keyup', function (event) {
                  _this.entities.filter(function (e) {
                    return e.keyup;
                  }).forEach(function (e) {
                    return e.keyup(event.key);
                  });

                  event.preventDefault();
                });
                canvas.addEventListener('touchstart', function (event) {
                  _this.entities.filter(function (e) {
                    return e.touchstart;
                  }).forEach(function (e) {
                    return e.touchstart(event.touches[0]);
                  });

                  event.preventDefault();
                });
                canvas.addEventListener('touchmove', function (event) {
                  _this.entities.filter(function (e) {
                    return e.touchmove;
                  }).forEach(function (e) {
                    return e.touchmove(event.touches[0]);
                  });

                  event.preventDefault();
                });
                canvas.addEventListener('touchend', function (event) {
                  _this.entities.filter(function (e) {
                    return e.touchend;
                  }).forEach(function (e) {
                    return e.touchend(event.changedTouches[0]);
                  });

                  event.preventDefault();
                });
                setInterval(function () {
                  _this.entities.filter(function (e) {
                    return e.update;
                  }).forEach(function (e) {
                    return e.update();
                  });

                  _this.deleteList.forEach(function (d) {
                    var i = _this.entities.findIndex(function (e) {
                      return e === d;
                    });

                    if (i >= 0) {
                      _this.entities.splice(i, 1);
                    }
                  });

                  _this.deleteList = [];
                }, 1000 / this.fps);
                this.draw();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "msToFrames",
    value: function msToFrames(ms) {
      return Math.floor(this.fps * ms / 1000);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      requestAnimationFrame(function () {
        _this2.draw();
      });
      this.ctx.imageSmoothingEnabled = false;
      var canvas = this.ctx.canvas;
      this.ctx.drawImage(this.assets.bg, 0, 0);
      this.entities.filter(function (e) {
        return e.draw;
      }).forEach(function (e) {
        return e.draw(_this2.ctx);
      });
    }
  }]);
  return Game;
}();

exports.Game = Game;

},{"./alien":1,"./assets":2,"./point":7,"./rectangle":8,"./ship":9,"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/createClass":12,"@babel/runtime/helpers/interopRequireDefault":13,"@babel/runtime/regenerator":14}],6:[function(require,module,exports){
"use strict";

var _game = require("./game");

var game = new _game.Game();
game.ctx = document.querySelector('canvas').getContext('2d');
game.start();

},{"./game":5}],7:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Point = function Point(x, y) {
  (0, _classCallCheck2["default"])(this, Point);
  this.x = x;
  this.y = y;
};

exports.Point = Point;

},{"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/interopRequireDefault":13}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rectangle = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _point = require("./point");

var Rectangle = /*#__PURE__*/function () {
  function Rectangle(position, width, height) {
    (0, _classCallCheck2["default"])(this, Rectangle);
    this.position = position;
    this.width = width;
    this.height = height;
  }

  (0, _createClass2["default"])(Rectangle, [{
    key: "intersects",
    value: function intersects(other) {
      return this.position.x < other.position.x + other.width && this.position.x + this.width > other.position.x && this.position.y < other.position.y + other.height && this.position.y + this.height > other.position.y;
    }
  }, {
    key: "center",
    get: function get() {
      return new _point.Point(this.position.x + this.width / 2, this.position.y + this.height / 2);
    }
  }]);
  return Rectangle;
}();

exports.Rectangle = Rectangle;

},{"./point":7,"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/createClass":12,"@babel/runtime/helpers/interopRequireDefault":13}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ship = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _alien = require("./alien");

var _bullet = require("./bullet");

var _point = require("./point");

var _rectangle = require("./rectangle");

var Ship = /*#__PURE__*/function () {
  function Ship(game) {
    (0, _classCallCheck2["default"])(this, Ship);
    this.game = game;
    this.keydownList = new Set();
    this.cooldown = 0;
    var width = 16;
    var height = 16;
    this.rectangle = new _rectangle.Rectangle(new _point.Point(this.game.rectangle.center.x - width / 2, this.game.rectangle.height - height), width, height);
  }

  (0, _createClass2["default"])(Ship, [{
    key: "resetCooldown",
    value: function resetCooldown() {
      this.cooldown = this.game.msToFrames(250);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.game.entities.filter(function (e) {
        return e instanceof _alien.Alien;
      }).length === 0) {
        alert('You win!');
        this.game.reset();
      }

      var position = this.rectangle.position;

      if (this.keydownList.has('w')) {
        position.y--;
      }

      if (this.keydownList.has('s')) {
        position.y++;
      }

      if (this.keydownList.has('a')) {
        position.x--;
      }

      if (this.keydownList.has('d')) {
        position.x++;
      }

      if (this.keydownList.has(',')) {
        this.fire();
      }

      if (this.touch) {
        this.fire();
        var touchX = this.touch.pageX - this.touch.target.offsetLeft;
        var touchY = this.touch.pageY - this.touch.target.offsetTop;
        var diffX = touchX - position.x;
        var diffY = touchY - position.y;
        var r = Math.atan(diffY / diffX);

        if (diffX < 0) {
          r += Math.PI;
        }

        position.x += Math.cos(r);
        position.y += Math.sin(r);
      }

      if (this.cooldown > 0) {
        this.cooldown--;
      }
    }
  }, {
    key: "fire",
    value: function fire() {
      if (this.cooldown === 0) {
        var bullet = new _bullet.Bullet(this, this.game);
        bullet.vy = -2;
        var position = bullet.rectangle.position;
        var center = this.rectangle.center;
        position.x = center.x - bullet.rectangle.width / 2;
        position.y = center.y;
        this.game.entities.push(bullet);
        this.resetCooldown();
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var position = this.rectangle.position;
      ctx.drawImage(this.game.assets.ship, position.x, position.y);
    }
  }, {
    key: "keydown",
    value: function keydown(key) {
      this.keydownList.add(key);
    }
  }, {
    key: "keyup",
    value: function keyup(key) {
      this.keydownList["delete"](key);
    }
  }, {
    key: "touchstart",
    value: function touchstart(touch) {
      this.touch = touch;
    }
  }, {
    key: "touchmove",
    value: function touchmove(touch) {
      this.touch = touch;
    }
  }, {
    key: "touchend",
    value: function touchend(touch) {
      this.touch = null;
    }
  }, {
    key: "die",
    value: function die() {
      alert('Game over!');
      this.game.reset();
    }
  }]);
  return Ship;
}();

exports.Ship = Ship;

},{"./alien":1,"./bullet":3,"./point":7,"./rectangle":8,"@babel/runtime/helpers/classCallCheck":11,"@babel/runtime/helpers/createClass":12,"@babel/runtime/helpers/interopRequireDefault":13}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rand = rand;
exports.randInt = randInt;
exports.pickRand = pickRand;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(rand(min, max));
}

function pickRand(arr) {
  return arr[randInt(0, arr.length)];
}

},{}],11:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],12:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],13:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],14:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":15}],15:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}]},{},[6]);
