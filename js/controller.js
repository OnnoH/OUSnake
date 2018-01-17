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
 **                 Controller API                                        **
 ***************************************************************************/

/*
var snakeGame = (function () {
    return {
        UP: UP,
        DOWN: DOWN,
        RIGHT: RIGHT,
        LEFT: LEFT,
        getSegments: getSegments,
        getFoods: getFoods,
        getElements: getElements,
        setDirection: setDirection,
        canMove: canMove,
        doMove: function() {
            snake.doMove();
        },
        createStartSnake: createStartSnake,
        createFoods: createFoods,
        clear: function() {
            snake = null;
            foods = [];
        },
        setValues: function(newWidth, newHeight, newr) {
            width = newWidth;
            height = newHeight;
            r = newr;
            step = 2 * r;
            max = width/step-1;
            xMin = r;
            yMin = r;
            xMax = width - r;
            yMax = height - r;
        }
    }
    
    var canMove = function () {
        return snake.canMove();
    }
}*/

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
            snake.setDirection(LEFT);
            console.log("left");
            break;
        case 38: // up
            snake.setDirection(UP);
            console.log("up");
            break;
        case 39: // right
            snake.setDirection(RIGHT);
            console.log("right");
            break;
        case 40: // down
            snake.setDirection(DOWN);
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
        if (!newFood.isPresent(snake.getSegments()) && !newFood.isPresent(food.segments) ) {
            food.add(newFood);
            i++;
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
    
    console.log(snake);
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
        move(snake.getDirection());
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

/**
    @function move(direction) -> void
    @desc verander bewegingsrichting slang in aangegeven richting.
    @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
*/
function move(direction) {
    console.log("move " + direction);
    
    // test of een stap gemaakt kan worden
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
    
    if (canMove(x, y)) {
        if (collisionWithFood(x, y)) {
            sound.play("food");
            snake.move(true);
            if (food.segments.length === 0) {
                console.log("Snake ate all the food");
                gameWon();
            }
        } else {
            sound.play("move");
            snake.move(false);
        }
        

    } else {
        gameOver();
    }
    
    draw();
}

/**
    @function draw() -> void
    @desc Teken de slang en het voedsel
*/
function draw() {
    snakeCanvas.area.clearCanvas();

    if (snake) {
        snake.getSegments().forEach(function (segment) {
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

/**
    @function collisisonWithFood(x, y) -> boolean
    @desc Controleert of er voedsel ligt op de gegeven positie. 
          zo ja, eet de slang het voedsel op. 
    @param {number} x: x-coordinaat van nieuwe positie. 
    @param {number} y: y-coordinaat van nieuwe positie. 
    @returns {boolean} er lag voedsel op de nieuwe positie (true) of niet (false).
*/
function collisionWithFood(x, y) {
    var result = false;

    //controleer op botsing met voedsel
    while (i < food.length) {
        if (food[i].x === x && food[i].y === y) { 
            // voedsel gevonden. Eet het op.
            console.log("munch");
            food.remove(i); 
            // eindig loop.
            i = food.length;
            result = true;
        }
        i++;
    }
    
    return result;
}
