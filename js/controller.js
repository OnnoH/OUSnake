

/***************************************************************************
 **                 Game                                                  **
 ***************************************************************************/
 
function SnakeController(xmax, ymax, numFood, numSnake) {
    // private properties
    var _snake;                    // de slang met kop en staart elementen
    var _food;                     // voedsel voor de slang
    var _direction = UP;           // bewegingsrichting van de slang
    
    var _numFood = numFood;        // number of food elements
    var _numSnake = numSnake;      // number of snake elements
    
    var _xmax = xmax;
    var _ymax = ymax;
    
    /**
        @function createSnake() -> void
        @desc Slang creëren, bestaande uit  twee segmenten,
              in het midden van het veld
    */
    function createSnake() {
        // maak een nieuwe lege slang aan.
        _snake = new Snake();
        var newHead;

        // voeg twee elementen aan de slang toe.
        newHead = _snake.getNewHead(Math.round(xmax / 2), Math.round(ymax / 2));
        _snake.move(newHead, true);
        newHead = _snake.getNewHead(Math.round(xmax / 2), Math.round(ymax / 2) - 1);
        _snake.move(newHead, true);

        // zet bewegingsrichting
        direction = UP;
    }
    
    /**
    @function createFoods() -> array met food
    @desc array van random verdeelde voedselpartikelen
    @returns {Element} array met food
    */
    function createFoods() {
        // maak leeg voedselveld aan
        _food = new Food();

        while (_food.remaining() < _numFood ) {
            // maak een nieuw element op een random location.
            var x = Math.floor(Math.random() * (xmax + 1));
            var y = Math.floor(Math.random() * (ymax + 1));
            
            var foodElement = _food.createNewFood(x, y);
            // voeg nieuw voedsel toe als de lokatie nog vrij is.
            if (!foodElement.isPresent(_snake.getSegments()) && !foodElement.isPresent(_food.getSegments())) {
                _food.add(foodElement);
            }
        }
    }
    
    /**
        @function move(direction) -> void
        @desc verander bewegingsrichting slang in aangegeven richting.
        @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
    */
    function move() {
        // bepaal coordinaten van volgende stap
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
        if (canMove(x, y)) {
            // Create a new head
            var newHead = _snake.getNewHead(x, y);
            // Have we had lunch yet?
            eaten = newHead.isPresent(_food.getSegments());
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
                //gameWon();
            }
        } else {
            jQuery(document).trigger(new jQuery.Event("gameOverEvent"));
            //gameOver();
        }
    }

    function canMove(x, y) {
        result = true;

        if (x < 0 || x > xmax || y < 0 || y > ymax) {
            console.log("Snake hit a wall");
            result = false;
        }

        if (_snake.collision(x, y)) {
            console.log("Snake hit itself");
            result = false;
        }

        return result;
    }
    
    return {
        createSnake, createSnake,
        createFoods, createFoods,
        move: move, 
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