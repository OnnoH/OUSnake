const R        = 10   // straal van een element
,     STEP     = 2*R,         // stapgrootte
      LEFT     = "left",      // bewegingsrichtingen
      RIGHT    = "right",
      UP       = "up",
      DOWN     = "down",

      NUMFOODS = 5,           // aantal voedselelementen

      XMIN     = R,           // minimale x waarde
      YMIN     = R,           // minimale y waarde

      SNAKE   = "DarkRed" ,   // kleur van een slangsegment
      SLEEPTIME = 500,

      FOOD    = "Olive",      // kleur van voedsel
      HEAD    = "DarkOrange"; // kleur van de kop van de slang

var snakeCanvas,              // het speelveld
    snake,                    // de slang met kop en staart elementen
    foods = [];               // voedsel voor de slang
var HEIGHT, WIDTH, MAX, XMAX, YMAX, MAX
var snakeDirection = UP;

$(document).ready(function() {
    $("#startSnake").click(start);
    $("#stopSnake").click(stop);
});

/***************************************************************************
 **                 Nieuwe code                                           **
 ***************************************************************************/

/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/

/***************************************************************************
 **                 Methods                                               **
 ***************************************************************************/

/**
    @function canMove(direction) -> Element
    @desc Controleert of de beweging de slang in de gegeven direction
          binnen het veld blijft en of er geen botsing plaats vindt.
    @param {string} direction de richting (const UP, DOWN, LEFT of RIGHT)
    @returns {Element} de nieuwe koppositie
*/
Snake.prototype.canMove = function(direction) {
    var newHead = this.createNewHead(direction); // nieuw hoofd element ter vergelijking

    // controleer veld randen
    if (newHead.x > XMAX || newHead.x < XMIN || newHead.y > YMAX || newHead.y < YMIN) {
      newHead = null;
    }

    // controleer botsing met staart
    if (newHead.collidesWithOneOf(snake.segments)) {
      console.log("Snake cannot move into itself");
      newHead = null;
    }

    return newHead;
}

/**
    @function doMove(direction,newHead) -> void
    @desc Voert de beweging van de slang in de aangegeven richting uit
    @param {string} direction de richting (const UP, DOWN, LEFT of RIGHT)
*/
Snake.prototype.doMove = function(direction, newHead) {
    //voeg nieuw hoofd toe.
    this.head.color = SNAKE;
    this.segments.push(newHead);
    this.head = this.segments[this.segments.length-1];

    //controleer op botsing met voedsel
    if (newHead.collidesWithOneOf(foods)) {
        foods.splice(newHead.indexOfCollision(foods), 1); //verwijder voedsel
    } else {
        this.segments.shift(); //verwijder staart element
    }
}

/**
    @function createNewHead(direction) -> segment
    @desc Slanghoofdsegment creeren in een bepaalde richting ten opzichten
          van huidige positie.
    @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
    @returns {Element} met straal R en color HEAD
*/
Snake.prototype.createNewHead = function(direction) {
    var x = this.head.x;
    var y = this.head.y;

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

    return createHead(x, y);
}

/**
    @function createHead(x,y) -> Element
    @desc hoofdsegment creeren op een bepaalde plaats
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaart middelpunt
    @returns {Element} met straal R en color HEAD
*/
function createHead(x, y) {
    return new Element(R, x, y, HEAD);
}

/**
    @function collidesWithOneOf(elements) -> boolean
    @desc Controleer of gegeven element overlamp met een element in
          het gegeven array.
    @param {Element} elements een array met voedsel of slang elementen.
    @returns {boolean} true als element overlapt met element uit array.
*/
Element.prototype.collidesWithOneOf = function(elements) {
    return this.indexOfCollision(elements) >= 0;
}

/**
    @function indexOfCollision(elements) -> integer
    @desc Geef de index van het element uit array elements wat overlapt met het
          gegeven element.
    @param {Element} elements een array met voedsel of slang elementen.
    @returns {integer} index van overlappend element. -1 als geen elemement overlapt.
*/
Element.prototype.indexOfCollision = function(elements) {
    var index = -1;
    var found = false;
    var i = 0;
    //
    while (i < elements.length && !found) {
        if (elements[i].x === this.x && elements[i].y === this.y) {
            found = true;
            index = i;
        }
        i++;
    }

    return index;
}

