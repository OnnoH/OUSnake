require(["element", "food", "snake", "snakeController"]);

/**
 * @class GameController
 * @desc Create a game controller object.
 * @param {object} canvas The canvas used for this game. 

 * @returns GameController
 * @see SnakeController
 * @see Snake 
 * @see Food
 * @see Element
 */
function GameController(xmax, ymax) {
    // private constants
    const _GAMESPEED = 600;     // base-speed of the game (ms per step)

    // private properties
    var _timer;                 // timer event
    var _snakeController;       // snake controller
    var _level = 1;             // current level.
    
    var _xmax = xmax
    var _ymax = ymax;
    
    // private methods
    /**
     * @private
     * @desc Initialize the start position of the game and begin (if not already running)
     */
    function _start() {
        // initiate a new game if the game is not running
        if (!_snakeController) {
            _snakeController = new SnakeController(_xmax, _ymax);
            _snakeController.init(_level);
            
            // voor een move op elke gegeven interval
            _timer = setInterval(function() {
                if (_snakeController) {
                    _snakeController.move();
                }
            }, _GAMESPEED * Math.pow(0.8, _level));  // set game speed depending on level.
            
            console.log("Level " + _level + " started at speed " + _GAMESPEED * Math.pow(0.8, _level));
        }
    }

    /**
     * @private
     * @desc Stop the game and reset snakeController (if present)
     */
    function _stop() {
        if (_snakeController) {
            clearInterval(_timer);
            _snakeController = null;
            _level = 1;
        }
    }

    /**
     * @private
     * @desc The game is lost. Stop it!
     */
    function _gameOver() {
        _stop();
        _level = 1;
    }

    /**
     * @private
     * @desc The game is won. Stop it!
     */
    function _gameWon() {
        _stop();
        _level += 1;
    }

    /**
     * @private
     * @desc Go snake! In the given direction that is...
     * @param {object} event The event object containing the key pressed
     */
    function _keyPressed(event) {
        if (_snakeController) {
            switch (event.which) {
            case 37: // left arrow
                _snakeController.setDirection(_snakeController.LEFT);
                break;
            case 38: // up arrow key
                _snakeController.setDirection(_snakeController.UP);
                break;
            case 39: // right arrow key
                _snakeController.setDirection(_snakeController.RIGHT);
                break;
            case 40: // down arrow key
                _snakeController.setDirection(_snakeController.DOWN);
                break;
            }
        }
    }

    /**
     * @public
     * @desc SnakeController object which is returned.
     * @member {Object}
     */
     return {
        start: _start,
        stop: _stop,
        gameOver: _gameOver,
        gameWon: _gameWon,
        level: _level, 
        keyPressed: function(event) {
            _keyPressed(event);
        },
    };
}
