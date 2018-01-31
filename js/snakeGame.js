require(["element", "canvas", "food", "sound", "snake", "js/controller.js"], function() {
    console.log("All scripts are loaded.")
});

// global constants to communicate key directions
const LEFT     = "left"; 
const RIGHT    = "right";
const UP       = "up";
const DOWN     = "down";

var game = new GameController();

/***************************************************************************
 **                 Game Buttons                                          **
 ***************************************************************************/

$(document).ready(function() {
    $("#startSnake").click(game.start);
    $("#stopSnake").click(game.stop);
    $('#toggleSound').click(game.toggleSound);
});

/***************************************************************************
 **                 Game Keyboard                                         **
 ***************************************************************************/

 /**
    @function addEventListener(event, listener(e)) -> void
    @desc luister naar keydown events an update snake met nieuwe richting.
    @param {event} e het event waar naar geluisterd worden.
*/
document.addEventListener('keydown', function(e) {
    switch (e.which) {
        case 37: // left
            game.go(LEFT);
            break;
        case 38: // up
            game.go(UP);
            break;
        case 39: // right
            game.go(RIGHT);
            break;
        case 40: // down
            game.go(DOWN);
            break;
    }
});

/***************************************************************************
 **                 Events                                                **
 ***************************************************************************/

jQuery(document).on("gameOverEvent", game.gameOver);
jQuery(document).on("gameWonEvent", game.gameWon);


function GameController() {
    // private constants
    const SLEEPTIME = 500;        // snelheid van spel (ms per stap)
    
    // private properties
    var timer;                    // timer event
    var snakeSound;                    // de spelgeluiden
    var snakeController;
    var snakeCanvas;
     
     /**
    @function start() -> void
    @desc Initializeer het spel in start positie en begin met spelen.
          Doe niets als het spel al loopt.
    */
    function start() {
        // initiate canvas if this isn't done so already
        if (!snakeCanvas) {
            snakeCanvas = new Canvas($("#mySnakeCanvas"));
        }

        // initiate sound if this isn't done so already        
        if (!snakeSound) {
            snakeSound = new Sound();
        }
        
        // initiate a new game if the game is not running
        if (!snakeController) {
            snakeController = new SnakeController(snakeCanvas, snakeSound);
            
            //todo: move to controller
            snakeController.createSnake(); // maak de slang voor het voedsel
            snakeController.createFoods();
            
            draw();         // teken begin stand

            // voor een move op elke gegeven interval
            timer = setInterval(function() {
                if (snakeController) {
                    snakeController.move();
                    draw();
                }
            }, SLEEPTIME);
        }
    }
    
    /**
    @function stop() -> void
    @desc Stop het spel en verwijder slang en voedsel
          Doe niets als het spel niet loopt.
    */
    function stop() {
        if (snakeController) {
            clearInterval(timer);
            snakeController = null;
        }
    }
    
    function draw() {
        if (snakeController) {
            snakeCanvas.clear();
            snakeController.draw(snakeCanvas);
        }
    }
    
    /**
    @function gameOver() -> void
    @desc Het spel is verloren. Stop het spel.
    */
    function gameOver() {
        snakeCanvas.drawText("Game Over!", "OrangeRed");
        snakeSound.play("looser");
        console.log("VERLOREN!!!");
        stop();
    }

    /**
        @function gameWon() -> void
        @desc Het spel is gewonnen. Stop het spel.
    */
    function gameWon() {
        snakeCanvas.drawText("Well Done!", "LawnGreen");
        snakeSound.play("winner");
        console.log("GEWONNEN!!!");
        stop();
    }
    
    /**
        @function toggleSound() -> void
        @desc zet geluid aan of uit
    */
    function toggleSound() {
        if (snakeSound) {
            snakeSound.toggle();
            //todo: what happens here belongs in the view
            //toggle a css property of the icon and switch icon in css. 
            if (snakeSound.playSounds()) {
              $("#toggleSound").html('<i class="fa fa-volume-up fa-fw"></i>');
            } else {
              $("#toggleSound").html('<i class="fa fa-volume-off fa-fw"></i>');
            }
        }
    }
    
    function go(direction) {
        if (snakeController) {
            snakeController.setDirection(direction);
        }
    }
    
    return {
        start: start,
        stop: stop,
        toggleSound: toggleSound,
        go: go,
        gameOver: gameOver,
        gameWon: gameWon
    }
}