function start() {
    init();

    timer = setInterval(function() {
        move(snakeDirection);
    }, SLEEPTIME);
}
/***************************************************************************
 **                 Gegeven code                                          **
 ***************************************************************************/

/***************************************************************************
 **                 Commando's voor de gebruiker                          **
 ***************************************************************************/
/**
    @function init() -> void
    @desc Creeer een slang, genereer voedsel, en teken alles
*/
function init() {
    snakeCanvas = $("#mySnakeCanvas");
    HEIGHT = snakeCanvas[0].height;
    WIDTH = snakeCanvas[0].width;
    // er moet gelden: WIDTH = HEIGHT
    MAX = WIDTH/STEP-1; // netto veldbreedte
    XMAX = WIDTH - R;   // maximale x waarde
    YMAX = HEIGHT - R;  // maximale y waarde
    createStartSnake();
    createFoods();
    draw();
}

/**
    @function stop() -> void
    @desc Laat slang en voedsel verdwijnen, en teken leeg veld
*/
function stop() {
    clearInterval(timer);
    snake = null;
    foods = [];
    draw();
}

/**
    @function move(direction) -> void
    @desc Beweeg slang in aangegeven richting indien toegestaan.
    @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
*/
function move(direction) {
    jQuery(document).keydown(function (e) {
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
        snakeDirection = direction;
    });

    var newHead = snake.canMove(direction);
    if (newHead !== null) {
        snake.doMove(direction, newHead);
        draw();
    }
    else {
        console.log("snake cannot move " + direction);
    }
}

/**
    @function draw() -> void
    @desc Teken de slang en het voedsel
*/
function draw() {
    snakeCanvas.clearCanvas();

    if (snake) {
        snake.segments.forEach(function (segment) {
            drawElement(segment, snakeCanvas);
        });
    }
    foods.forEach(function (food) {
        drawElement(food, snakeCanvas);
    });
}
/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/
/**
    @constructor Snake
    @param {Element} segments Een array met aaneengesloten slangsegmenten
                    Het laatste element van segments wordt de kop van de slang
*/
function Snake(segments) {
    this.segments = segments;
    this.head = segments[segments.length-1];
    this.head.color = HEAD;
}
/**
    @constructor Element
    @param {number} radius straal
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaat middelpunt
    @param {string} color kleur van het element
*/
function Element(radius, x, y, color) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
}
/***************************************************************************
 **                 Hulpfuncties                                          **
 ***************************************************************************/

/**
    @function createStartSnake() -> Snake
    @desc Slang creëren, bestaande uit  twee segmenten,
          in het midden van het veld
    @returns {Snake} slang volgens specificaties
*/
function createStartSnake() {
    var segments   = [createSegment(R + WIDTH/2, R + WIDTH/2),
                      createSegment(R + WIDTH/2, WIDTH/2 - R)];
    snake = new Snake(segments);
}

/**
    @function createSegment(x,y) -> Element
    @desc Slangsegment creeren op een bepaalde plaats
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaart middelpunt
    @returns {Element} Element met straal R en color SNAKE
*/

function createSegment(x, y) {
    return new Element(R, x, y, SNAKE);
}
/**
    @function createFood(x,y) -> Element
    @desc Voedselelement creeren op een bepaalde plaats
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaart middelpunt
    @returns {Element} Element met straal R en color FOOD
*/
function createFood(x, y) {
    return new Element(R, x, y, FOOD);
}

/**
    @function drawElement(element,snakeCanvas) -> void
    @desc Een element tekenen
    @param {Element} element een Element object
    @param {Canvas} snakeCanvas het tekenveld
*/
function drawElement(element, snakeCanvas) {
    snakeCanvas.drawArc({
        draggable : false,
        fillStyle : element.color,
        x : element.x,
        y : element.y,
        radius : element.radius
    });
}

