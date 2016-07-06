/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Random = function () {
	    function Random() {
	        _classCallCheck(this, Random);
	    }

	    _createClass(Random, null, [{
	        key: 'randInt',
	        value: function randInt(n) {
	            return parseInt(Math.random() * n);
	        }
	    }]);

	    return Random;
	}();

	var View = function () {
	    function View(canvasElement, model, options) {
	        _classCallCheck(this, View);

	        this.canvasElement = canvasElement;
	        this.ctx = canvasElement.getContext('2d');
	        this.model = model;
	        this.options = options;

	        window.onresize = this.update;
	    }

	    _createClass(View, [{
	        key: 'update',
	        value: function update() {
	            this.canvasElement.width = this.canvasElement.clientWidth;
	            this.canvasElement.height = this.canvasElement.clientHeight;
	            var xRes = this.canvasElement.width / this.model.width;
	            var yRes = this.canvasElement.height / this.model.height;
	            for (var x = 0; x < this.model.width; x++) {
	                for (var y = 0; y < this.model.height; y++) {
	                    if (this.model.isAlive(x, y)) {
	                        this.ctx.fillStyle = 'rgb(255, 255, 255)';
	                    } else {
	                        this.ctx.fillStyle = 'rgb(0, 0, 0)';
	                    }
	                    this.ctx.fillRect(x * xRes, y * yRes, xRes, yRes);
	                }
	            }
	        }
	    }]);

	    return View;
	}();

	var Model = function () {
	    function Model(width, height, options) {
	        _classCallCheck(this, Model);

	        this.width = width;
	        this.height = height;
	        this.options = options;
	        this.grid = [];
	        for (var x = 0; x < width; x++) {
	            var row = [];
	            this.grid.push(row);
	            for (var y = 0; y < height; y++) {
	                row.push(false);
	            }
	        }
	    }

	    _createClass(Model, [{
	        key: 'seed',
	        value: function seed(count) {
	            for (var i = 0; i < count; i++) {
	                var x = Random.randInt(this.width);
	                var y = Random.randInt(this.height);
	                this.grid[x][y] = true;
	            }
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var grid = [];
	            for (var x = 0; x < this.width; x++) {
	                var row = [];
	                grid.push(row);
	                for (var y = 0; y < this.height; y++) {
	                    var liveNeighborCount = this.countLiveNeighbors(x, y);
	                    var alive = false;
	                    if (this.isAlive(x, y)) {
	                        if (liveNeighborCount >= 2 && liveNeighborCount <= 3) {
	                            alive = true;
	                        }
	                    } else if (liveNeighborCount === 3) {
	                        alive = true;
	                    }
	                    row.push(alive);
	                }
	            }
	            this.grid = grid;
	        }
	    }, {
	        key: 'isAlive',
	        value: function isAlive(x, y) {
	            return this.inBound(x, y) && this.grid[x][y];
	        }
	    }, {
	        key: 'inBound',
	        value: function inBound(x, y) {
	            return x > 0 && y > 0 && x < this.width && y < this.height;
	        }
	    }, {
	        key: 'countLiveNeighbors',
	        value: function countLiveNeighbors(x, y) {
	            var count = 0;
	            count += this.isAlive(x - 1, y - 1) ? 1 : 0;
	            count += this.isAlive(x - 1, y) ? 1 : 0;
	            count += this.isAlive(x - 1, y + 1) ? 1 : 0;
	            count += this.isAlive(x, y - 1) ? 1 : 0;
	            count += this.isAlive(x, y + 1) ? 1 : 0;
	            count += this.isAlive(x + 1, y - 1) ? 1 : 0;
	            count += this.isAlive(x + 1, y) ? 1 : 0;
	            count += this.isAlive(x + 1, y + 1) ? 1 : 0;
	            return count;
	        }
	    }]);

	    return Model;
	}();

	var Controller = function () {
	    function Controller(view, model) {
	        _classCallCheck(this, Controller);

	        this.view = view;
	        this.model = model;
	    }

	    _createClass(Controller, [{
	        key: 'start',
	        value: function start() {
	            var _this = this;

	            this.view.update();
	            window.setInterval(function () {
	                _this.model.next();
	                _this.view.update();
	            }, 1000 / 30);
	        }
	    }]);

	    return Controller;
	}();

	var params = {};
	var search = window.location.search;
	search = search.substring(1, search.length);
	search.split('&').forEach(function (kv) {
	    var pair = kv.split('=');
	    var key = pair[0];
	    var value = pair.length === 2 ? pair[1] : true;
	    params[key] = value;
	});

	var width = parseInt(params.width);
	var height = parseInt(params.height);
	var seed = parseInt(params.seed);

	var model = new Model(width, height, {});
	model.seed(seed);
	var view = new View(document.getElementById('canvas'), model, {});
	var controller = new Controller(view, model);

	controller.start();

/***/ }
/******/ ]);