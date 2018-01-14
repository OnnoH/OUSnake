const FOOD     = "Olive";      // kleur van voedsel
/***************************************************************************
 **                 Food Constructor                                     **
 ***************************************************************************/

function Food() {
  this.segments = [];
}
/**
    @function create(x,y) -> Element
    @desc Voedselelement creeren op een bepaalde plaats
    @param {number} x x-coordinaat middelpunt
    @param {number} y y-coordinaart middelpunt
    @returns {Element} Element met straal R en color FOOD
*/
Food.prototype.create = function(x, y) {
    return new Element(R, x, y, FOOD);
}

/**
    @function add(food) -> void
    @desc Voedselelement toevoegen aan het array
    @param {array} food voedselelement
*/
Food.prototype.add = function(food) {
  this.segments.push(food);
}

Food.prototype.remove = function(food) {
  this.segments.splice(food, 1);
}
