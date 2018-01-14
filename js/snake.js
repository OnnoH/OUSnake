const R        = 10           // straal van een element
,     STEP     = 2*R,         // stapgrootte
      LEFT     = "left",      // bewegingsrichtingen
      RIGHT    = "right",
      UP       = "up",
      DOWN     = "down",

      NUMFOODS = 5,           // aantal voedselelementen
      
      SLEEPTIME = 500         // snelheid van spel (ms per stap)

      XMIN     = R,           // minimale x waarde
      YMIN     = R,           // minimale y waarde  
      
      SNAKE   = "DarkRed" ,   // kleur van een slangsegment
      FOOD    = "Olive",      // kleur van voedsel
      HEAD    = "DarkOrange"; // kleur van de kop van de slang
      
var snakeCanvas,              // het speelveld
    snake,                    // de slang met kop en staart elementen
    foods = [];               // voedsel voor de slang  

var HEIGHT, WIDTH, MAX, XMAX, YMAX, MAX; // canvas variable

var PLAY_SOUNDS = false;
var audio = {};
var timer;

$(document).ready(function() {
    $("#startSnake").click(start);
    $("#stopSnake").click(stop);
    $('#toggleSound').click(toggleSound);
});

/***************************************************************************
 **                 Snake Constructors                                     **
 ***************************************************************************/
 
 /**
    @constructor Snake
    @param {Element} segments Een array met aaneengesloten slangsegmenten
                    Het laatste element van segments wordt de kop van de slang
*/
function Snake(segments) {
    this.segments = segments;                   // aantal segmenten van de slang
    this.head = segments[segments.length-1];    // kop segment
    this.head.color = HEAD;
    this.direction = UP;                        // beweegrichting
}

/***************************************************************************
 **                 Snake Methods                                         **
 ***************************************************************************/

/**
    @function canMove(direction) -> Element
    @desc Controleert of de beweging de slang in de gegeven direction
          binnen het veld blijft en of er geen botsing plaats vindt.
    @param {string} direction de richting (const UP, DOWN, LEFT of RIGHT)
    @returns {Element} de nieuwe koppositie of null in geval van botsing.
*/
Snake.prototype.canMove = function(direction) {
    var newHead = this.createNewHead(direction); // nieuw hoofd element ter vergelijking
    
    if (newHead != null && newHead.x > XMAX || newHead.x < XMIN || newHead.y > YMAX || newHead.y < YMIN) {
      console.log("Snake hit a wall");
      newHead = null;
    } else if (newHead.collidesWithOneOf(snake.segments)) { 
        console.log("Snake hit himself");
        newHead = null;
    } 
    
    return newHead;
}

