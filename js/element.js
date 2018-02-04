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
     * @function
     * @desc Checks if an element exists based on x- and y-coordinates.
     *
     * Returns present (true) or not present (false)
     * @param {array} elements Array with elements
     * @returns {boolean} Present (true) or not present (false)
     */
    function _isPresent(elements) {
        return (_indexOf(elements) >= 0);
    }

    /**
     * @function
     * @desc Checks if an element exists based on x- and y-coordinates.
     *
     * Returns the index of the found element or -1 if it does not exists.
     * @param {array} elements Array with elements
     * @returns {number} The index of the element if found or -1 if not
     */
    function _indexOf(elements) {
        var i = 0;        // iterator
        var result = - 1; // result

        while (i < elements.length) {
            if (elements[i].x === _x && elements[i].y === _y) {
                result = i;
                i = elements.length; // found
            }
            i++;
        }

        return result;
    }

    /**
     * @public
     * @desc Element object which is returned.
     * @member {Object}
     */
    return {
      // Return the index of the element in the given collection or -1 if it doesn't exist
      indexOf: function(elements) {
          return _indexOf(elements);
      },
      // Return presence of element (true) or not (false) in collection
      isPresent: function(elements) {
          return _isPresent(elements);
      },
      // Return the coordinates and color
      x: _x,
      y: _y,
      color: _color
    };
}
