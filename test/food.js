/**
    @function verifyFood() -> boolean
    @desc verifeer of de voedsel array is
    @returns {boolean} foods is valide
*/
function verifyFood() {
    result = true;

    for (var i = 0; i < foods.length; ++i) {
        if (foods[i].color != FOOD) {
            result = false;
        }
    }

    //ToDo: Verify is food is within bounds
    //ToDo: Verify is there are no collisions.

    return result;
}
