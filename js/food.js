/***************************************************************************
 **                 Food                                                  **
 ***************************************************************************/

 /**
    @constructor Food(segments)
    @desc Deze klasse beschrijft het voedsel.
          De constructor maakt voedsel van de gegeven elementen.
    @param {[Element]} segments: De voedsel segmenten
*/
function Food(segments) {
    // prive constanten
    const FOOD     = "Olive";      // kleur van voedsel

    // prive attributen
    var segments = segments;

    // zet de kleur van het voedsel.
    for (i = 0; i < segments.length; i++) {
        segments[i].color = FOOD;
    }

    /***********************************************************************
     **             Publieke attibuten                                    **
     ***********************************************************************/
    var food = {
        addFood: function(x, y) {
            addFood(x, y)
        },
        remaining: function() {
            return segments.length
        },
        getSegments: function() {
            return segments;
        },
        eatFood: function(radius, x, y) {
            return eatFood(radius, x, y)
        }
    }

    var eatFood = function(x, y) {
        var index = indexOf(segments, x, y);
        var result = false;

        if (index >= 0) {
            segments.splice(index, 1);
            result = true;
        }
        return result;
    }

    var addFood = function(radius, x, y) {
        if (indexOf(segments, x, y) == -1) {
            segments.push(createNewFood(radius, x, y))
        }
    }

    /***********************************************************************
     **             Prive Methodes                                        **
     ***********************************************************************/

    /**
    @function createNewFood(radius,x,y) -> segment
    @desc maak een nieuw Slangenhoofdsegment op de gegeven coordinaten.
    @param {number} radius: the size of the food
    @param {number} x: een x coordinaat
    @param {number} y: een y coordinaat
    @returns {Element} met straal R en color FOOD
    */
    createNewFood = function(radius, x, y) {
        return new Element(radius, x, y, FOOD);
    }

    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/

    return food
}
