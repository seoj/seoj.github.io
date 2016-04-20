function Node(x, y, color)
{
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.edges = [];
    this.color = '#000000';
}

Node.prototype.update = function()
{
    this.x += this.vx;
    this.y += this.vy;
};

Node.prototype.dampen = function(coefficient)
{
    this.vx *= coefficient;
    this.vy *= coefficient;
};

Node.prototype.accelerate = function(fx, fy)
{
    this.vx += fx;
    this.vy += fy;

    var vx_sign = this.vx >= 0 ? 1 : -1;
    var vy_sign = this.vy >= 0 ? 1 : -1;
    this.vx = vx_sign * Math.min(Math.abs(this.vx), config.MAX_VELOCITY);
    this.vy = vy_sign * Math.min(Math.abs(this.vy), config.MAX_VELOCITY);
};

function Model()
{
    this.nodes = [];
}

Model.prototype.update = function()
{
    var nodes = this.nodes;

    for (var i = 0; i < nodes.length; i++)
    {
        var n1 = nodes[i];
        var fx = 0;
        var fy = 0;
        var edges = n1.edges;
        for (var j = 0; j < nodes.length; j++)
        {
            if (i != j)
            {
                var n2 = nodes[j];
                var dx = n1.x - n2.x;
                var dy = n1.y - n2.y;
                var d2 = Math.pow(dx, 2) + Math.pow(dy, 2);
                var d = Math.sqrt(d2);
                var f = config.REPULSION / d2;
                var r = f / d;
                fx += r * dx;
                fy += r * dy;
            }
        }
        for (var j = 0; j < edges.length; j++)
        {
            var n2 = edges[j];
            var dx = n1.x - n2.x;
            var dy = n1.y - n2.y;
            var d2 = Math.pow(dx, 2) + Math.pow(dy, 2);
            var d = Math.sqrt(d2);
            var f = -config.ATTRACTION * d;
            var r = f / d;
            fx += r * dx;
            fy += r * dy;
        }
        n1.accelerate(fx, fy);
    }

    nodes.forEach(function(node)
    {
        node.dampen(config.DAMPEN);
        node.update();
    });

    nodes.forEach(function(node)
    {
        var nConnections = node.edges.length;
        var r = nConnections / nodes.length;
        var h = 360 * r;
        node.color = '#' + toRGB(h, 1, 1).toString(16);
    });
};

Model.prototype.addNode = function(node)
{
    var nodes = this.nodes;

    if (nodes.length > 0)
    {
        var i = Math.floor(Math.random() * nodes.length);
        nodes[i].edges.push(node);
        node.edges.push(nodes[i]);
    }

    nodes.push(node);
};

function View(canvas, model)
{
    this.canvas = canvas;
    this.model = model;

    var self = this;

    this.canvas.onclick = function(mouseEvent)
    {
        var x = mouseEvent.offsetX;
        var y = mouseEvent.offsetY;
        var node = new Node(x, y);
        var model = self.model;
        model.addNode(node);
    };
}

var size = 10;
View.prototype.update = function()
{
    var canvas = this.canvas;
    var context = canvas.getContext('2d');
    var model = this.model;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'black';
    model.nodes.forEach(function(n1)
    {
        var r = size / 2;
        n1.edges.forEach(function(n2)
        {
            context.beginPath();
            context.moveTo(n1.x - r, n1.y - r);
            context.lineTo(n2.x - r, n2.y - r);
            context.stroke();
        });
    });

    model.nodes.forEach(function(node)
    {
        var r = size / 2;
        var center = {
            x : node.x - r,
            y : node.y - r
        };
        context.fillStyle = node.color;
        context.beginPath();
        context.arc(center.x, center.y, r, 0, 360);
        context.fill();
    });
};

function Controller(model, view)
{
    this.model = model;
    this.view = view;
}

Controller.prototype.initialize = function()
{
    var model = this.model;
    var view = this.view;
    view.update();
};

Controller.prototype.start = function()
{
    var model = this.model;
    var view = this.view;

    var delay = 1000 / config.FPS;
    var interval = window.setInterval(function()
    {
        model.update();
        view.update();
    }, delay);
};

var config = {
    REPULSION : 1,
    ATTRACTION : .001,
    DAMPEN : .99,
    FPS : 200,
    MAX_VELOCITY : 10
};

function rand(n)
{
    return Math.random() * n;
}

function toRGB(h, s, v)
{
    var c = v * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = v - c;

    var r = 0;
    var g = 0;
    var b = 0;

    if (h < 60)
    {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120)
    {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180)
    {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240)
    {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300)
    {
        r = x;
        g = 0;
        b = c;
    }
    else
    {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.floor((r + m) * 255);
    g = Math.floor((g + m) * 255);
    b = Math.floor((b + m) * 255);

    return r << 16 | g << 8 | b;
}

var model = new Model();
var view = new View(document.getElementById('canvas'), model);
var controller = new Controller(model, view);