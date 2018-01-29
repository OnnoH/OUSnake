/**
 * @class Element
 * @desc Create an element object.
 *
 * This class is a generalization for the snake and food elements.
 * @param {number} radius circle radius
 * @param {number} x center x-coordinate
 * @param {number} y center y-coordinate
 * @param {string} color element color
 * @returns Element
 */
function Element(radius, x, y, color) {

    // put parameters in private properties
    var _radius = radius;
    var _x = x;
    var _y = y;
    var _color = color;

    /**
     * @public
     * @desc Element object which is returned.
     * @member {Object}
     */
    var element = {
      radius: _radius,
      x: _x,
      y: _y,
      color: _color
    };

    return element;

}
