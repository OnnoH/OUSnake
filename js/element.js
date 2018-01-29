/**
 * @class Element
 * @desc Create an element object.
 *
 * This class is a generalization for the snake and food elements.
 * @param {number} x center x-coordinate
 * @param {number} y center y-coordinate
 * @param {string} color element color
 * @returns Element
 */
function Element(x, y, color) {
    // private properties
    var _x = x;
    var _y = y;
    var _color = color;

    /**
     * @public
     * @desc Element object which is returned.
     * @member {Object}
     */
    var element = {
      x: _x,
      y: _y,
      color: _color
    };

    return element;
}
