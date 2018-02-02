require(["element", "canvas", "food", "sound", "snake", "snakeController", "gameController"], function() {
    console.log("All scripts are loaded.")
    var game = new GameController();
    console.log("The game is afoot!")

    /***************************************************************************
     **                 Game Buttons                                          **
     ***************************************************************************/

    $(document).ready(function() {
        $("#startSnake").click(game.start);
        $("#stopSnake").click(game.stop);
        $('#toggleSound').click(game.toggleSound);
    });

    /***************************************************************************
     **                 Events                                                **
     ***************************************************************************/
    $(document).on("keydown", function() { game.keyPressed(event); });
    $(document).on("gameOverEvent", game.gameOver);
    $(document).on("gameWonEvent", game.gameWon);
    $(document).on("playSound", function(event, sound) { game.playSound(event[0]); });

});
