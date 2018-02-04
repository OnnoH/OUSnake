require(["element"]);

/**
 * @namespace SnakeModel
 * @module snake/view
 * @class Canvas
 * @desc A canvas object with boundaries.
 * @param {object} canvas Object with canvas element from html
 * @returns Canvas
 * @see Element
 */
function Canvas(canvas) {
    // private constants
    const _RADIUS = 10;                             // pixel radius of an element
    
    // private properties
    var _canvas = canvas;                           // the canvas
    var _height = _canvas[0].height;                // canvas height
    var _width = _canvas[0].width;                  // canvas width
    var _step = _RADIUS * 2;                        // pixel size of a step
    var _xmax = Math.floor(_width / _step) - 1;     // maximum x value
    var _ymax = Math.floor(_height / _step) - 1;    // maximum y value

    /**
     * @private
     * @desc Draw an element on the canvas
     * @param {Element} element The element object to be drawn.
     */
    function _drawElement(element) {
        _canvas.drawArc({
            draggable : false,
            fillStyle : element.color,
            x : element.x * _step + _RADIUS,
            y : element.y * _step + _RADIUS,
            radius : _RADIUS
        });
    }

    /**
     * @private
     * @desc Draw a text on the canvas in the given color.
     * @param {string} text The text to be drawn.
     * @param {string} color The color of the text.
    */
    function _drawText(text, color) {
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
    function _collision(x, y) {
        return (x > _xmax || x < 0 ||
                y > _ymax || y < 0);
    }

    /**
     * @public
     * @desc Canvas object which is returned.
     * @member {Object}
     */
    return {
        xmax : _xmax,
        ymax : _ymax,
        
        clear: function() {
            _canvas.clearCanvas();
        },
        
        drawElement: _drawElement,
        drawText: _drawText,
        collision: _collision,
    };
}
