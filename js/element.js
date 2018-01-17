/***************************************************************************
 **                 Element                                               **
 ***************************************************************************/

/**
    @constructor Element(radius, x, y, color)
    @desc deze klasse beschrijft een element met een gegeven positie (x, y), 
          radius en kleur. 
    @param {number} radius: straal
    @param {number} x: x-coordinaat middelpunt
    @param {number} y: y-coordinaat middelpunt
    @param {string} color: kleur van het element
*/
function Element(radius, x, y, color) {
    var radius = radius;
    var x = x;
    var y = y;
    var color = color;
    
    /***************************************************************************
     **             Publieke attibuten                                        **
     ***************************************************************************/
    var element = {
        radius: radius,
        x: x,
        y: y,
        color: color,
        isPresent: function(elements) {},
        getIndex: function(elements) {}
    };
    
    /***************************************************************************
     **             Methodes                                                  **
     ***************************************************************************/
    
    /**
        @function isPresent(elements) -> boolean
        @desc Controleer of gegeven element aanwezig is in
              het gegeven array met Element-en.
        @param {Element} elements een array met Element-en.
        @returns {boolean} true als element overlapt met element uit array.
    */
    element.isPresent = function(elements) {
        return element.getIndex(elements) >= 0;
    }
    
    /**
        @function getIndex(elements) -> integer
        @desc Geef de index van het element uit array elements dat
              overeenkomt met het gegeven element.
        @param {Element} elements een array met Element-en.
        @returns {integer} index van overlappend element. -1 als geen element overlapt.
    */
    element.getIndex = function(elements) {
        var index = -1; //positie in het array
        var i = 0;      //teller hulpvariabele

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
     **             Return                                                    **
     ***************************************************************************/
    
    return element
}




