require(["element"]);

/**
 * @class Canvas
 * @module snake/view
 * @desc provide a canvas for the game.
 * @param {object} canvas object with canvas element from HTML.
 * @returns Canvas the object the game is drawn on.
 * @see Element
 */
function Canvas(canvas) {
    // private constants
    const _RADIUS = 10;                             // pixel radius of an element

    const _GOOD   = "LawnGreen"                     // good text style/color
    const _BAD    = "OrangeRed"                     // bad text style/color
    const _NORMAL = "White"                         // normal text style/color
    const _FONT   = "Comic Sans MS"                 // if you can call this a font...
    
    // private properties
    var _canvas = canvas;                           // the canvas
    var _height = _canvas[0].height;                // canvas height
    var _width  = _canvas[0].width;                 // canvas width
    var _step   = _RADIUS * 2;                      // pixel size of a step
    var _xmax   = Math.floor(_width / _step) - 1;   // maximum x value
    var _ymax   = Math.floor(_height / _step) - 1;  // maximum y value

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
     * @desc Draw a line of text on the canvas in the given color.
     * @param {string} line The text to be drawn.
     * @param {string} style The style and color of the text.
     * @param {number} style line number of the text (up to 3).
    */
    function _drawText(line, style, lineNumber) {
        // get the context from canvas.
        var context = _canvas[0].getContext("2d");
        context.textAlign = "center";
        context.fillStyle = style;
        
        // determine how to draw the text.
        switch(style) {
            case _GOOD:
                context.font = 50 + "px " + _FONT;
                break;
            case _BAD:
                context.font = 50 + "px " + _FONT;
                break;
            case _NORMAL:
                context.font = 24 + "px " + _FONT;
                break;
        }

        // draw the text.
        context.fillText(line, _width / 2, _height / 6 * (3 + lineNumber));
    }
    
    /**
     * @private
     * @desc Draw the elements and texts given.
     * @param {[object]} elements array of elements to be drawn.
     * @param {[[string, string]]} texts array of [text, style] to be drawn.
    */
    function _draw(elements, texts) {
        // clear canvas
        canvas.clearCanvas();
        
        // draw all elements 
        elements.forEach(function(element) {
            _drawElement(element);
        });
        
        // draw text
        text.forEach(function(line) {
            _drawText(line[0], line[1], text.indexOf(line));
        });
    }

    /**
     * @public
     * @desc Canvas object which is returned.
     * @member {Object}
     */
    return {
        // public constants
        GOOD:   _GOOD,
        BAD:    _BAD,
        NORMAL: _NORMAL,
        // public properties
        xmax : _xmax,
        ymax : _ymax,
        // public functions        
        draw: _draw,
    };
}
