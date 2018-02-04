/**
 * @class SnakeGame
 * @module snake/view
 * @desc provide interaction for the game.
 * @see GameController
 * @see Sound
 * @see Canvas
 */
require(["gameController", "sound", "canvas"], function() {
    console.log("All scripts are loaded.")

    var canvas = new Canvas($("#mySnakeCanvas"));
    var sound = new Sound();
    var game = new GameController(canvas);    // The game;
    
    console.log("The game is afoot!");

    /***************************************************************************
     **                 Game Button Events                                    **
     ***************************************************************************/
    
    $(document).ready(function() {
        $("#startSnake").click(game.start);
        $("#stopSnake").click(game.stop);
        $('#toggleSound').click(sound.toggle);
    });
    
    /***************************************************************************
     **                 Keyboard Events                                       **
     ***************************************************************************/
     
    $(document).on("keydown", function() { game.keyPressed(event); });

    /***************************************************************************
     **                 Custom Events                                         **
     ***************************************************************************/

    $(document).on("gameOverEvent", function(event) {
        console.log("VERLOREN!!!");
        game.gameOver();
        sound.play(sound.LOSE);
        canvas.draw(event[0], [["Game Over", canvas.BAD], 
                               ["You reached level " + game.level, canvas.NORMAL],
                               ["Press start to try again", canvas.NORMAL]])
    });
    $(document).on("gameWonEvent", function(event) {
        console.log("GEWONNEN!!!");
        game.gameWon();
        sound.play(sound.WIN);
        canvas.draw(event[0], [["Well Done!", canvas.GOOD], 
                               ["You cleared level " + game.level, canvas.NORMAL],
                               ["Press start go to the next level", canvas.NORMAL]])
    });
    $(document).on("gameMoveEvent", function(event) {
        sound.play(sound.MOVE);
        canvas.draw(event[0], [])
    });
    $(document).on("gameEatEvent", function(event) {
        sound.play(sound.FOOD);
        canvas.draw(event[0], [])
    });
    
    $(document).on("toggleSound", function(event) { 
        $("#toggleSound").html('<i class="fa fa-volume-' + (event[0] ? "up" : "off") + ' fa-fw"></i>');
    });
});
