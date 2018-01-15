const NUMFOODS = 5;           // aantal voedselelementen
const SLEEPTIME = 500;        // snelheid van spel (ms per stap)

var timer;                    // timer event
var snake;                    // de slang met kop en staart elementen
var food;                     // voedsel voor de slang
var sound;                    // de spelgeluiden
var canvas;                   // het speelveld

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
    var direction; // nieuwe richting van de slang
    switch (e.which) {
        case 37: // left
            snake.direction = LEFT;
            console.log("left");
            break;
        case 38: // up
            snake.direction = UP;
            console.log("up");
            break;
        case 39: // right
            snake.direction = RIGHT;
            console.log("right");
            break;
        case 40: // down
            snake.direction = DOWN;
            console.log("down");
            break;
    }
});

/***************************************************************************
 **                 Game Hulpfuncties                                     **
 ***************************************************************************/

/**
    @function gameOver() -> void
    @desc het spel is uit met audio/video/log
*/
function gameOver() {
    snakeCanvas.drawText("Game Over!", "OrangeRed");
    sound.play("looser");
    console.log("VERLOREN!!!");
    clearInterval(timer);
}

/**
    @function gameWon() -> void
    @desc het spel is gewonnen met audio/video/log
*/
function gameWon() {
    snakeCanvas.drawText("Well Done!", "LawnGreen");
    sound.play("winner");
    console.log("GEWONNEN!!!");
    clearInterval(timer);
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
    @function createFoods() -> array met food
    @desc array van random verdeelde voedselpartikelen
    @returns {Element} array met food
*/
function createFoods() {
    var  i
    ,    newFood;
    food = new Food();

    i = 0;
    while (i < NUMFOODS ) {
        newFood = food.create(snakeCanvas.xmin + getRandomInt(0, snakeCanvas.max) * STEP, snakeCanvas.ymin + getRandomInt(0, snakeCanvas.max) * STEP);
        if (!newFood.isPresent(snake.segments) && !newFood.isPresent(food.segments) ) {
            food.add(newFood);
            i++;
        }
    }
}

/**
    @function createSnake() -> Snake
    @desc Slang creëren, bestaande uit  twee segmenten,
          in het midden van het veld
    @returns {Snake} slang volgens specificaties
*/
function createSnake() {
    var segments   = [createBodyPart(R + snakeCanvas.width / 2, R + snakeCanvas.width / 2),
                      createBodyPart(R + snakeCanvas.width / 2, snakeCanvas.width / 2 - R)];
    snake = new Snake(segments);
}

/**
    @function createSnake() -> Canvas
    @desc Maakt het canvas op basis van het gegeven HTML element
    @returns {Canvas} canvas volgens HTML definitie
*/
function createCanvas() {
    snakeCanvas = new Canvas("#mySnakeCanvas");
}

function toggleSound() {
    sound.toggle();
}
/***************************************************************************
 **                 Game                                                  **
 ***************************************************************************/
 /**
     @function init() -> void
     @desc Bepaal de afmetingen, creeer de geluidenverzameling, een slang, genereer voedsel, en teken alles
 */
 function init() {
   createCanvas();
   createSounds();
   createSnake(); // maak de slang voor het voedsel
   createFoods();
 }

/**
    @function start() -> void
    @desc initializeer het spel in start positie en begin met spelen.
*/
function start() {
    init(); // todo: enkel uitvieren indien nodig
    draw();

    // reset timer
    clearInterval(timer);

    // begin spel
    timer = setInterval(function() {
        move(snake.direction);
    }, SLEEPTIME);
}

/**
    @function stop() -> void
    @desc stop het spel en verwijder slang en voedsel
*/
function stop() {
    clearInterval(timer);
    snake = null;
    food = null;
    draw();
}

/**
    @function move(direction) -> void
    @desc verander bewegingsrichting slang in aangegeven richting.
    @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
*/
function move(direction) {
    var newHead = snake.createNewHead(direction); // nieuwe positie van kop.

    // test of een stap gemaakt kan worden
    if (collisionWithWall(newHead)) {
        console.log("Snake cannot move " + direction);
        gameOver();
    } else {
      snake.move(newHead);
      if (collisionWithFood(newHead)) {
          sound.play("food");
      } else {
          snake.segments.shift(); //verwijder staart element
          sound.play("move");
      }
      draw();
      // gewonnen als al het eten op is.
      if (food.segments.length === 0) {
          console.log("Snake ate all the food");
          gameWon();
      }
    }

}

/**
    @function draw() -> void
    @desc Teken de slang en het voedsel
*/
function draw() {
    snakeCanvas.area.clearCanvas();

    if (snake) {
        snake.segments.forEach(function (segment) {
            snakeCanvas.drawElement(segment);
        });
    }
    if (food) {
        food.segments.forEach(function (food) {
          snakeCanvas.drawElement(food);
        });
    }
}

/**
    @function collisionWithWall(newHead) -> boolean
    @desc Controleert of de nieuwe kop van de slang binnen het veld blijft
          en of er geen botsing plaats vindt.
    @param {Element} newHead de nieuwe koppositie
    @returns {boolean} de nieuwe koppositie botst met wand (true) of niet (false).
*/
function collisionWithWall(newHead) {

    var collision = false;

    if (newHead != null && newHead.x > snakeCanvas.xmax || newHead.x < snakeCanvas.xmin || newHead.y > snakeCanvas.ymax || newHead.y < snakeCanvas.ymin) {
      console.log("Snake hit a wall");
      collision = true;
    } else if (newHead.isPresent(snake.segments)) {
        console.log("Snake hit himself");
        collision = true;
    }

    return collision;
}

/**
    @function collisionWithFood(newHead) -> boolean
    @desc Controleert of de nieuwe kop van de slang terecht komt op
          een voedselelement.
    @param {Element} newHead de nieuwe koppositie
    @returns {boolean} de nieuwe koppositie botst met voedsel (true) of niet (false).
*/
function collisionWithFood(newHead) {

    var collision = false;

    //controleer op botsing met voedsel
    if (newHead.isPresent(food.segments)) {
        food.remove(newHead.getIndex(food.segments)) //verwijder voedsel
        console.log("munch");
        collision = true;
    }

    return collision;
}
