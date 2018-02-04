/**
 * @class GameController
 * @desc Create a game controller object.
 * @returns GameController
 */
function GameController() {
    // private constants
    const _GAMESPEED = 600;     // base-speed of the game (ms per step)

    // private properties
    var _timer;                 // timer event
    var _snakeSound;            // game sounds
    var _snakeController;       // snake controller
    var _snakeCanvas;           // game canvas

    var _level = 1;             // current level.

    // private methods
    /**
     * @private
     * @desc Initialize the start position of the game and begin (if not already running)
     */
    function _start() {
        // initiate canvas if this isn't done so already
        if (!_snakeCanvas) {
            _snakeCanvas = new Canvas($("#mySnakeCanvas"));
        }

        // initiate sound if this isn't done so already
        if (!_snakeSound) {
            _snakeSound = new Sound();
        }

        // initiate a new game if the game is not running
        if (!_snakeController) {
            _snakeController = new SnakeController(_snakeCanvas.xmax, _snakeCanvas.ymax);
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
            _snakeCanvas.clear();

            // Draw food
            _snakeController.getFood().forEach(function (segment) {
                _snakeCanvas.drawElement(segment);
            });
            
            // Draw snake
            _snakeController.getSnake().forEach(function (segment) {
                _snakeCanvas.drawElement(segment);
            });
        }
    }

    /**
     * @private
     * @desc The game is lost. Stop it!
     */
    function _gameOver() {
        _draw();
        _snakeCanvas.drawText("Game Over!", "OrangeRed");
        _snakeSound.play("looser");
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
        _snakeCanvas.drawText("Well Done!", "LawnGreen");
        _snakeSound.play("winner");
        console.log("GEWONNEN!!!");
        _stop();
        _level += 1;
    }

    /**
     * @private
     * @desc Play the sounds (if on)
     * @param {string} sound The name of sound to be played
     */
    function _playSound(sound) {
        _snakeSound.play(sound);
    }

    /**
     * @private
     * @desc Turn the playing of sounds on or off.
     */
    function _toggleSound() {
        // initiate sound if this isn't done so already
        if (!_snakeSound) {
            _snakeSound = new Sound();
        }
        
        _snakeSound.toggle();
        $(document).trigger(new jQuery.Event("toggleSound", [_snakeSound.getPlaying()]));
    }

    /**
     * @private
     * @desc Go snake! In the given direction that is...
     */
    function _keyPressed(event) {
        if (_snakeController) {
            _snakeController.keyPressed(event);
        }
    }

    /**
     * @public
     * @desc SnakeController object which is returned.
     * @member {Object}
     */
     var gameController = {
        start: _start,
        stop: _stop,
        toggleSound: _toggleSound,
        gameOver: _gameOver,
        gameWon: _gameWon,
        keyPressed: function(event) {
            _keyPressed(event);
        },
        playSound: function(sound) {
            _playSound(sound);
        }
    }

    return gameController;
}
