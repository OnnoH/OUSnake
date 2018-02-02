/**
 * @class SnakeController
 * @desc Create a snake controller object.
 * @param {number} xmax Maximum X-coordinate (canvas boundary)
 * @param {number} ymax Maximum Y-coordinate (canvas boundary)
 * @param {number} numFoodElements Number of food element to start with
 * @param {number} numSnakeElements Number of snake elements to start with
 * @returns SnakeController
 */
function SnakeController(xmax, ymax, numFoodElements, numSnakeElements) {
    // put parameters in private properties
    var _xmax = xmax;
    var _ymax = ymax;
    var _numFoodElements = numFoodElements;
    var _numSnakeElements = numSnakeElements;

    // private properties
    var _snake; // the snake
    var _food; // the food
    var _direction = UP; // default direction in which the snake moves

    // private methods
    /**
     * @private
     * @desc Create the snake in the middle of the playing field
     */
    function _createSnake() {
        _snake = new Snake();
        var newHead;

        for (var i = 0; i < _numSnakeElements; i++) {
          newHead = _snake.getNewHead(Math.round(_xmax / 2), Math.round(_ymax / 2) - i);
          _snake.move(newHead, true);
        }
    }

    /**
     * @private
     * @desc Create an array with random scattered food particles
     */
    function _createFoods() {
        _food = new Food();
        var x, y;
        var foodElement;

        while (_food.remaining() < _numFoodElements ) {
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
    function move() {
        // determine the next x,y coordinates
        var x = _snake.getHead().x;
        var y = _snake.getHead().y;

        switch(_direction) {
            case LEFT:
                x = x - 1;
                break;
            case RIGHT:
                x = x + 1;
                break;
            case UP:
                y = y - 1;
                break;
            case DOWN:
                y = y + 1;
                break;
        }

        // Can we make a move?
        if (_canMove(x, y)) {
            // Create a new head
            var newHead = _snake.getNewHead(x, y);
            // Have we had lunch yet?
            var eaten = newHead.isPresent(_food.getSegments());
            if (eaten) {
                _food.remove(newHead);
                jQuery(document).trigger(new jQuery.Event("playFood"));
                console.log("munch");
            } else {
                jQuery(document).trigger(new jQuery.Event("playMove"));
            }
            _snake.move(newHead, eaten);

            if (_food.remaining() === 0) {
                jQuery(document).trigger(new jQuery.Event("gameWonEvent"));
            }
        } else {
            jQuery(document).trigger(new jQuery.Event("gameOverEvent"));
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

        if (x < 0 || x > _xmax || y < 0 || y > _ymax) {
            console.log("Snake hit a wall");
            result = false;
        }

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
    var snakeController {
        createSnake: _createSnake,
        createFoods: _createFoods,
        move: _move,
        getFood: function() {
            return _food.getSegments();
        },
        getSnake: function() {
            return _snake.getSegments();
        },
        setDirection: function(direction) {
            _direction = direction;
        }
    }
}
