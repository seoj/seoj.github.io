function Node(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.nodes = [];

    this.connect = function(other) {
        this.nodes.push(other);
        other.nodes.push(this);
    };

    this.accelerate = function(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    };

    this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
    };

    this.hasNode = function(other) {
        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node === other) {
                return true;
            }
        }
        return false;
    };

    this.dampen = function(dampening) {
        this.vx *= dampening;
        this.vy *= dampening;
    };

    this.limitVelocity = function(maximumVelocity) {
        var vx = this.vx;
        var vy = this.vy;

        this.vx = Math.sign(vx) * Math.min(Math.abs(vx), maximumVelocity);
        this.vy = Math.sign(vy) * Math.min(Math.abs(vy), maximumVelocity);
    };
}

function Model(config) {
    this.nodes = [];
    this.config = config || {};
    config = this.config;
    config.attraction = config.attraction || .01;
    config.repulsion = config.repulsion || 1;
    config.dampening = config.dampening || .9;
    config.maximumVelocity = config.maximumVelocity || 10;

    this.update = function() {
        var nodes = this.nodes;
        var config = this.config;
        var attraction = config.attraction;
        var repulsion = config.repulsion;
        var dampening = config.dampening;
        var maximumVelocity = config.maximumVelocity;

        for (var i = 0; i < nodes.length; i++) {
            for (var j = i + 1; j < nodes.length; j++) {
                var n1 = nodes[i];
                var n2 = nodes[j];
                var dx = n1.x - n2.x;
                var dy = n1.y - n2.y;
                var d2 = dx * dx + dy * dy;
                var d = Math.sqrt(d2);
                var f = (n1.nodes.length + n2.nodes.length + 1) * repulsion
                        / d2;
                if (n1.hasNode(n2)) {
                    f -= attraction * d;
                }
                var fdr = f / d;
                var fx = fdr * dx;
                var fy = fdr * dy;
                n1.accelerate(fx, fy);
                n2.accelerate(-fx, -fy);
            }
        }

        nodes.forEach(function(node) {
            node.dampen(dampening);
            node.limitVelocity(maximumVelocity);
            node.update();
        });
    }
};

function View(model, canvas, config) {
    this.model = model;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.config = config || {};
    config = this.config;
    config.radius = 5;
    this.eventHandler = {};

    var self = this;

    this.canvas.onclick = function(mouseEvent) {
        var eventHandler = self.eventHandler;
        if (eventHandler.onclick) {
            var x = mouseEvent.offsetX;
            var y = mouseEvent.offsetY;
            eventHandler.onclick(x, y);
        }
    };

    this.update = function() {
        var nodes = this.model.nodes;
        var context = this.context;
        var radius = this.config.radius;
        var canvas = context.canvas;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(function(n1) {
            n1.nodes.forEach(function(n2) {
                context.beginPath();
                context.moveTo(n1.x, n1.y);
                context.lineTo(n2.x, n2.y);
                context.stroke();
            });
        });

        nodes.forEach(function(node) {
            context.beginPath();
            context.arc(node.x, node.y, node.nodes.length + 1, 0, 360);
            context.fill();
        });
    };
}

function Controller(model, view, config) {
    this.model = model;
    this.view = view;
    this.config = config || {};
    config = this.config;
    config.fps = config.fps || 1000;

    var self = this;

    this.view.eventHandler.onclick = function(x, y) {
        var nodes = self.model.nodes;
        var _new = new Node(x, y);
        var r = Math.random();
        if (nodes.length >= 1 && r < 1) {
            var i = Math.floor(Math.random() * nodes.length);
            var node = nodes[i];
            node.connect(_new);
        }
        nodes.push(_new);
    };

    this.start = function() {
        var self = this;

        var delay = 1000 / this.config.fps;
        setTimeout(function() {
            self.model.update();
            self.view.update();
            self.start();
        }, delay);
    };
}

var model = new Model();
var canvas = document.getElementById('canvas');
var view = new View(model, canvas);
var controller = new Controller(model, view);

controller.start();