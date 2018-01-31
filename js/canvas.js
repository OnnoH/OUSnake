/**
 * @namespace SnakeModel
 * @module snake/model
 * @class Canvas
 * @desc Create a canvas object with boundaries.
 * @param {object} canvas Object with canvas element from html
 * @returns Canvas
 */
function Canvas(canvas) {
    // private properties
    var _canvas = canvas;
    var _radius = 10; // pixel radius of an element
    var _height = _canvas[0].height; // canvas height
    var _width = _canvas[0].width; // canvas width
    var _step = _radius * 2; // pixel size of a step
    var _xmax = Math.floor(_width / _step) - 1; // maximum x value
    var _ymax = Math.floor(_height / _step) - 1; // maximum y value

    /**
     * @private
     * @desc Resizes the elements
     * @param {number} newRadius The new radius
     */
    var _resize = function(newRadius) {
        _radius = newRadius;
        _step = _radius * 2; // pixel size of a step
        _xmax = Math.floor(_width / _step) - 1; // maximum x value
        _ymax = Math.floor(_height / _step) - 1; // maximum y value
    }

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
                y > _ymax || y < 0);
    }

    /**
     * @public
     * @desc Canvas object which is returned.
     * @member {Object}
     */
    var canvas = {
        // Clears the canvas
        clear: function() {
            _canvas.clearCanvas();
        },
        // Draw the given element on the canvas
        drawElement: function(element) {
            _drawElement(element);
        },
        // Draw the given text on the canvas
        drawText: function(text, color) {
            _drawText(text, color);
        },
        // Check if the x/y-coordinates are out of bounds
        collision: function(x, y) {
            return _collision(x, y);
        },
        // Resizes the elements and set new boundaries
        resize: function(newRadius) {
            _resize(newRadius);
        },
        // The x- and y-boundaries
        xmax : _xmax,
        ymax : _ymax
    };

    return canvas;
}
