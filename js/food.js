/**
 * @class Food
 * @desc Create a food collection object.
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
     * @param {object} element The eater, e.g. the snake's head
    */
    var _remove = function(element) {
        _segments.splice(element.indexOf(_segments), 1);
    }

    /**
     * @private
     * @desc Creates a food segment on the given x- and y-coordinates.
     * @param {object} element The food element
    */
    var _add = function(element) {
        _segments.push(element);
    }

    /**
     * @private
     * @desc Checks if the given x- and y-coordinates are 'occupied'.
     * @param {object} element The element to be found in the food collection
     * @returns {boolean} Location is occupied (true) or not (false)
    */
    var _collision = function(element) {
        return element.indexOf(_segments) >= 0;
    }

    /**
     * @private
     * @desc Creates a new snake head on the given coordinates.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @returns {Element} Element on given coordinates and color _FOOD.
    */
    _createNewFood = function(x, y) {
        return new Element(x, y, _FOOD);
    }

    /**
     * @public
     * @desc Food object which is returned.
     * @member {Object}
     */
    var food = {
        // Create food element on given coordinates
        createNewFood: function(x, y) {
            return _createNewFood(x, y);
        },
        // Add food element to the collection
        add: function(element) {
            _add(element);
        },
        // Return the number of food elements left
        remaining: function() {
            return _segments.length;
        },
        // Return the food elements
        getSegments: function() {
            return _segments;
        },
        // Delete food element if eaten
        remove: function(element) {
            return _remove(element);
        },
        // Checks if element is present in food collection
        collision: function(element) {
            return _collision(element);
        }
    }

    return food;
}
