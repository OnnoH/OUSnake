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
    });
    $(document).on("gameWonEvent", function(event) {
        console.log("GEWONNEN!!!");
        game.gameWon();
        soundplay(sound.WIN);
    });
    $(document).on("gameMoveEvent", function(event) {
        sound.play(sound.MOVE);
    });
    $(document).on("gameEatEvent", function(event) {
        sound.play(sound.FOOD);
    });
    $(document).on("toggleSound", function(event) { 
        $("#toggleSound").html('<i class="fa fa-volume-' + (event[0] ? "up" : "off") + ' fa-fw"></i>');
    });
});