/**
    @function doMove(newHead) -> void
    @desc Voert de beweging van de slang in de aangegeven richting uit
    @param {element} newHead het nieuwe kopelement
*/
Snake.prototype.doMove = function(newHead) {
    //voeg nieuw hoofd toe.
    this.head.color = SNAKE;
    this.segments.push(newHead);
    this.head = this.segments[this.segments.length-1];

    //controleer op botsing met voedsel
    if (newHead.collidesWithOneOf(foods)) {
        foods.splice(newHead.indexOfCollision(foods), 1); //verwijder voedsel
        playSound("food");
    } else {
        this.segments.shift(); //verwijder staart element
        playSound("move");
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

/***************************************************************************
 **                 Snake Hulpfuncties                                    **
 ***************************************************************************/

/**
    @function createHead(x,y) -> Element
    @desc hoofdsegment creeren op een bepaalde plaats
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaat middelpunt
    @returns {Element} met straal R en color HEAD
*/
function createHead(x, y) {
    return new Element(R, x, y, HEAD);
}

/***************************************************************************
 **                 Element Constructor                                   **
 ***************************************************************************/
 
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
 **                 Element Methods                                       **
 ***************************************************************************/

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
    var index = -1; //index where result is stored
    var i = 0;      //iteration counter
    
    while (i < elements.length) {
        if (elements[i].x === this.x && elements[i].y === this.y) {
            index = i;
            i = elements.length;
        }
        i++;
    }

    return index;
}

/***************************************************************************
 **                 Game                                                  **
 ***************************************************************************/

/**
    @function start() -> void
    @desc initializeer het spel in start positie en begin met spelen.
*/
function start() {
    init(); // todo: enkel uitvieren indien nodig
    
    // reset game
    createStartSnake();
    createFoods();
    draw();
    
    // reset timer
    clearInterval(timer);
    
    // begin spel
    timer = setInterval(function() {
        move(snake.direction);
    }, SLEEPTIME);
}

/**
    @function init() -> void
    @desc Bepaal de afmetingen, creeer de geluidenverzameling, een slang, genereer voedsel, en teken alles
*/
function init() {
    getCanvasProperties();
    addSounds();
}

/**
    @function stop() -> void
    @desc stop het spel en verwijder slang en voedsel
*/
function stop() {
    clearInterval(timer);
    snake = null;
    foods = [];
    draw();
}

/**
    @function move(direction) -> void
    @desc verander bewegingsrichting slang in aangegeven richting.
    @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
*/
function move(direction) {
    var newHead; // nieuwe positie van kop.

    // test of een stap gemaakt kan worden
    newHead = snake.canMove(direction);
    
    // maak een stap indien mogelijk.
    if (newHead !== null) {
        snake.doMove(newHead);
        draw();
    }
    
    // game over als stap niet mogelijk is.
    if (newHead == null) {
        console.log("snake cannot move " + direction);
        gameOver();
    }
    
    // gewonnen als al het eten op is.
    if (foods.length === 0) {
        console.log("snake ate all the food");
        gameWon();
    }
}

/***************************************************************************
 **                 Game Hulpfuncties                                     **
 ***************************************************************************/
 
/**
    @function gameOver() -> void
    @desc het spel is uit met audio/video/log
*/
function gameOver() {
    drawText("Game Over!", "OrangeRed");
    playSound("looser");
    console.log("VERLOREN!!!");
    clearInterval(timer);
}

/**
    @function gameWon() -> void
    @desc het spel is gewonnen met audio/video/log
*/
function gameWon() {
    drawText("Well Done!", "LawnGreen");
    playSound("winner");
    console.log("GEWONNEN!!!");
    clearInterval(timer);
}

/***************************************************************************
 **                 Game Canvas                                           **
 ***************************************************************************/

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
    @function drawText(text,color) -> void
    @desc drukt gegeven tekst af op het canvas in de gegeven kleur
    @param {string} text de tekst
    @param {string} color de kleur
*/
function drawText(text, color) {
    var ctx = snakeCanvas[0].getContext("2d");
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, WIDTH/2, HEIGHT/2);
}

/**
    @function getCanvasProperties() -> void
    @desc vult de afmetingen op basis van het canvas
*/
function getCanvasProperties() {
  snakeCanvas = $("#mySnakeCanvas");
  
  HEIGHT = snakeCanvas[0].height;
  WIDTH = snakeCanvas[0].width;
  
  // er moet gelden: WIDTH = HEIGHT
  MAX = WIDTH/STEP-1; // netto veldbreedte
  XMAX = WIDTH - R;   // maximale x waarde
  YMAX = HEIGHT - R;  // maximale y waarde
}

/***************************************************************************
 **                 Game Sound                                            **
 ***************************************************************************/

/**
    @function playSound(sound) -> void
    @desc speelt het opgegeven geluid af (mits de gebruiker
          dit op prijs stelt)
    @param {string} sound het geluid
*/
function playSound(sound) {
    if (PLAY_SOUNDS) {
        audio[sound].play();
    }
}

/**
    @function addSound(sound) -> void
    @desc voegt het geluid toe aan de verzameling
    @param {string} sound het geluid
*/
function addSound(sound) {
    audio[sound] = new Audio();
    audio[sound].src = "snd/"+sound+".wav"; //todo: vervang dit formaat met consts
}

/**
    @function toggleSound() -> void
    @desc zet het afspelen van het geluid aan of uit
*/
function toggleSound() {
    PLAY_SOUNDS = !PLAY_SOUNDS;
    
    if (PLAY_SOUNDS) {
        $("#toggleSound").html('<i class="fa fa-volume-up"></i>'); //todo: vervang voor const
    } else {
        $("#toggleSound").html('<i class="fa fa-volume-off"></i>');//todo: vervang voor const
    }
}

/**
    @function addSounds() -> void
    @desc maak de geluidenverzameling
*/
function addSounds() {
  // definieer geluiden
  addSound("move");
  addSound("food");
  addSound("winner");
  addSound("looser");
}

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
