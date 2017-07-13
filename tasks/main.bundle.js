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
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<section *ngIf=\"!dependencyModeTask\">\n  <section>\n    <button (click)=\"addTask()\">add</button>\n    <button (click)=\"sortTasks()\">sort</button>\n  </section>\n  <table>\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Status</th>\n        <th>Dependencies</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let task of tasks\">\n        <td>\n          <input [(ngModel)]=\"task.name\" (keyup)=\"onChange()\" />\n        </td>\n        <td>\n          <select [(ngModel)]=\"task.status\" (change)=\"onChange()\">\n            <option *ngFor=\"let status of statuses\" [ngValue]=\"status\">\n              {{status.name}}\n            </option>\n          </select>\n        </td>\n        <td>\n          <button *ngFor=\"let dependency of task.dependencies\" (click)=\"deleteDependency(task, dependency)\">\n            {{dependency.name}}\n          </button>\n          <button (click)=\"enableDependencyMode(task)\">add</button>\n        </td>\n        <td>\n          <button (click)=\"deleteTask(task)\">delete</button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n<section *ngIf=\"dependencyModeTask\">\n  <section>\n    <button (click)=\"disableDependencyMode()\">done</button>\n  </section>\n  <table>\n    <thead>\n      <tr>\n        <th></th>\n        <th>Name</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let task of tasks\">\n        <td>\n          <input type=\"checkbox\" [ngModel]=\"dependencyModeTask.hasDependency(task)\" (change)=\"toggleDependency(task)\" *ngIf=\"task.id !== dependencyModeTask.id\"\n          />\n        </td>\n        <td>\n          <input [(ngModel)]=\"task.name\" disabled />\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n<section>\n  <div [innerHTML]=\"svg\"></div>\n</section>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__("../../../../../src/app/task.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__taskstatus__ = __webpack_require__("../../../../../src/app/taskstatus.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_viz_js_viz_lite__ = __webpack_require__("../../../../viz.js/viz-lite.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_viz_js_viz_lite___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_viz_js_viz_lite__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
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





var AppComponent = (function () {
    function AppComponent(domSanitizer) {
        var _this = this;
        this.domSanitizer = domSanitizer;
        this.tasks = [];
        this.statuses = __WEBPACK_IMPORTED_MODULE_2__taskstatus__["a" /* TaskStatus */].STATUSES;
        var serialized = localStorage.getItem('tasks');
        if (serialized) {
            var json = JSON.parse(serialized);
            var serializedTasks = json['tasks'];
            this.tasks = serializedTasks.map(function (e) { return __WEBPACK_IMPORTED_MODULE_1__task__["a" /* Task */].deserialize(e); });
            serializedTasks.forEach(function (serializedTask) {
                _this.tasks.find(function (e) { return e.id === serializedTask['id']; }).dependencies =
                    serializedTask['dependencies']
                        .map(function (dependencyId) { return _this.tasks.find(function (task) { return task.id === dependencyId; }); });
            });
            var maxId_1 = 0;
            this.tasks.forEach(function (task) {
                if (task.id > maxId_1) {
                    maxId_1 = task.id;
                }
            });
            __WEBPACK_IMPORTED_MODULE_1__task__["a" /* Task */].nextId = maxId_1 + 1;
        }
        else {
            this.addTask();
        }
        this.updateSvg();
    }
    AppComponent.prototype.onChange = function () {
        var _this = this;
        window.setTimeout(function () {
            localStorage.setItem('tasks', JSON.stringify({
                tasks: _this.tasks.map(function (e) { return e.serialize(); })
            }));
            _this.updateSvg();
        });
    };
    AppComponent.prototype.updateSvg = function () {
        var buffer = ['digraph G{\n'];
        this.tasks.forEach(function (task) {
            var fillcolor = 'white';
            if (task.status === __WEBPACK_IMPORTED_MODULE_2__taskstatus__["a" /* TaskStatus */].IN_PROGRESS) {
                fillcolor = 'orange';
            }
            else if (task.status === __WEBPACK_IMPORTED_MODULE_2__taskstatus__["a" /* TaskStatus */].IN_REVIEW) {
                fillcolor = 'lightblue';
            }
            else if (task.status === __WEBPACK_IMPORTED_MODULE_2__taskstatus__["a" /* TaskStatus */].COMPLETED) {
                fillcolor = 'springgreen';
            }
            buffer.push("\t" + task.id + " [label=\"" + task.name + "\", style=filled, fillcolor=" + fillcolor + "]\n");
        });
        buffer.push('\n');
        this.tasks.forEach(function (task) {
            task.dependencies.forEach(function (dependency) {
                buffer.push("\t" + dependency.id + "->" + task.id + "\n");
            });
        });
        buffer.push('}');
        this.svg = this.domSanitizer.bypassSecurityTrustHtml(__WEBPACK_IMPORTED_MODULE_3_viz_js_viz_lite___default()(buffer.join('')));
    };
    AppComponent.prototype.enableDependencyMode = function (task) {
        this.dependencyModeTask = task;
    };
    AppComponent.prototype.disableDependencyMode = function () {
        this.dependencyModeTask = null;
    };
    AppComponent.prototype.addTask = function () {
        this.tasks.push(new __WEBPACK_IMPORTED_MODULE_1__task__["a" /* Task */]());
        this.onChange();
    };
    AppComponent.prototype.deleteTask = function (task, fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        var index = this.tasks.findIndex(function (e) { return e.id === task.id; });
        if (index >= 0) {
            this.tasks.splice(index, 1);
            this.tasks.forEach(function (e) {
                e.deleteDependency(task);
            });
            if (fireEvent) {
                this.onChange();
            }
        }
    };
    AppComponent.prototype.toggleDependency = function (dependency) {
        this.dependencyModeTask.toggleDependency(dependency);
        this.onChange();
    };
    AppComponent.prototype.deleteDependency = function (task, dependency) {
        task.deleteDependency(dependency);
        this.onChange();
    };
    AppComponent.prototype.sortTasks = function () {
        var dependentsById = {};
        this.tasks.forEach(function (dependent) {
            dependent.dependencies.forEach(function (dependency) {
                var dependents = dependentsById[dependency.id] || [];
                dependents.push(dependent);
                dependentsById[dependency.id] = dependents;
            });
        });
        var sorted = [];
        var queue = this.tasks.filter(function (task) { return task.dependencies.length === 0; });
        console.log(queue.map(function (task) { return task.name; }));
        var _loop_1 = function () {
            var task = queue.shift();
            if (!sorted.find(function (e) { return e.id === task.id; })) {
                sorted.push(task);
            }
            var dependents = dependentsById[task.id];
            if (dependents) {
                dependents.forEach(function (dependent) {
                    queue.push(dependent);
                });
            }
        };
        while (queue.length > 0) {
            _loop_1();
        }
        this.tasks = sorted;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _a || Object])
], AppComponent);

