/***************************************************************************
 **                 Utility Functions                                     **
 ***************************************************************************/
/**
 * @function getRandomInt(min,max) -> number
 * @desc Create a random integer number between the min and max values.
 * @param {number} min Integer value indicating the lowest boundary.
 * @param {number} max Integer value indicating the highest boundary.
 * @returns {number} The random integer.
 * @requires Math
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function indexOf(elements,x,y) -> number
 * @desc Checks if an element with given x- and y-coordinates exists.
 *
 * Returns the index of the found element or -1 if it does not exists.
 * @param {array} elements Array with elements
 * @param {number} x X-coordinate
 * @param {number} y Y-coordinate
 * @returns {number} The index of the element if found or -1 if not
 */
function indexOf(elements, x, y) {
    var i = 0;        // iterator
    var result = - 1; // result

    while (i < elements.length) {
        if (elements[i].x == x && elements[i].y == y) {
            result = i;
            i = elements.length; // found
        }
        i++;
    }

    return result;
}
