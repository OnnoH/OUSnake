const R        = 10,          // straal van een element
      STEP     = 2*R,         // stapgrootte
      WIDTH    = 360,         // breedte veld
      HEIGHT   = 360,         // hoogte veld
                              // er moet gelden: WIDTH = HEIGHT
      MAX      = WIDTH/STEP-1,// netto veldbreedte
      LEFT     = "left",      // bewegingsrichtingen
      RIGHT    = "right",
      UP       = "up",
      DOWN     = "down",

      NUMFOODS = 15,          // aantal voedselelementen

      XMIN     = R,           // minimale x waarde
      YMIN     = R,           // minimale y waarde
      XMAX     = WIDTH - R,   // maximale x waarde
      YMAX     = HEIGHT - R,  // maximale y waarde

      SNAKE   = "DarkRed" ,   // kleur van een slangsegment

      FOOD    = "Olive",      // kleur van voedsel
      HEAD    = "DarkOrange"; // kleur van de kop van de slang

var snake,                    // de slang met kop en staart elementen
    foods = [];               // voedsel voor de slang

$(document).ready(function() {
    $("#startSnake").click(init);
    $("#stopSnake").click(stop);
});

/***************************************************************************
 **                 Nieuwe code                                           **
 ***************************************************************************/

/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/
// ? Refactor foods
/***************************************************************************
 **                 Methods                                               **
 ***************************************************************************/

/**
    @function canMove(direction) -> boolean
    @desc Controleert of de beweging de slang in de gegeven direction
          binnen het veld blijft en of er geen botsing plaats vindt.
    @param {string} direction: de richting (const UP, DOWN, LEFT of RIGHT)
    @return: {boolean} true als beweging zonder botsing mogelijk is
*/
Snake.prototype.canMove = function(direction) {
    var canMove = true;

    newHead = this.createNewHead(direction); // nieuw hoofd element ter vergelijking

    // controleer veld randen
    if (newHead.x > XMAX || newHead.x < XMIN || newHead.y > YMAX || newHead.y < YMIN) {
      canMove = false;
    }

    // controleer botsing met staart
    if (newHead.collidesWithOneOf(snake.segments)) {
      console.log("Snake cannot move into itself");
      canMove = false;
    }

    return canMove;
}

/**
    @function doMove(direction) -> void
    @desc Voert de beweging van de slang in de aangegeven richting uit
    @param {string} direction: de richting (const UP, DOWN, LEFT of RIGHT)
    @return: true
*/
Snake.prototype.doMove = function(direction) {
    //voeg nieuw hoofd toe.
    this.head.color = SNAKE;
    newHead = this.createNewHead(direction);
    this.segments.push(newHead);
    this.head = this.segments[this.segments.length-1];

    //controleer op botsing met voedsel
    if (newHead.collidesWithOneOf(foods)) {
        foods.splice(newHead.indexOfColision(foods), 1); //verwijder voedsel
    } else {
        this.segments.shift(); //verwijder staart element
    }
}

/**
    @function createNewHead(direction) -> segment
    @desc Slanghoofdsegment creeren in een bepaalde richting ten opzichten
          van huidige positie.
    @param {string} direction: de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
    @param {number} y: y-coordinaart middelpunt
    @return: {Element} met straal R en color HEAD
*/
Snake.prototype.createNewHead = function(direction) {
    var nx = this.head.x;
    var ny = this.head.y;

    switch(direction) {
        case LEFT:
            nx = nx - STEP;
            break;
        case RIGHT:
            nx = nx + STEP;
            break;
        case UP:
            ny = ny - STEP;
            break;
        case DOWN:
            ny = ny + STEP;
            break;
    }

    return createHead(nx, ny);
}

/**
    @function createHead(x,y) -> Element
    @desc hoofdsegment creeren op een bepaalde plaats
    @param {number} x: x-coordinaat middelpunt
    @param {number} y: y-coordinaart middelpunt
    @return {Element} met straal R en color HEAD
*/
function createHead(x, y) {
    return new Element(R, x, y, HEAD);
}

