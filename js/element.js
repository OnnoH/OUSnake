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
    
    /***********************************************************************
     **             Publieke attibuten                                    **
     ***********************************************************************/
    var element = {
        radius: radius,
        x: x,
        y: y,
        color: color
    };
    
    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/
    
    return element
}




