(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button (click)=\"onNewGame()\">New game</button>\n\n<div *ngIf=\"game?.initialized === false\">\n  <button (click)=\"name = null; addPlayerDialogVisible = true\">Add player</button>\n  <div *ngIf=\"game.players.length === 0\">No players</div>\n  <div *ngFor=\"let player of game.players\">{{player.name}}</div>\n  <button [disabled]=\"game.players.length < 2\" (click)=\"game.initialize()\">Start game</button>\n</div>\n\n<div *ngIf=\"game?.initialized === true\">\n  <table>\n    <tr *ngFor=\"let disease of game.diseases\">\n      <th>{{disease.name}}</th>\n      <td>{{disease.cured?'Cured':'Not cured'}}</td>\n    </tr>\n    <tr>\n      <th>Current player</th>\n      <td>{{game.players[0].name}}</td>\n    </tr>\n  </table>\n  <div>\n    <button (click)=\"currentTab = 'players'\">Players</button>\n    <button (click)=\"currentTab = 'cities'\">Cities</button>\n  </div>\n  <div *ngIf=\"currentTab === 'players'\">\n    <table>\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Position</th>\n          <th>Cards</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let player of game.players\">\n          <td>{{player.name}}</td>\n          <td>{{player.position.name}}</td>\n          <td>\n            <div *ngFor=\"let card of player.cards\">{{card.city.name}}</div>\n          </td>\n      </tbody>\n    </table>\n  </div>\n  <div *ngIf=\"currentTab === 'cities'\">\n    <table>\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th *ngFor=\"let disease of game.diseases\">{{disease.name}}</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let city of game.cities\">\n          <td>{{city.name}}</td>\n          <td *ngFor=\"let disease of game.diseases\">{{city.infections.get(disease)}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n\n<div class=\"modal\" *ngIf=\"addPlayerDialogVisible\">\n  <table>\n    <tr>\n      <th>Name</th>\n      <td><input [(ngModel)]=\"name\" tabindex=\"0\"></td>\n    </tr>\n    <div>\n      <button (click)=\"onAddPlayer(name); addPlayerDialogVisible = false\">OK</button>\n      <button (click)=\"addPlayerDialogVisible = false\">Cancel</button>\n    </div>\n  </table>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/app/game.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/app/player.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.game = null;
    }
    AppComponent.prototype.onNewGame = function () {
        this.game = new _game__WEBPACK_IMPORTED_MODULE_1__["Game"]();
    };
    AppComponent.prototype.onAddPlayer = function (name) {
        this.game.players.push(new _player__WEBPACK_IMPORTED_MODULE_3__["Player"](name));
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/card.ts":
/*!*************************!*\
  !*** ./src/app/card.ts ***!
  \*************************/
/*! exports provided: Card, Type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Type", function() { return Type; });
var Card = /** @class */ (function () {
    function Card(type, city) {
        this.type = type;
        this.city = city;
    }
    return Card;
}());

var Type;
(function (Type) {
    Type[Type["INFECTION"] = 0] = "INFECTION";
    Type[Type["PLAYER"] = 1] = "PLAYER";
})(Type || (Type = {}));


/***/ }),

/***/ "./src/app/city.ts":
/*!*************************!*\
  !*** ./src/app/city.ts ***!
  \*************************/
/*! exports provided: City */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "City", function() { return City; });
/* harmony import */ var _multiset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multiset */ "./src/app/multiset.ts");

var City = /** @class */ (function () {
    function City(name, disease) {
        this.name = name;
        this.disease = disease;
        this.connections = [];
        this.infections = new _multiset__WEBPACK_IMPORTED_MODULE_0__["Multiset"]();
    }
    return City;
}());



/***/ }),

/***/ "./src/app/disease.ts":
/*!****************************!*\
  !*** ./src/app/disease.ts ***!
  \****************************/
/*! exports provided: Disease */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Disease", function() { return Disease; });
var Disease = /** @class */ (function () {
    function Disease(name) {
        this.name = name;
        this.cured = false;
    }
    return Disease;
}());



/***/ }),

/***/ "./src/app/game.ts":
/*!*************************!*\
  !*** ./src/app/game.ts ***!
  \*************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _city__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./city */ "./src/app/city.ts");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./src/app/card.ts");
