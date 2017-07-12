webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".apy {\n  width: 3em;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<section>\n  <label>\n    <span>Initial investment</span>\n    <input type=\"number\" [(ngModel)]=\"initialInvestment\" (change)=\"update()\" />\n  </label>\n</section>\n<section>\n  <table>\n    <thead>\n      <tr>\n        <th></th>\n        <th></th>\n        <th></th>\n        <th></th>\n        <th colspan=\"6\">Terms</th>\n      </tr>\n      <tr>\n        <th>Maturity (Years)</th>\n        <th>APY (%)</th>\n        <th>Compound Freq.</th>\n        <th>Effective APY</th>\n        <th>0</th>\n        <th>1</th>\n        <th>2</th>\n        <th>3</th>\n        <th>4</th>\n        <th>5</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let cd of cds\">\n        <td>\n          {{cd.term}}\n        </td>\n        <td>\n          <input class=\"apy\" type=\"number\" step=\"0.01\" min=\"0\" [(ngModel)]=\"cd.apy\" (change)=\"update()\" />%\n        </td>\n        <td>\n          <select [(ngModel)]=\"cd.compoundFrequency\" (change)=\"update()\">\n            <option *ngFor=\"let compoundFrequency of compoundFrequencies\" [ngValue]=\"compoundFrequency\">\n              {{compoundFrequency.name}}\n            </option>\n          </select>\n        </td>\n        <td>\n          {{cd.getEffectiveApy()*100 | number : '1.2-2'}}%\n        </td>\n        <td>\n          {{getAmountAtYear(cd, 0) | currency : 'USD' : true : '1.0-0'}}\n        </td>\n        <td>\n          {{getAmountAtYear(cd, 1) | currency : 'USD' : true : '1.0-0'}}\n        </td>\n        <td>\n          {{getAmountAtYear(cd, 2) | currency : 'USD' : true : '1.0-0'}}\n        </td>\n        <td>\n          {{getAmountAtYear(cd, 3) | currency : 'USD' : true : '1.0-0'}}\n        </td>\n        <td>\n          {{getAmountAtYear(cd, 4) | currency : 'USD' : true : '1.0-0'}}\n        </td>\n        <td>\n          {{getAmountAtYear(cd, 5) | currency : 'USD' : true : '1.0-0'}}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CompoundFrequency = (function () {
    function CompoundFrequency(frequencyPerYear, name) {
        this.frequencyPerYear = frequencyPerYear;
        this.name = name;
    }
    return CompoundFrequency;
}());
CompoundFrequency.DAILY = new CompoundFrequency(365, 'Daily (365)');
CompoundFrequency.MONTHLY = new CompoundFrequency(12, 'Monthly (12)');
CompoundFrequency.YEARLY = new CompoundFrequency(1, 'Yearly');
CompoundFrequency.VALUES = [CompoundFrequency.DAILY, CompoundFrequency.MONTHLY, CompoundFrequency.YEARLY];
var Cd = (function () {
    function Cd(term) {
        this.term = term;
        this.apy = 1;
        this.compoundFrequency = CompoundFrequency.DAILY;
    }
    Cd.prototype.getEffectiveApy = function () {
        return Math.pow(this.apy / 100 / this.compoundFrequency.frequencyPerYear + 1, this.compoundFrequency.frequencyPerYear) - 1;
    };
    return Cd;
}());
var AppComponent = (function () {
    function AppComponent() {
        this.cds = [new Cd(1), new Cd(2), new Cd(3), new Cd(4), new Cd(5)];
        this.compoundFrequencies = CompoundFrequency.VALUES;
        this.initialInvestment = 100000;
        this.calculationResults = [];
        this.update();
    }
    AppComponent.prototype.update = function () {
        this.calculationResults = [];
        for (var termIndex = 0; termIndex < this.cds.length; termIndex++) {
            var termResults = [this.initialInvestment / this.cds.length];
            var cd = this.cds[termIndex];
            for (var year = 1; year <= cd.term; year++) {
                var prev = termResults[year - 1];
                if (year === cd.term && this.calculationResults.length > 0) {
                    prev += this.calculationResults[termIndex - 1][year - 1];
                }
                termResults[year] = prev * (1 + cd.getEffectiveApy());
            }
            this.calculationResults.push(termResults);
        }
        ;
    };
    AppComponent.prototype.getAmountAtYear = function (cd, year) {
        return this.calculationResults[cd.term - 1][year];
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map