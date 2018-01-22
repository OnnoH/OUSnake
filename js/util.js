/***************************************************************************
 **                 Utility Functions                                     **
 ***************************************************************************/

/**
    @function getRandomInt(min, max) -> number
    @desc Creeren van random geheel getal in het interval [min, max]
    @param {number} min een geheel getal als onderste grenswaarde
    @param {number} max een geheel getal als bovenste grenswaarde (max > min)
    @returns {number} een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
    @function indexOf(elements, x, y) -> number
    @desc Controleer of er een element is met coordinaten {x, y}.
          Geeft de index van het gevonden element terug of -1 als geen
          element gevonden is.
    @param {[element]} elements: Een array van elementen
    @param {number} x: een x coordinaat
    @param {number} y: een y coordinaat
    @returns {number} index van element met coordinaten {x, y} of - 1 als
                      er geen element met de gegeven coordinaten is.
*/
function indexOf(elements, x, y) {
    var i = 0;        // iterator
    var result = - 1; // resultaat

    while (i < elements.length) {
        if (elements[i].x == x && elements[i].y == y) {
            result = i;
            i = elements.length;
        }
        i++;
    }
    return result;
}
