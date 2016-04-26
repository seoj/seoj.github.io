function Model()
{
    var self = this;

    self.maxIterations = 255;

    self.bounds = {
        minX : -2.5,
        maxX : 1,
        minY : -1,
        maxY : 1
    };

    self.dimension = {
        width : 100,
        height : 100
    };

    self.setBounds = function(minX, maxX, minY, maxY)
    {
        self.bounds.minX = minX;
        self.bounds.maxX = maxX;
        self.bounds.minY = minY;
        self.bounds.maxY = maxY;
    };

    self.setDimension = function(width, height)
    {
        self.dimension.width = width;
        self.dimension.height = height;
    };

    self.getResolution = function()
    {
        var bounds = self.bounds;
        var dimension = self.dimension;

        return {
            x : (bounds.maxX - bounds.minX) / dimension.width,
            y : (bounds.maxY - bounds.minY) / dimension.height
        };
    };

    self.update = function()
    {
        var bounds = self.bounds;
        var dimension = self.dimension;

        var res = self.getResolution();
        var resX = res.x;
        var resY = res.y;

        self.data = [];
        for (var wx = 0; wx < dimension.width; wx++)
        {
            var row = [];
            self.data.push(row);
            for (var wy = 0; wy < dimension.height; wy++)
            {
                var x0 = resX * wx + bounds.minX;
                var y0 = bounds.maxY - resY * wy;
                var x = x0;
                var y = y0;
                var iterations = 0;

                while (true)
                {
                    var x2 = x * x;
                    var y2 = y * y;

                    if (x2 + y2 > 4 || iterations >= self.maxIterations)
                    {
                        row.push(iterations);
                        break;
                    }
                    else
                    {
                        var xt = x2 - y2 + x0;
                        y = 2 * x * y + y0;
                        x = xt;
                        iterations++;
                    }
                }
            }
        }
    };
}

function View(model, canvas)
{
    var self = this;

    self.model = model;
    self.context = canvas.getContext('2d');
    self.eventHandler = {};
    self.selection = {};

    window.onresize = function()
    {
        var eventHandler = self.eventHandler;
        if (eventHandler.onresize)
        {
            eventHandler.onresize();
        }
    };

    self.context.canvas.onmousedown = function(mouseEvent)
    {
        var x = mouseEvent.offsetX;
        var y = mouseEvent.offsetY;

        self.selection.minX = x;
        self.selection.minY = y;
    };

    self.context.canvas.onmouseup = function(mouseEvent)
    {
        var x = mouseEvent.offsetX;
        var y = mouseEvent.offsetY;

        self.selection.maxX = x;
        self.selection.maxY = y;

        var eventHandler = self.eventHandler;
        if (eventHandler.onselect)
        {
            eventHandler.onselect(self.selection);
        }
    };

    self.update = function()
    {
        var context = self.context;
        var canvas = context.canvas;
        var model = self.model;
        var dimension = model.dimension;
        var width = dimension.width;
        var height = dimension.height;

        canvas.width = width;
        canvas.height = height;

        for (var x = 0; x < width; x++)
        {
            for (var y = 0; y < height; y++)
            {
                context.fillStyle = 'hsl(0,0%,' + (model.data[x][y] * 100 / model.maxIterations).toFixed(2) + '%)';
                context.fillRect(x, y, 1, 1);
            }
        }
    };
}

function Controller(model, view)
{
    var self = this;

    self.model = model;
    self.view = view;

    self.view.eventHandler.onresize = function()
    {
        update();
    };

    self.view.eventHandler.onselect = function(selection)
    {
        var res = self.model.getResolution();
        var bounds = self.model.bounds;

        var minX = res.x * selection.minX + bounds.minX;
        var maxX = res.x * selection.maxX + bounds.minX;
        var minY = bounds.maxY - res.y * selection.maxY;
        var maxY = bounds.maxY - res.y * selection.minY;

        console.log(selection.minX, selection.maxX, selection.minY, selection.maxY, minX, maxX, minY, maxY);
        self.model.setBounds(minX, maxX, minY, maxY);
        update();
    };

    update();

    function update()
    {
        var canvas = self.view.context.canvas;
        self.model.setDimension(canvas.offsetWidth, canvas.offsetHeight);
        self.model.update();
        self.view.update();
    }
}

var model = new Model();
var view = new View(model, document.getElementById('canvas'));
var controller = new Controller(model, view);