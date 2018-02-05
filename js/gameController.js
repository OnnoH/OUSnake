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

    var _xmax = xmax            // width of the field
    var _ymax = ymax;           // height of the field

    // private methods
    /**
     * @private
     * @desc Initialize the start position of the game and begin (if not already running)
     */
    function _start() {
        // initiate a new game if the game is not running
        if (!_snakeGameData) {
            _snakeGameData = new SnakeGameData(_xmax, _ymax, _level);   
            var gameSpeed = _GAMESPEED * Math.pow(0.8, _level)          // game speed in ms.
            
            // perform a move after every tick (gameSpeed).
            _timer = setInterval(function() {
                _snakeGameData.move();              
            }, gameSpeed);     

            console.log("Level " + _level + " started at speed " + gameSpeed);
        }
    }

    /**
     * @private
     * @desc The user requested to stop the game so trigger an event
     */
    function _stop() {
        _haltGame();
        _level = 1;
        $(document).trigger(new jQuery.Event("gameStoppedEvent", []));
    }

    /**
     * @private
     * @desc The game is lost. Stop it!
     */
    function _gameOver() {
        _haltGame();
        _level = 1;
    }

    /**
     * @private
     * @desc The game is won. Stop it!
     */
    function _gameWon() {
        _haltGame();
        _level += 1;
    }
    
    /**
     * @private
     * @desc halt the game (if the game is running)
     */
    function _haltGame() {
        if (_snakeGameData) {
            clearInterval(_timer);
            _snakeGameData = null;
        }
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
        // public functions
        start: _start,
        stop: _stop,
        gameOver: _gameOver,
        gameWon: _gameWon,
        keyPressed: _keyPressed,
        getLevel: function() {
            return _level;
        },
    };
}
