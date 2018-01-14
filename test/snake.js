/**
    @function verifySnake() -> boolean
    @desc verifeer of de snake valide is
    @returns {boolean} snake is valide
*/
function verifySnake() {
    result = true;

    //verify snake type
    if (typeof snake !== "object") {
        result = false;
        console.log("invalid snake: " + typeof snake);
    }

    //verify length
    if (snake.segments.length < 2) {
        result = false;
        console.log("invalid snake length");
    }

    //verify head existence
    if (typeof snake.head !== "object") {
        result = false;
        console.log("invalid snake head");
    }

    //verify head color
    if (snake.segments[snake.segments.length-1].color != HEAD) {
        result = false;
        console.log("invalid snake head color");
    }

    //verify body color
    for (var i = 0; i < snake.segments.length -1; ++i) {
        if (snake.segments[i].color != SNAKE) {
            result = false;
            console.log("invalid snake body color");
        }
    }

    //verify radius
    for (var i = 0; i < snake.segments.length; ++i) {
        if (snake.segments[i].radius != R) {
            result = false;
            console.log("invalid snake segment radius");
        }
    }

    //ToDo: Verify if snake is connected
    //ToDo: Verify is snake is within bounds
    //ToDo: Verify is there are no collisions.

    return result;
}
