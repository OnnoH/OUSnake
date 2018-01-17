/***************************************************************************
 **                 Snake                                                 **
 ***************************************************************************/

/**
    @constructor Snake(segments)
    @desc deze klasse beschrijft de slang. De constructor versi creeren in een 
          bepaalde richting ten opzichten van huidige positie.
    @param {[Element]} segments: de segmenten van de slang. Het laatste segment
                       is het hoofd. 
*/
function Snake(segments) {
    // prive constanten
    const SNAKE   = "DarkRed";    // kleur van een slangsegment
    const HEAD    = "DarkOrange"; // kleur van de kop van de slang
    
    // prive attributen
    var segments = segments;     // segmenten van de slang
    var direction = UP;          // bewegingsrichting
    var head = segments[segments.length-1];  // hoofd segment
    
    // zet de kleur van de slang
    head.color = HEAD;
    for (i = 0; i < segments.length - 1; i++) {
        segments[i].color = SNAKE;
    }
    
   
    /***************************************************************************
     **             Publieke attibuten                                        **
     ***************************************************************************/
    var snake = {
        getHead: function() {
            return head;
        },
        getSegments: function () {
            return segments;
        },
        getDirection: function () {
            return direction;
        },
        setDirection: function (d) {
            direction = d;
        },
        move: function(grow) {
            move(grow)
        },
        collision: function(x, y) {
            collision(x, y)
        }
    };
    

  
    /***************************************************************************
     **             Methodes                                                  **
     ***************************************************************************/
        
    /**
        @function Move(grow) -> void
        @desc Voert een beweging uit in de huidige bewegingsrichting. 
        @param {boolean} grow: geeft aan of de slang 1 segment groeit als 
                               resultaatvan de beweging. 
    */
    var move = function (grow) {
        // verander de kleur van het huidige hoofd in snake
        head.color = SNAKE;       
        // voeg een nieuw hoofd toe
        segments.push(createNewHead());
        // update head attribuut
        head = segments[segments.length-1];
        // verwijder staart als de slang niet groeit.
        if (!grow) {
            segments.shift();
        }
    }
    
    var collision = function (x, y) {
        var i = 0; // iterator
        var result = false; // resultaat
        
        while (i < segments.length) {
            if (segments[i].x === x && segments[i].y === y) {
                result = true;
                i = segments.length;
            }
            i++;
        }
        return result;
    }
    
    /***************************************************************************
     **             Prive Methodes                                            **
     ***************************************************************************/
    
    /**
    @function createNewHead() -> segment
    @desc maak een nieuw Slangenhoofdsegment aan in de bewegingsrichting ten 
          opzichten van huidige hoofdpositie.
    @returns {Element} met straal R en color HEAD
    */
    createNewHead = function() {
        var x = head.x;
        var y = head.y;

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

        return new Element(R, x, y, HEAD);
    }
    
    /***************************************************************************
     **             Return                                                    **
     ***************************************************************************/
     
    return snake
}