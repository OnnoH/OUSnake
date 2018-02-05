/**
 * @class Snake
 * @desc Create a snake object.
 * @returns Snake
 * @see Element
 */
function Snake() {
    // private constants
    const _SNAKE   = "DarkRed";    // color of the snake's body
    const _HEAD    = "DarkOrange"; // color of the snake's head

    // private properties
    var _segments = [];     // snake elements
    var _head;              // head segment

    /**
     * @private
     * @desc Executes snake movement in the current direction.
     * @param {object} element containing the new head
     * @param {boolean} grow Indicates if the snake grows (e.g. because he has eaten food)
     */
    function _move(element, grow) {
        // change the current head into a body part
        if (_head) {
            _head.color = _SNAKE;
        }

        // add a new head
        _segments.push(element);
        _head = _segments[_segments.length-1];

        // remove the tail if the snake doesn't grow
        if (!grow) {
            _segments.shift();
        }
    }

    /**
     * @private
     * @desc Checks if the given x- and y-coordinates are 'occupied'.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @returns {boolean} Snake hits itself (true) or not (false)
    */
    function _collision(x, y) {
        return _createNewHead(x, y).indexOf(_segments) >= 0;
    }

    /**
     * @private
     * @desc Creates a new snake head on the given coordinates.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @returns {Element} Element on given coordinates and color _HEAD.
    */
    function _createNewHead (x, y) {
        return new Element(x, y, _HEAD);
    }

    /**
     * @public
     * @desc Snake object which is returned.
     * @member {Object} Snake
     */
    return {
        // Returns the head (final segment)
        getHead: function() {
            return _head;
        },
        // Returns the new head element on the give coordinates
        getNewHead: function(x, y) {
            return _createNewHead(x, y);
        },
        // Returns the snake's segments
        getSegments: function () {
            return _segments;
        },
        // Move (and grow) the snake
        move: function(element, grow) {
            _move(element, grow);
        },
        // Check if the snake collides with itself
        collision: function(x, y) {
            return _collision(x, y);
        }
    };
}
