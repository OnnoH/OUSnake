require(["element", "canvas", "food", "sound", "snake", "snakeController"]);

/**
 * @class GameController
 * @desc Create a game controller object.
 * @returns GameController
 * @see SnakeController
 * @see Sound 
 * @see Canvas
 */
function GameController() {
    // private constants
    const _GAMESPEED = 600;     // base-speed of the game (ms per step)

    // private properties
    var _timer;                 // timer event
    var _sound;                 // game sounds
    var _snakeController;       // snake controller
    var _canvas;           // game canvas

    var _level = 1;             // current level.

    // private methods
    /**
     * @private
     * @desc Initialize the start position of the game and begin (if not already running)
     */
    function _start() {
        // initiate canvas if this isn't done so already
        if (!_canvas) {
            _canvas = new Canvas($("#mySnakeCanvas"));
        }

        // initiate sound if this isn't done so already
        if (!_sound) {
            _sound = new Sound();
        }

        // initiate a new game if the game is not running
        if (!_snakeController) {
            _snakeController = new SnakeController(_canvas.xmax, _canvas.ymax);
            _snakeController.init(_level);
            
            _draw(); // draw the start position
            
            // voor een move op elke gegeven interval
            _timer = setInterval(function() {
                if (_snakeController) {
                    _snakeController.move();
                    _draw();
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
     * @desc Draw the food and snake elements on the canvas
     */
    function _draw() {
        if (_snakeController) {
            // Clear the canvas
            _canvas.clear();

            // Draw food
            _snakeController.getFood().forEach(function (segment) {
                _canvas.drawElement(segment);
            });
            
            // Draw snake
            _snakeController.getSnake().forEach(function (segment) {
                _canvas.drawElement(segment);
            });
        }
    }

    /**
     * @private
     * @desc The game is lost. Stop it!
     */
    function _gameOver() {
        _draw();
        _canvas.drawText("Game Over!", "OrangeRed");
        _sound.play(_sound.LOSE);
        console.log("VERLOREN!!!");
        _stop();
        _level = 1;
    }

    /**
     * @private
     * @desc The game is won. Stop it!
     */
    function _gameWon() {
        _draw();
        _canvas.drawText("Well Done!", "LawnGreen");
        _sound.play(_sound.WIN);
        console.log("GEWONNEN!!!");
        _stop();
        _level += 1;
    }

    /**
     * @private
     * @desc Turn the playing of sounds on or off.
     */
    function _toggleSound() {
        // initiate sound if this isn't done so already
        if (!_sound) {
            _sound = new Sound();
        }
        
        // toggle the sound on/off
        _sound.toggle();
        
        // trigger update of view.
        $(document).trigger(new jQuery.Event("toggleSound", [_sound.getPlaying()]));
    }
    
    /**
     * @private
     * @desc play the given sound.
     * @param {string} sound The sound to be played.
     */
    function _playSound(sound) {
        _sound.play(sound)
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
        toggleSound: _toggleSound,
        gameOver: _gameOver,
        gameWon: _gameWon,
        playSound: _playSound,
        keyPressed: function(event) {
            _keyPressed(event);
        },
    };
}
