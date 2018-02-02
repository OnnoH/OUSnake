/**
 * @class GameController
 * @desc Create a game controller object.
 * @returns GameController
 */
function GameController() {
    // private constants
    const _SLEEPTIME = 500;  // speed of the game (no. ms per step)

    // private properties
    var _timer;  // timer event
    var _snakeSound; // game sounds
    var _snakeController; // snake controller
    var _snakeCanvas; // game canvas

    // todo: adjust these values to go to the next level
    var _numFood = 5; // number of food to start with
    var _snakeLength = 4; // initial length of the snake

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
            _snakeController = new SnakeController(_snakeCanvas.xmax, _snakeCanvas.ymax, _numFood, _snakeLength);

            //todo: move to controller
            _snakeController.createSnake(); // create the snake before the food to avoid overlap
            _snakeController.createFoods();
            _draw(); // draw the start position

            // voor een move op elke gegeven interval
            _timer = setInterval(function() {
                if (_snakeController) {
                    _snakeController.move();
                    _draw();
                }
            }, _SLEEPTIME);
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
        }
    }

    /**
     * @private
     * @desc Draw the food and snake elements on the canvas
     */
    function _draw() {
        if (_snakeController) {
            _snakeCanvas.clear();

            //todo: move the foreach into canvas. only pass [segments]
            _snakeController.getFood().forEach(function (segment) {
                _snakeCanvas.drawElement(segment);
            });
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
        _snakeCanvas.drawText("Game Over!", "OrangeRed");
        _snakeSound.play("looser");
        console.log("VERLOREN!!!");
        _stop();
    }

    /**
     * @private
     * @desc The game is won. Stop it!
     */
    function _gameWon() {
        _snakeCanvas.drawText("Well Done!", "LawnGreen");
        _snakeSound.play("winner");
        console.log("GEWONNEN!!!");
        _stop();
    }

    /**
     * @private
     * @desc Play the sounds (if on)
     * @param {string} sound The name of sound to be played
     */
    function _playSound(sound) {
        if (_snakeSound) {
            if (_snakeSound.playSounds()) {
                _snakeSound.play(sound);
            }
        }
    }

    /**
     * @private
     * @desc Turn the playing of sounds on or off.
     */
    function _toggleSound() {
        if (_snakeSound) {
            _snakeSound.toggle();
            //todo: what happens here belongs in the view
            //toggle a css property of the icon and switch icon in css.
            if (_snakeSound.playSounds()) {
              $("#toggleSound").html('<i class="fa fa-volume-up fa-fw"></i>');
            } else {
              $("#toggleSound").html('<i class="fa fa-volume-off fa-fw"></i>');
            }
        }
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