/**
    @function getRandomInt(min: number, max: number) -> number
    @desc Creeren van random geheel getal in het interval [min, max]
    @param {number} min een geheel getal als onderste grenswaarde
    @param {number} max een geheel getal als bovenste grenswaarde (max > min)
    @returns {number} een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
    @function createFoods() -> array met food
    @desc array van random verdeelde voedselpartikelen
    @returns {Element} array met food
*/
function createFoods() {
    var  i,
        food;
    foods = [];
    i = 0;
    while (i < NUMFOODS ) {
        food = createFood(XMIN + getRandomInt(0, MAX)*STEP, YMIN + getRandomInt(0, MAX)*STEP);
        if (!food.collidesWithOneOf(snake.segments) && !food.collidesWithOneOf(foods) ) {
            foods.push(food);
            i++
        }
    }
}


/***************************************************************************
 **                 Testfuncties                                          **
 ***************************************************************************/
 /**
     @function testAll() -> void
     @desc test de setup en de snakeCanvas grenzen
 */
function testAll(){
    console.log("testSetup : " + (testSetup() ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(LEFT) ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(UP) ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(RIGHT) ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(DOWN) ? "OK" : "FAILED"));

}

/**
    @function testSetup() -> boolean
    @desc test 1: test de initiele setup.
                  verwachte uitkomst:
                    snake van lengte 2
                    food
    @returns {boolean} test voldoet aan verwachting
*/
function testSetup() {
    result = true;

    //setup
    init();

    //execute scenario

    //verify
    result = result && verifySnake();
    result = result && verifyFood();

    console.log("Test Setup: " + result.toString());

    return result;
}

/**
    @function testBounds() -> boolean
    @desc test 2: test beweging in gegeven richting over een leeg veld.
                  verwachte uitkomst:
                    snake van lengte 2 blijft binnen het veld
    @param {string} direction de richting (const UP, DOWN, LEFT of RIGHT)
    @returns {boolean} test voldoet aan verwachting
*/
function testBounds(direction) {
    result = true;

    //setup
    init();
    foods = [];

    //execute scenario
    if (direction == DOWN) {
        move(RIGHT);
    }
    for (var i = 0; i < (WIDTH/R + 3); i++) {
        move(direction);
    }

    //verify
    result = result && verifySnake();
    result = result && verifyFood();

    console.log("Test Bounds " + direction + ": " + result.toString());

    return result;
}

/**
    @function verifySnake() -> boolean
    @desc verifeer of de snake valide is
    @returns {boolean} snake is valide
*/
function verifySnake() {
    result = true;

    //verify snake type
    if (typeof snake !== "object") {
        result = false;
        console.log("invalid snake: " + typeof snake);
    }

    //verify length
    if (snake.segments.length < 2) {
        result = false;
        console.log("invalid snake length");
    }

    //verify head existence
    if (typeof snake.head !== "object") {
        result = false;
        console.log("invalid snake head");
    }

    //verify head color
    if (snake.segments[snake.segments.length-1].color != HEAD) {
        result = false;
        console.log("invalid snake head color");
    }

    //verify body color
    for (var i = 0; i < snake.segments.length -1; ++i) {
        if (snake.segments[i].color != SNAKE) {
            result = false;
            console.log("invalid snake body color");
        }
    }

    //verify radius
    for (var i = 0; i < snake.segments.length; ++i) {
        if (snake.segments[i].radius != R) {
            result = false;
            console.log("invalid snake segment radius");
        }
    }

    //ToDo: Verify if snake is connected
    //ToDo: Verify is snake is within bounds
    //ToDo: Verify is there are no collisions.

    return result;
}

/**
    @function verifyFood() -> boolean
    @desc verifeer of de voedsel array is
    @returns {boolean} foods is valide
*/
function verifyFood() {
    result = true;

    for (var i = 0; i < foods.length; ++i) {
        if (foods[i].color != FOOD) {
            result = false;
        }
    }

    //ToDo: Verify is food is within bounds
    //ToDo: Verify is there are no collisions.

    return result;
}
