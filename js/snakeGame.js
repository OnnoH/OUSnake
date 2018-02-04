require(["gameController"], function() {
    console.log("All scripts are loaded.")

    var game = new GameController();    // The game;
    console.log("The game is afoot!");

    /***************************************************************************
     **                 Game Button Events                                    **
     ***************************************************************************/
    
    $(document).ready(function() {
        $("#startSnake").click(game.start);
        $("#stopSnake").click(game.stop);
        $('#toggleSound').click(game.toggleSound);
    });
    
    /***************************************************************************
     **                 Keyboard Events                                       **
     ***************************************************************************/
     
    $(document).on("keydown", function() { game.keyPressed(event); });

    /***************************************************************************
     **                 Custom Events                                         **
     ***************************************************************************/

    $(document).on("gameOverEvent", game.gameOver);
    $(document).on("gameWonEvent", game.gameWon);
    $(document).on("playSound", function(event) { game.playSound(event[0]); });
    $(document).on("toggleSound", function(event) { 
        $("#toggleSound").html('<i class="fa fa-volume-' + (event[0] ? "up" : "off") + ' fa-fw"></i>');
    });
});
