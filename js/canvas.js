/**
 * @namespace SnakeModel
 * @module snake/model
 * @class Canvas
 * @desc Create a canvas object with boundaries.
 * @param {object} canvas Object with canvas element from html
 * @param {number} radius Element radius for calculating boundaries
 * @param {number} step Stepsize for calculating field width
 * @returns Canvas
 */
function Canvas(canvas, gridSize) {   
    // private properties
    var _canvas = canvas;
    var _gridSize = gridSize;
    var _height = _canvas[0].height;                   // canvas height
    var _width = _canvas[0].width;                     // canvas width
    var _step = Math.max(_width, _height) / _gridSize; // pixel size of a step
    var _radius = _step / 2;                           // pixel radius of an element
    var _xmax = Math.floor(_width/_step) - 1;          // maximum x value
    var _ymax = Math.floor(_height/_step) - 1;         // maximum y value

    /**
     * @private
     * @desc Draw an element on the canvas
     * @param {Element} element The element object to be drawn.
     */
    var _drawElement = function(element) {
        _canvas.drawArc({
            draggable : false,
            fillStyle : element.color,
            x : element.x * _step + _radius,
            y : element.y * _step + _radius,
            radius : _radius
        });
    }

    /**
     * @private
     * @desc Draw a text on the canvas in the given color.
     * @param {string} text The text to be drawn.
     * @param {string} color The color of the text.
    */
    var _drawText = function(text, color) {
        var context = _canvas[0].getContext("2d");
        context.font = "50px Comic Sans MS";
        context.fillStyle = color;
        context.textAlign = "center";
        context.fillText(text, _width / 2, _height / 2);
    }
    
    /**
     * @private
     * @desc Checks if the given x- and y-coordinates are within the playing field.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @returns {boolean} Location is within playing field (true) or not (false)
    */
    var _collision = function(x, y) {
        return (x > _xmax || x < 0 ||
                y > _ymax || y < 0)
    }

    /**
     * @public
     * @desc Canvas object which is returned.
     * @member {Object}
     */
    var canvas = {
        clear: function() {
            _canvas.clearCanvas();
        },
        drawElement: function(element) {
            _drawElement(element);
        },
        drawText: function(text, color) {
            _drawText(text, color);
        },
        collision: function(x, y) {
            return _collision(x, y);
        },
        xmax : _xmax,
        ymax : _ymax
        
    };

    return canvas;
}