var _a;
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

/***/ "../../../../../src/app/task.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__taskstatus__ = __webpack_require__("../../../../../src/app/taskstatus.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Task; });

var Task = (function () {
    function Task() {
        this.id = Task.nextId++;
        this.name = "Task " + this.id;
        this.status = __WEBPACK_IMPORTED_MODULE_0__taskstatus__["a" /* TaskStatus */].NOT_STARTED;
        this.dependencies = [];
    }
    Task.deserialize = function (serialized) {
        var task = new Task();
        task.id = serialized['id'];
        task.name = serialized['name'];
        task.status = __WEBPACK_IMPORTED_MODULE_0__taskstatus__["a" /* TaskStatus */].getStatus(serialized['status']);
        return task;
    };
    Task.prototype.hasDependency = function (task) {
        return !!this.dependencies.find(function (e) { return e.id === task.id; });
    };
    Task.prototype.toggleDependency = function (task) {
        var index = this.dependencies.findIndex(function (e) { return e.id === task.id; });
        if (index < 0) {
            this.dependencies.push(task);
        }
        else {
            this.dependencies.splice(index, 1);
        }
    };
    Task.prototype.deleteDependency = function (task) {
        var index = this.dependencies.findIndex(function (e) { return e.id === task.id; });
        if (index >= 0) {
            this.dependencies.splice(index, 1);
        }
    };
    Task.prototype.serialize = function () {
        return {
            id: this.id,
            name: this.name,
            status: this.status.id,
            dependencies: this.dependencies.map(function (e) { return e.id; })
        };
    };
    return Task;
}());

Task.nextId = 0;
//# sourceMappingURL=task.js.map

/***/ }),

/***/ "../../../../../src/app/taskstatus.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskStatus; });
var TaskStatus = (function () {
    function TaskStatus(id, name) {
        this.id = id;
        this.name = name;
    }
    TaskStatus.getStatus = function (id) {
        return TaskStatus.STATUSES.find(function (e) { return e.id === id; });
    };
    return TaskStatus;
}());

TaskStatus.NOT_STARTED = new TaskStatus('NOT_STARTED', 'Not started');
TaskStatus.IN_PROGRESS = new TaskStatus('IN_PROGRESS', 'In progress');
TaskStatus.IN_REVIEW = new TaskStatus('IN_REVIEW', 'In review');
TaskStatus.COMPLETED = new TaskStatus('COMPLETED', 'Completed');
TaskStatus.STATUSES = [TaskStatus.NOT_STARTED, TaskStatus.IN_PROGRESS, TaskStatus.IN_REVIEW, TaskStatus.COMPLETED];
//# sourceMappingURL=taskstatus.js.map

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
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[3]);
//# sourceMappingURL=main.bundle.js.map