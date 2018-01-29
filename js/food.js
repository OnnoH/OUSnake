/**
 * @class Food
 * @desc Create a food collection object.
 * @param {array} segments Array with food elements
 * @returns Food
 * @see Element
 * @see util indexOf
 */
function Food() {
    // private constants
    const _FOOD = "Olive";      // food color
    
    // private properties
    var _segments = [];         // food segments

    /**
     * @private
     * @desc Removes the food segment on the given x- and y-coordinates if present.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @returns {boolean} Snake has eaten (true) or not (false)
    */
    var _eat = function(x, y) {
        var _result = false;

        var _index = indexOf(_segments, x, y);
        if (_index >= 0) {
            _segments.splice(_index, 1);
            _result = true;
        }

        return _result;
    }

    /**
     * @private
     * @desc Creates a food segment on the given x- and y-coordinates.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
    */
    var _add = function(x, y) {
        _segments.push(new Element(x, y, _FOOD));
    }

    /**
     * @private
     * @desc Checks if the given x- and y-coordinates are 'occupied'.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @returns {boolean} Location is occupied (true) or not (false)
    */
    var _collision = function(x, y) {
        return indexOf(_segments, x, y) >= 0;
    }

    /**
     * @public
     * @desc Food object which is returned.
     * @member {Object}
     */
    var food = {
        add: function(x, y) {
            _add(x, y);
        },
        remaining: function() {
            return _segments.length;
        },
        getSegments: function() {
            return _segments;
        },
        eat: function(x, y) {
            return _eat(x, y);
        },
        collision: function(x, y) {
            return _collision(x, y);
        }
    }

    return food;
}
