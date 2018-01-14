/***************************************************************************
 **                 Testfuncties                                          **
 ***************************************************************************/
 /**
     @function testAll() -> void
     @desc test de setup en de snakeCanvas grenzen
 */
function testAll(){
    console.log("testSetup : " + (testSetup() ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(LEFT) ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(UP) ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(RIGHT) ? "OK" : "FAILED"));
    console.log("testBounds : " + (testBounds(DOWN) ? "OK" : "FAILED"));

}

/**
    @function testSetup() -> boolean
    @desc test 1: test de initiele setup.
                  verwachte uitkomst:
                    snake van lengte 2
                    food
    @returns {boolean} test voldoet aan verwachting
*/
function testSetup() {
    result = true;

    //setup
    init();

    //execute scenario

    //verify
    result = result && verifySnake();
    result = result && verifyFood();

    console.log("Test Setup: " + result.toString());

    return result;
}
