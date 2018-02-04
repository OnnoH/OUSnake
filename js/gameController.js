require(["element", "food", "snake", "snakeGameData"]);

/**
 * @class GameController
 * @desc Create a game controller object.
 * @param {object} canvas The canvas used for this game. 

 * @returns GameController
 * @see SnakeGameData
 * @see Snake 
 * @see Food
 * @see Element
 */
function GameController(xmax, ymax) {
    // private constants
    const _GAMESPEED = 600;     // base-speed of the game (ms per step)

    // private properties
    var _timer;                 // timer event
    var _snakeGameData;         // snake controller
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
        if (!_snakeGameData) {
            _snakeGameData = new SnakeGameData(_xmax, _ymax, _level);
            
            // voor een move op elke gegeven interval
            _timer = setInterval(function() {
                if (_snakeGameData) {
                    _snakeGameData.move();
                }
            }, _GAMESPEED * Math.pow(0.8, _level));  // set game speed depending on level.
            
            console.log("Level " + _level + " started at speed " + _GAMESPEED * Math.pow(0.8, _level));
        }
    }

    /**
     * @private
     * @desc Stop the game and reset level (if the game is running)
     */
    function _stop() {
        if (_snakeGameData) {
            clearInterval(_timer);
            _snakeGameData = null;
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
        if (_snakeGameData) {
            switch (event.which) {
            case 37: // left arrow
                _snakeGameData.setDirection(_snakeGameData.LEFT);
                break;
            case 38: // up arrow key
                _snakeGameData.setDirection(_snakeGameData.UP);
                break;
            case 39: // right arrow key
                _snakeGameData.setDirection(_snakeGameData.RIGHT);
                break;
            case 40: // down arrow key
                _snakeGameData.setDirection(_snakeGameData.DOWN);
                break;
            }
        }
    }

    /**
     * @public
     * @desc gameController object which is returned.
     * @member {Object}
     */
     return {
        // public properties
        level: _level, 
        // public functions
        start: _start,
        stop: _stop,
        gameOver: _gameOver,
        gameWon: _gameWon,
        keyPressed: _keyPressed,
    };
}
