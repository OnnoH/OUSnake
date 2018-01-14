/**
    @function testBounds() -> boolean
    @desc test 2: test beweging in gegeven richting over een leeg veld.
                  verwachte uitkomst:
                    snake van lengte 2 blijft binnen het veld
    @param {string} direction de richting (const UP, DOWN, LEFT of RIGHT)
    @returns {boolean} test voldoet aan verwachting
*/
function testBounds(direction) {
    result = true;

    //setup
    init();
    foods = [];

    //execute scenario
    if (direction == DOWN) {
        move(RIGHT);
    }
    for (var i = 0; i < (WIDTH/R + 3); i++) {
        move(direction);
    }

    //verify
    result = result && verifySnake();
    result = result && verifyFood();

    console.log("Test Bounds " + direction + ": " + result.toString());

    return result;
}
