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
    @function isPresent(elements) -> boolean
    @desc Controleer of gegeven element aanwezig is in
          het gegeven array met Element-en.
    @param {Element} elements een array met Element-en.
    @returns {boolean} true als element overlapt met element uit array.
*/
Element.prototype.isPresent = function(elements) {
    return this.getIndex(elements) >= 0;
}

/**
    @function getIndex(elements) -> integer
    @desc Geef de index van het element uit array elements dat
          overeenkomt met het gegeven element.
    @param {Element} elements een array met Element-en.
    @returns {integer} index van overlappend element. -1 als geen element overlapt.
*/
Element.prototype.getIndex = function(elements) {
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
