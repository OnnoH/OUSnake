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
function Canvas(canvas, radius, step) {

    // put parameters in private properties
    var _canvas = canvas;
    var _radius = radius;
    var _step = step;
    // private properties
    var _height = _canvas[0].height;  // canvas height
    var _width = _canvas[0].width;    // canvas width
    var _max = _width / _step - 1;    // field width
    var _xmin = _radius;              // minimum x value
    var _xmax = _width - _radius      // maximum x value
    var _ymin = _radius;              // minimum y value
    var _ymax = _height - _radius;    // maximum y value

    // private methods
    /**
     * @private
     * @desc Draw an element on the canvas
     * @param {Element} element The element object to be drawn.
     */
    var _drawElement = function(element) {
        _canvas.drawArc({
            draggable : false,
            fillStyle : element.color,
            x : element.x,
            y : element.y,
            radius : element.radius
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
        max : _max,
        xmin : _xmin,
        xmax : _xmax,
        ymin : _ymin,
        ymax : _ymax,
        height : _height,
        width : _width
    };

    return canvas;

}