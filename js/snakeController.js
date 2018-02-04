/**
 * @class SnakeController
 * @desc Create a snake controller object.
 * @param {number} xmax Maximum X-coordinate (canvas boundary)
 * @param {number} ymax Maximum Y-coordinate (canvas boundary)
 * @returns SnakeController
 */
function SnakeController(xmax, ymax) {
    // constants to communicate key directions
    const _LEFT = "left";
    const _RIGHT = "right";
    const _UP = "up";
    const _DOWN = "down";
    
    // constants
    const _STARTFOOD = 4;
    const _STARTLENGTH = 0;
    
    // private properties
    var _xmax = xmax;
    var _ymax = ymax;

    var _snake;             // snake model
    var _food;              // food  model
    var _direction = _UP;   // default direction in which the snake moves
    
    // private methods
    /**
     * @private
     * @desc setup game with the given level. 
     * @param {number} current level
     */
    function _init(level) {
        _createSnake(_STARTLENGTH + 2 * level);
        _createFoods(_STARTFOOD + level);
        
        //trigger a draw event;
        var allElements = _food.getSegments().concat(_snake.getSegments());
        $(document).trigger(new jQuery.Event("gameMoveEvent", [allElements]));
    }
    
    /**
     * @private
     * @desc Create the snake in the middle of the playing field
     */
    function _createSnake(snakeLength) {
        _snake = new Snake();
        var newHead;
        var x, y;
        
        for (var i = 0; i < snakeLength; i++) {
            // Snake will "coiled up it's tails" when it doesn't fit.
            x = Math.round(_xmax / 2);
            y = Math.max((Math.round(_ymax / 2) + snakeLength - i), 0);
            
            newHead = _snake.getNewHead(x, y);
            _snake.move(newHead, true);
        }
    }

    /**
     * @private
     * @desc Create an array with random scattered food particles
     */
    function _createFoods(numFoods) {
        _food = new Food();
        var x, y;
        var foodElement;

        while (_food.remaining() < numFoods ) {
            // create a new food element for the randomly chosen location
            x = Math.floor(Math.random() * (_xmax + 1));
            y = Math.floor(Math.random() * (_ymax + 1));
            foodElement = _food.createNewFood(x, y);
            // and add it to the array whan the location is not occupied
            if (!foodElement.isPresent(_snake.getSegments()) && !foodElement.isPresent(_food.getSegments())) {
                _food.add(foodElement);
            }
        }
    }

    /**
     * @private
     * @desc Move the snake in the known direction
     */
    function _move() {
        var allElements = [];       // all elements to be passed to view
        var x = _snake.getHead().x; // next x coordinate
        var y = _snake.getHead().y; // next y coordinate

        // apply direction to coordinates
        switch(_direction) {
            case _LEFT:
                x = x - 1;
                break;
            case _RIGHT:
                x = x + 1;
                break;
            case _UP:
                y = y - 1;
                break;
            case _DOWN:
                y = y + 1;
                break;
        }

        // Can we make a move?
        if (_canMove(x, y)) {
            // Create a new head
            var newHead = _snake.getNewHead(x, y);
            
            //console.log(allElements);
            
            // Have we had lunch yet?
            var eaten = newHead.isPresent(_food.getSegments());
            if (eaten) {
                _food.remove(newHead);
                _snake.move(newHead, eaten);
                allElements = _food.getSegments().concat(_snake.getSegments());
                $(document).trigger(new jQuery.Event("gameEatEvent", [allElements]));
                console.log("munch");
            } else {
                _snake.move(newHead, eaten);
                allElements = _food.getSegments().concat(_snake.getSegments());
                $(document).trigger(new jQuery.Event("gameMoveEvent", [allElements]));
            }

            if (_food.remaining() === 0) {
                $(document).trigger(new jQuery.Event("gameWonEvent", [allElements]));
            }
        } else {
            $(document).trigger(new jQuery.Event("gameOverEvent", [allElements]));
        }
    }

    /**
     * @private
     * @desc Check if the new coordinates are suitable to move to.
     * @param {number} x The new X-coordinate
     * @param {number} y The new Y-coordinate
     * @returns {boolean} The move can be made (true) or not (false)
     */
    function _canMove(x, y) {
        var result = true;

        // check for wall collisions
        if (x < 0 || x > _xmax || y < 0 || y > _ymax) {
            console.log("Snake hit a wall");
            result = false;
        }

        // check for snake collisions
        if (_snake.collision(x, y)) {
            console.log("Snake hit itself");
            result = false;
        }

        return result;
    }

    /**
     * @public
     * @desc SnakeController object which is returned.
     * @member {Object}
     */
    return {
        // public constants
        LEFT:  _LEFT,
        RIGHT: _RIGHT,
        UP:    _UP,
        DOWN:  _DOWN, 
        // public properties (read only)
        getFood: function() {
            return _food.getSegments();
        },
        getSnake: function() {
            return _snake.getSegments();
        },
        // public properties (write only)
        setDirection: function(direction) {
            _direction = direction;
        },
        // public functions
        init:  _init,
        move:  _move,
    };
}
