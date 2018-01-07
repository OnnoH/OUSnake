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
      FOOD    = "Olive",       // kleur van voedsel
	    HEAD    = "DarkOrange"   // kleur van de kop van de slang

var snake,
    foods = [];                                // voedsel voor de slang

$(document).ready(function() {
	$("#startSnake").click(init);
	$("#stopSnake").click(stop);
});

/*************************************************************************************************
 **                                    Nieuwe code                                              **
 *************************************************************************************************/
/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/
// ? Refactor foods
/***************************************************************************
 **                 Methods                                               **
 ***************************************************************************/
 /**
   @function collidesWithOneOf(elements) -> boolean
   @desc  Controleert of de x- and y-coordinaten van het object
          aanwezig zijn in het gegeven Element's array. Geeft true
          terug indien dit zo is, anders false.
          Om het proces enigzins te versnellen wordt de lus vroegtijdig
          onderbroken wanneer er een overeenkomst is gevonden.
   @param Array met Element objects d.w.z. foods of snake.segments
   @return boolean   true (x,y positie reeds gevuld) of false (positie leeg)
  */
 Element.prototype.collidesWithOneOf = function(elements) {
      var collision = false;

      for (var i = 0; i < elements.length; ++i) {
        if (elements[i].x === this.x && elements[i].y === this.y) {
         collision = true;
         i = elements.length;
        }
      }

      return collision;
  }

  /**
    @function canMove(direction) -> boolean
    @desc Controleert of de slang zich in de opgegeven richting mag begeven.
          Aandachtspunt: methode zou ook het nieuwe segment kunnen retourneren
          waardoor de doMove methode de nieuwe koppositie niet nogmaals hoeft
          te bepalen.
    @param String direction   UP, DOWN, LEFT, RIGHT
    @return boolean           true (beweging mogelijk) of false (beweging buiten
                              het canvas of in zichzelf)
   */
  Snake.prototype.canMove = function(direction) {
    var canMove = true;
    newHead = this.createNewHead(direction);
    if (newHead.x > XMAX || newHead.x < XMIN || newHead.y > YMAX || newHead.y < YMIN) {
      canMove = false;
    };
    if (newHead.collidesWithOneOf(this.segments)) {
      canMove = false;
    }

    return canMove;
  }

  /**
    @function doMove(direction) -> void
    @desc Voert de beweging van de slang in de aangegeven richting uit.
          Aandachtspunt: in plaats van een richting zou deze methode het
          segment van de nieuwe koppositie Webapplications parameter kunnen krijgen.
    @param String direction UP, DOWN, LEFT, RIGHT
   */
  Snake.prototype.doMove = function(direction) {
    newHead = this.createNewHead(direction);
    this.head.color = SNAKE; // Maak van huidige kop een lijf
    this.segments.push(newHead); // Voeg de nieuwe kop toe
    if (!newHead.collidesWithOneOf(foods)) {
        this.segments.shift(); // Geen voedsel dus staart verwijderen
    } else {
      eatFood(newHead); // Voedsel uit het array verwijderen
    }
    // Bepaal nieuwe koppositie
    this.head = this.segments[this.segments.length-1];
    this.head.color = HEAD;

  }

  /**
    @function createNewHead -> Element
    @desc Bepaalt de nieuwe locatie van de slangenkop
          op basis van de opgegeven richting
    @param  String direction de richting
    @return Element          het nieuwe segment
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

     return createSegment(x, y);

  }

/***************************************************************************
 **                 Hulpfuncties                                          **
 ***************************************************************************/

/**
  @function eatFood -> void
  @desc Verwijdert het opgegeven Element uit het voedsel array.
  @param  Element food het opgegeten voedsel
 */
function eatFood(food) {
  for (var i = 0; i < foods.length; ++i) {
    if (foods[i].x === food.x && foods[i].y === food.y) {
     foods.splice(i, 1);
     i = foods.length;
    }
  }
}
/*************************************************************************************************
 **                                    Gegeven code                                              **
 *************************************************************************************************/
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
  @desc Beweeg slang in aangegeven richting
        tenzij slang uit canvas zou verdwijnen
  @param   direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
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
   @param segments een array met aaneengesloten slangsegmenten
                   Het laatste element van segments wordt de kop van de slang
*/
function Snake(segments) {
	this.segments = segments;
	this.head = segments[segments.length-1];
	this.head.color = HEAD;
}
/**
   @constructor Element
   @param radius straal
   @param x x-coordinaat middelpunt
   @param y y-coordinaat middelpunt
   @param color kleur van het element
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
  @return: slang volgens specificaties
*/
function createStartSnake() {
	var segments   = [createSegment(R + WIDTH/2, R + WIDTH/2),
	                  createSegment(R + WIDTH/2, WIDTH/2 - R)];
    snake = new Snake(segments);
}
/**
  @function createSegment(x,y) -> Element
  @desc Slangsegment creeren op een bepaalde plaats
  @param x x-coordinaat middelpunt
  @param y y-coordinaart middelpunt
  @return: Element met straal R en color SNAKE
*/
function createSegment(x, y) {
	return new Element(R, x, y, SNAKE);
}
/**
  @function createFood(x,y) -> Element
  @desc Voedselelement creeren op een bepaalde plaats
  @param x x-coordinaat middelpunt
  @param y y-coordinaart middelpunt
  @return: Element met straal R en color FOOD
*/
function createFood(x, y) {
	return new Element(R, x, y, FOOD);
}
/**
  @function drawElement(element, canvas) -> void
  @desc Een element tekenen
  @param element een Element object
  @param  canvas het tekenveld
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
  @param min een geheel getal als onderste grenswaarde
  @param max een geheel getal als bovenste grenswaarde (max > min)
  @return een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
  @function createFoods() -> array met food
  @desc array van random verdeelde voedselpartikelen
  @return array met food
*/
function createFoods() {
   var  i,
        food;
   i = 0;
   while (i < NUMFOODS ) {
     food = createFood(XMIN + getRandomInt(0, MAX)*STEP, YMIN + getRandomInt(0, MAX)*STEP);
     if (!food.collidesWithOneOf(snake.segments) && !food.collidesWithOneOf(foods) ) {
       foods.push(food);
       i++
     }
   }
}
