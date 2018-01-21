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
    
    /***************************************************************************
     **             Publieke attibuten                                        **
     ***************************************************************************/
    var food = {
        remaining: function() {
            return segments.length
        },
        getSegments: function() {
            return segments;
        },
        collision: function(x, y) {
            return collision(x, y)
        },
        eatFood: function(x, y) {
            return eatFood(x, y)
        }
    }
    
    //todo: combine snake.collision and food.collision in helper math function. 
    var collision = function (x, y) {
        return indexOfCollision >= 0;
    }
    
    var eatFood = function (x, y) {
        var index = indexOfCollision(segments, x, y);
        var result = false;
        
        if (index >= 0) {
            segments.splice(index, 1);
            result = true;
            console.log("munch");
        }
        return result;
    }
    
    /***********************************************************************
    **             Prive Methodes                                        **
    ***********************************************************************/   
    
    indexOfCollision = function(segments, x, y) {
        var i = 0; // iterator
        var result = -1; // index
        
        while (i < segments.length) {
            if (segments[i].x == x && segments[i].y == y) {
                result = i;
                i = segments.length;
            }
            i++;
        }
        return result;
    }
    
    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/
     
    return food
}