/* harmony import */ var _disease__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./disease */ "./src/app/disease.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/app/util.ts");




var Game = /** @class */ (function () {
    function Game() {
        this.players = [];
        this.diseases = [
            new _disease__WEBPACK_IMPORTED_MODULE_2__["Disease"]('BLACK'),
            new _disease__WEBPACK_IMPORTED_MODULE_2__["Disease"]('BLUE'),
            new _disease__WEBPACK_IMPORTED_MODULE_2__["Disease"]('RED'),
            new _disease__WEBPACK_IMPORTED_MODULE_2__["Disease"]('YELLOW'),
        ];
        this.cities = [];
        this.infectionDrawPile = [];
        this.infectionDiscardPile = [];
        this.playerDrawPile = [];
        this.playerDiscardPile = [];
        this.config = {
            playerInitialCardSize: {
                2: 4,
                3: 3,
                4: 2,
            },
            playerMaxActions: 4,
            playerInitialPosition: 'BLUE 0',
        };
        this.initialized = false;
        for (var _i = 0, _a = this.diseases; _i < _a.length; _i++) {
            var disease = _a[_i];
            for (var i = 0; i < 12; i++) {
                var city = new _city__WEBPACK_IMPORTED_MODULE_0__["City"](disease.name + " " + i, disease);
                this.cities.push(city);
                this.infectionDrawPile.push(new _card__WEBPACK_IMPORTED_MODULE_1__["Card"](_card__WEBPACK_IMPORTED_MODULE_1__["Type"].INFECTION, city));
                this.playerDrawPile.push(new _card__WEBPACK_IMPORTED_MODULE_1__["Card"](_card__WEBPACK_IMPORTED_MODULE_1__["Type"].PLAYER, city));
            }
        }
    }
    Game.prototype.initialize = function () {
        var _this = this;
        Object(_util__WEBPACK_IMPORTED_MODULE_3__["shuffle"])(this.players);
        Object(_util__WEBPACK_IMPORTED_MODULE_3__["shuffle"])(this.infectionDrawPile);
        Object(_util__WEBPACK_IMPORTED_MODULE_3__["shuffle"])(this.playerDrawPile);
        var initialCardSize = this.config.playerInitialCardSize[this.players.length];
        var initialPosition = this.cities.find(function (city) { return city.name === _this.config.playerInitialPosition; });
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var i = 0; i < initialCardSize; i++) {
                var card = this.playerDrawPile.pop();
                player.cards.push(card);
                this.playerDiscardPile.push(card);
            }
            player.position = initialPosition;
        }
        for (var count = 1; count <= 3; count++) {
            for (var i = 0; i < 3; i++) {
                var card = this.infectionDrawPile.pop();
                card.city.infections.set(card.city.disease, count);
                this.infectionDiscardPile.push(card);
            }
        }
        this.initialized = true;
        console.log(this);
    };
    return Game;
}());



/***/ }),

/***/ "./src/app/multiset.ts":
/*!*****************************!*\
  !*** ./src/app/multiset.ts ***!
  \*****************************/
/*! exports provided: Multiset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Multiset", function() { return Multiset; });
var Multiset = /** @class */ (function () {
    function Multiset() {
        this.map = new Map();
    }
    Multiset.prototype.get = function (value) {
        return this.map.get(value) || 0;
    };
    Multiset.prototype.set = function (value, count) {
        if (count === void 0) { count = 1; }
        this.map.set(value, this.get(value) + count);
        return this;
    };
    return Multiset;
}());



/***/ }),

/***/ "./src/app/player.ts":
/*!***************************!*\
  !*** ./src/app/player.ts ***!
  \***************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.remainingActions = 0;
        this.cards = [];
        this.position = null;
    }
    return Player;
}());



/***/ }),

/***/ "./src/app/util.ts":
/*!*************************!*\
  !*** ./src/app/util.ts ***!
  \*************************/
/*! exports provided: shuffle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
function shuffle(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        swap(arr, i, randInt(i, arr.length));
    }
    return arr;
}
function swap(arr, i, j) {
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/seoj/workspace/pandemic/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map