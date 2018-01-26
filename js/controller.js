const LEFT     = "left";      // bewegingsrichtingen
const RIGHT    = "right";
const UP       = "up";
const DOWN     = "down";
const R        = 10;     // straal van een element
const STEP     = 2 * R;  // stapgrootte

const NUMFOODS = 5;           // aantal voedselelementen
const SLEEPTIME = 500;        // snelheid van spel (ms per stap)

var timer;                    // timer event
var snake;                    // de slang met kop en staart elementen
var food;                     // voedsel voor de slang
var direction;                // bewegingsrichting van de slang
var sound;                    // de spelgeluiden
var canvas;                   // het speelveld

var running = false;          // geeft aan of het spel loopt of niet.

$(document).ready(function() {
    $("#startSnake").click(start);
    $("#stopSnake").click(stop);
    $('#toggleSound').click(toggleSound);
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
            direction = LEFT;
            break;
        case 38: // up
            direction = UP;
            break;
        case 39: // right
            direction = RIGHT;
            break;
        case 40: // down
            direction = DOWN;
            break;
    }
});


/***************************************************************************
 **                 Game                                                  **
 ***************************************************************************/
 /**
     @function init() -> void
     @desc Bepaal de afmetingen, creeer de geluidenverzameling, een slang, genereer voedsel, en teken alles
 */
 function init() {
   createCanvas("#mySnakeCanvas");
   createSounds();
   createSnake(); // maak de slang voor het voedsel
   createFoods();
 }

/**
    @function start() -> void
    @desc Initializeer het spel in start positie en begin met spelen.
          Doe niets als het spel al loopt.
*/
function start() {
    if (!running) {
        init();         // zet spel op
        draw();         // teken begin stand
        running = true; // start het spel

        // voor een move op elke gegeven interval
        timer = setInterval(function() {
            move();
        }, SLEEPTIME);
    }
}

/**
    @function stop() -> void
    @desc Stop het spel en verwijder slang en voedsel
          Doe niets als het spel niet loopt.
*/
function stop() {
    if (running) {
        clearInterval(timer);
        running = false;
        snake = null;
        food = null;
        draw();
    }
}

/**
    @function gameOver() -> void
    @desc Het spel is verloren. Stop het spel.
*/
function gameOver() {
    snakeCanvas.drawText("Game Over!", "OrangeRed");
    sound.play("looser");
    console.log("VERLOREN!!!");
    clearInterval(timer);
    running = false;
}

/**
    @function gameWon() -> void
    @desc Het spel is gewonnen. Stop het spel.
*/
function gameWon() {
    snakeCanvas.drawText("Well Done!", "LawnGreen");
    sound.play("winner");
    console.log("GEWONNEN!!!");
    clearInterval(timer);
    running = false;
}

/***************************************************************************
 **                 Game Init Methods                                     **
 ***************************************************************************/

/**
    @function createFoods() -> array met food
    @desc array van random verdeelde voedselpartikelen
    @returns {Element} array met food
*/
function createFoods() {
    var x, y // coordinaten voor nieuw voedsel

    food = new Food([]);    // maak leeg voedselveld aan

    while (food.remaining() < NUMFOODS ) {
        // maak een nieuw element op een random location.
        x = snakeCanvas.xmin + getRandomInt(0, snakeCanvas.max) * STEP;
        y = snakeCanvas.ymin + getRandomInt(0, snakeCanvas.max) * STEP;
        if (!snake.collision(x, y) && !food.collision(x, y)) {
            food.add(R, x, y);
        }
    }
}

/**
    @function createSnake() -> void
    @desc Slang creëren, bestaande uit  twee segmenten,
          in het midden van het veld
*/
function createSnake() {
    // private functie voor het aanmaken van elementen.
    function createElement(x, y) {
        return new Element(R, x, y, null);
    }

    // maak de segmenten voor de slang.
    var segments = [createElement(R + snakeCanvas.width / 2, R + snakeCanvas.width / 2),
                    createElement(R + snakeCanvas.width / 2, snakeCanvas.width / 2 - R)];

    // maak de slang.
    snake = new Snake(segments);

    // zet bewegingsrichting
    direction = UP;
}

/**
    @function createCanvas() -> Canvas
    @desc Maakt het canvas op basis van het gegeven HTML element
    @returns {Canvas} canvas volgens HTML definitie
*/
function createCanvas(canvasId) {
    snakeCanvas = new Canvas($(canvasId), R, STEP);
}

/**
    @function createSounds() -> Sound
    @desc maak de geluidenverzameling
*/
function createSounds() {
  sound = new Sound();
  // definieer geluiden
  sound.add("move");
  sound.add("food");
  sound.add("winner");
  sound.add("looser");
}

/**
    @function toggleSound() -> void
    @desc zet geluid aan of uit
*/
function toggleSound() {
    if (sound) {
        sound.toggle();
        if (sound.playSounds()) {
          $("#toggleSound").html('<i class="fa fa-volume-off"></i>');
        } else {
          $("#toggleSound").html('<i class="fa fa-volume-up"></i>');
        }
    }
}
/***************************************************************************
 **                 Game Move Methods                                     **
 ***************************************************************************/

/**
    @function move(direction) -> void
    @desc verander bewegingsrichting slang in aangegeven richting.
    @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
*/
function move() {
    // bepaal coordinaten van volgende stap
    var x = snake.getHead().x;
    var y = snake.getHead().y;

    switch(direction) {
        case LEFT:
            x = x - STEP;
            break;
        case RIGHT:
            x = x + STEP;
            break;
        case UP:
            y = y - STEP;
            break;
        case DOWN:
            y = y + STEP;
            break;
    }

    // test of stap gemaakt kan worden
    if (canMove(x, y)) {
        // bepaal of er eten gegeten wordt.
        eaten = food.eat(x, y);

        // Laat de slang een stap zetten.
        snake.move(x, y, eaten);
        draw();

        if (eaten) {
            sound.play("food");
            console.log("munch");
            if (food.remaining() == 0) {
                gameWon();
            }
        } else {
            sound.play("move");
        }
    } else {
        gameOver();
    }
}

function canMove(x, y) {
    result = true;

    if (collisionWithWall(x, y)) {
        console.log("Snake hit a wall");
        result = false;
    }

    if (snake.collision(x, y)) {
        console.log("Snake hit itself");
        result = false;
    }

    return result;
}

/***************************************************************************
 **                 Canvas                                                **
 ***************************************************************************/

/**
    @function draw() -> void
    @desc Teken de slang en het voedsel
*/
function draw() {
    snakeCanvas.clear();

    if (snake) {
        snake.getSegments().forEach(function (segment) {
            snakeCanvas.drawElement(segment);
        });
    }

    if (food) {
        food.getSegments().forEach(function (food) {
          snakeCanvas.drawElement(food);
        });
    }
}

/**
    @function collisionWithWall(x, y) -> boolean
    @desc Controleert of de nieuwe positie binnen het veld blijft
          en of er geen botsing plaats vindt.
    @param {number} x: x-coordinaat van nieuwe positie.
    @param {number} y: y-coordinaat van nieuwe positie.
    @returns {boolean} de nieuwe positie botst met wand (true) of niet (false).
*/
function collisionWithWall(x, y) {
    return (x > snakeCanvas.xmax || x < snakeCanvas.xmin ||
            y > snakeCanvas.ymax || y < snakeCanvas.ymin)
}
