const SNAKE   = "DarkRed";    // kleur van een slangsegment
const HEAD    = "DarkOrange"; // kleur van de kop van de slang

/***************************************************************************
 **                 Snake Constructor                                     **
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
    @function doMove(newHead) -> void
    @desc Voert de beweging van de slang in de aangegeven richting uit
    @param {element} newHead het nieuwe kopelement
*/
Snake.prototype.move = function(newHead) {
    //voeg nieuw hoofd toe.
    this.head.color = SNAKE;
    this.segments.push(newHead);
    this.head = this.segments[this.segments.length-1];
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

    return this.createHead(x, y);
}

/**
    @function createHead(x,y) -> Element
    @desc hoofdsegment creeren op een bepaalde plaats
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaat middelpunt
    @returns {Element} met straal R en color HEAD
*/
Snake.prototype.createHead =function(x, y) {
    return new Element(R, x, y, HEAD);
}


/**
    @function createBodyPart(x,y) -> Element
    @desc Slangsegment creeren op een bepaalde plaats
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaart middelpunt
    @returns {Element} Element met straal R en color SNAKE
*/

/***************************************************************************
 **                 Snake Hulpfuncties                                    **
 ***************************************************************************/

function createBodyPart(x, y) {
    return new Element(R, x, y, SNAKE);
}
