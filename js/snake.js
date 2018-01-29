/**
 * @class Snake
 * @desc Create a snake object.
 * @param {array} segments Array with elements. The final element contains the snake's head.
 * @returns Snake
 * @see Element
 * @see util indexOf
 */
function Snake(radius) {
    // private constants
    const _SNAKE   = "DarkRed";    // color of the snake's body
    const _HEAD    = "DarkOrange"; // color of the snake's head

    // private properties
    var _radius = radius
    var _segments = [];     // snake elements
    var _head;              // head segment
    var _segments = [];     // snake elements

    /**
     * @private
     * @desc Executes snake movement in the current direction.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @param {boolean} grow Indicates if the snake grows (e.g. because he has eaten food)
     */
    var _move = function (x, y, grow) {
        // change the current head into a body part
        if (_head) {
            _head.color = _SNAKE;
        }
        
        // add a new head
        _segments.push(_createNewHead(x, y));
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
    var _collision = function (x, y) {
        return indexOf(_segments, x, y) >= 0;
    }

    /**
     * @private
     * @desc Creates a new snake head on the given coordinates.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @returns {Element} Element with radius of the tail and color _HEAD.
    */
    _createNewHead = function(x, y) {
        return new Element(_radius, x, y, _HEAD);
    }

    /**
     * @public
     * @desc Snake object which is returned.
     * @member {Object}
     */
    var snake = {
        getHead: function() {
            return _head;
        },
        getSegments: function () {
            return _segments;
        },
        move: function(x, y, grow) {
            _move(x, y, grow);
        },
        collision: function(x, y) {
            return _collision(x, y);
        }
    };

    return snake;
}
