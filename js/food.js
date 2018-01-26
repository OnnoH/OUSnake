/***************************************************************************
 **                 Food                                                  **
 ***************************************************************************/

 /**
    @constructor Food(radius)
    @desc Deze klasse beschrijft het voedsel.
          De constructor maakt een nieuw object waar voedsel toegevoegd 
          of verwijdert kan worden. 
    @param {radius} radius: De straal van voedsel segmenten
*/
function Food(radius) {
    // prive constanten
    const _FOOD     = "Olive";      // kleur van voedsel

    // prive attributen
    var _segments = [];
    var _radius = radius;

    /***********************************************************************
     **             Publieke attibuten                                    **
     ***********************************************************************/
    var food = {
        add: function(x, y) {
            _add(x, y)
        },
        remaining: function() {
            return _segments.length
        },
        getSegments: function() {
            return _segments;
        },
        eat: function(x, y) {
            return _eat(x, y)
        },
        collision: function(x, y) {
            return _collision(x, y);
        }
    }

    var _eat = function(x, y) {
        var index = indexOf(_segments, x, y);
        var result = false;

        if (index >= 0) {
            _segments.splice(index, 1);
            result = true;
        }
        return result;
    }

    var _add = function(x, y) {
        if (indexOf(_segments, x, y) == -1) {
            _segments.push(createNewFood(x, y))
        }
    }

    /**
        @function colission(x,y) -> boolean
        @desc Controleert of de x- en y-coordinaten al 'bezet' zijn
        @param {number} x x-coordinaat
        @param {number} y y-coordinaat
        @returns {boolean} er staat al voedsel op deze plek (true) of niet (false)
    */
    var _collision = function (x, y) {
        return indexOf(_segments, x, y) >= 0;
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
    @returns {Element} met eerder gegeven radius, coordinaten en color FOOD
    */
    createNewFood = function(x, y) {
        return new Element(_radius, x, y, _FOOD);
    }

    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/

    return food
}
