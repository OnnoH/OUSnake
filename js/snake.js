/***************************************************************************
 **                 Snake                                                 **
 ***************************************************************************/

/**
    @constructor Snake(segments)
    @desc Deze klasse beschrijft de slang.
          De constructor maakt een slang uit de gegeven elementen.
    @param {[Element]} segments: De segmenten van de slang.
                                 Het laatste segment is het hoofd.
*/
function Snake(segments) {
    // prive constanten
    const SNAKE   = "DarkRed";    // kleur van een slangsegment
    const HEAD    = "DarkOrange"; // kleur van de kop van de slang

    // prive attributen
    var segments = segments;     // segmenten van de slang
    var head = segments[segments.length-1];  // hoofd segment

    // zet de kleur van de slang
    head.color = HEAD;
    for (i = 0; i < segments.length - 1; i++) {
        segments[i].color = SNAKE;
    }


    /***********************************************************************
     **             Publieke attibuten                                    **
     ***********************************************************************/
    var snake = {
        getHead: function() {
            return head;
        },
        getSegments: function () {
            return segments;
        },
        move: function(x, y, grow) {
            move(x, y, grow);
        },
        collision: function(x, y) {
            return collision(x, y);
        }
    };

    /***********************************************************************
     **             Methodes                                              **
     ***********************************************************************/

    /**
        @function move(x,y,grow) -> void
        @desc Voert een beweging uit in de huidige bewegingsrichting.
        @param {number} x x-coordinaat
        @param {number} y y-coordinaat
        @param {boolean} grow: geeft aan of de slang 1 segment groeit als
                               resultaatvan de beweging.
    */
    var move = function (x, y, grow) {
        // verander de kleur van het huidige hoofd in snake
        head.color = SNAKE;
        // voeg een nieuw hoofd toe
        segments.push(createNewHead(x, y));
        // update head attribuut
        head = segments[segments.length-1];
        // verwijder staart als de slang niet groeit.
        if (!grow) {
            segments.shift();
        }
    }

    /**
        @function colission(x,y) -> boolean
        @desc Controleert of de x- en y-coordinaten al 'bezet' zijn
        @param {number} x x-coordinaat
        @param {number} y y-coordinaat
        @returns {boolean} de slang botst met zichzelf (true) of niet (false)
    */
    var collision = function (x, y) {
        return indexOf(segments, x, y) >= 0;
    }

    /***********************************************************************
     **             Prive Methodes                                        **
     ***********************************************************************/

    /**
    @function createNewHead(x, y) -> segment
    @desc maak een nieuw Slangenhoofdsegment op de gegeven coordinaten.
    @param {number} x: een x coordinaat
    @param {number} y: een y coordinaat
    @returns {Element} met straal R en color HEAD
    */
    createNewHead = function(x, y) {
        return new Element(R, x, y, HEAD);
    }

    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/

    return snake
}
