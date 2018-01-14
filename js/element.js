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