/**
    @function collidesWithOneOf(elements) -> boolean
    @desc Controleer of gegeven element overlamp met een element in
          het gegeven array.
    @param {[Element]} elements: een array met voedsel of slang elementen.
    @return: {boolean} true als element overlapt met element uit array.
*/
Element.prototype.collidesWithOneOf = function(elements) {
    return this.indexOfCollision(elements) >= 0;
}

/**
    @function indexOfColision(elements) -> integer
    @desc Geef de index van het element uit array elements wat overlapt met het
          gegeven element.
    @param {[Element]} elements: een array met voedsel of slang elementen.
    @return: {integer} index van overlappend element. -1 als geen elemement overlapt.
*/
Element.prototype.indexOfCollision = function(elements) {
    var index = -1;

    for (var i = 0; i < elements.length; ++i) {
        if (elements[i].x === this.x && elements[i].y === this.y) {
            collision = i;
            i = elements.length; //eindig loop als element gevonden is
        }
    }

    return index;
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
    createStartSnake();
    createFoods();
    draw();
}

/**
    @function stop() -> void
    @desc Laat slang en voedsel verdwijnen, en teken leeg veld
*/
function stop() {
    snake = null;
    foods = [];
    draw();
}

/**
    @function move(direction) -> void
    @desc Beweeg slang in aangegeven richting indien toegestaan.
    @param {string} direction: de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
*/
function move(direction) {
    if (snake.canMove(direction)) {
        snake.doMove(direction);
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
    var canvas = $("#mySnakeCanvas").clearCanvas();

    if (snake) {
        snake.segments.forEach(function (segment) {
            drawElement(segment, canvas);
        });
    }
    foods.forEach(function (food) {
        drawElement(food, canvas);
    });
}
/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/
/**
    @constructor Snake
    @param {[Element]} segments: Een array met aaneengesloten slangsegmenten
                    Het laatste element van segments wordt de kop van de slang
*/
function Snake(segments) {
    this.segments = segments;
    this.head = segments[segments.length-1];
    this.head.color = HEAD;
}
/**
    @constructor Element
    @param {number} radius: straal
    @param {number} x: x-coordinaat middelpunt
    @param {number} y: y-coordinaat middelpunt
    @param {string} color: kleur van het element
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
    @return: {Snake} slang volgens specificaties
*/
function createStartSnake() {
    var segments   = [createSegment(R + WIDTH/2, R + WIDTH/2),
                      createSegment(R + WIDTH/2, WIDTH/2 - R)];
    snake = new Snake(segments);
}

/**
    @function createSegment(x,y) -> Element
    @desc Slangsegment creeren op een bepaalde plaats
    @param {number} x: x-coordinaat middelpunt
    @param {number} y: y-coordinaart middelpunt
    @return {Element} Element met straal R en color SNAKE
*/

function createSegment(x, y) {
    return new Element(R, x, y, SNAKE);
}
/**
    @function createFood(x,y) -> Element
    @desc Voedselelement creeren op een bepaalde plaats
    @param {number} x: x-coordinaat middelpunt
    @param {number} y: y-coordinaart middelpunt
    @return: {Element} Element met straal R en color FOOD
*/
function createFood(x, y) {
    return new Element(R, x, y, FOOD);
}

/**
    @function drawElement(element, canvas) -> void
    @desc Een element tekenen
    @param {Element} element: een Element object
    @param {dom object} canvas: het tekenveld
*/
function drawElement(element, canvas) {
    canvas.drawArc({
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
    @param {number} min: een geheel getal als onderste grenswaarde
    @param {number} max: een geheel getal als bovenste grenswaarde (max > min)
    @return {number} een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
    @function createFoods() -> array met food
    @desc array van random verdeelde voedselpartikelen
    @return {[Element]} array met food
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
