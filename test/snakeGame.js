var expect = chai.expect;

describe('Snake Game View', function() {
  describe('The DOM', function() {
    var sound = new Sound();
    $("body").append('<div style="visibility: hidden">');
    $("body").append('<div class="gameCanvas"><p class="gameTitle">Snake</p><div>');
    $("body").append('<button id="startSnake" type="button" name="startButton" class="gameButton"><i class="fa fa-play fa-fw"></i></button>');
    $("body").append('<button id="stopSnake" type="button" name="stopButton" class="gameButton"><i class="fa fa-stop fa-fw"></i></button>');
    $("body").append('<button id="toggleSound" type="button" name="toggleButton" class="gameButton"><i class="fa fa-volume-up fa-fw"></i></button>');
    $("body").append('</div><canvas id="mySnakeCanvas" width="360" height="360" title="Zit hier een addertje onder?"></canvas></div>');
    $("body").append('</div>');
    $(document).ready(function() {
        $('#toggleSound').click(sound.toggle);
    });
    $(document).on("toggleSound", function(event) {
        $("#toggleSound").html('<i class="fa fa-volume-' + (event[0] ? "up" : "off") + ' fa-fw"></i>');
    });

    it('should have called toggle function', function () {
        var result = $("#toggleSound").html();
        expect(result).to.equal('<i class="fa fa-volume-up fa-fw"></i>');
    });

    $('#toggleSound').trigger('click');

    it('should have called toggle function', function () {
        var result = $("#toggleSound").html();
        expect(result).to.equal('<i class="fa fa-volume-off fa-fw"></i>');
    });
  });
});
//   var _savedAlert = window.alert;
//
//   try {
//     var spy = sinon.spy(window, 'alert');
//     $('#thingy').trigger('click');
//     sinon.assert.called(spy);
//    }
//
//   finally { window.alert = _savedAlert; }

//
//
// $('#toggleSound').click();
// function toggleMe(e) {
//   e.preventDefault();
//   $(e.target).toggleClass('active');
// }
//
// // Setup
// var div = document.createElement('div');
// var e = {
//   target : div,
//   preventDefault: sinon.spy()
// }
// toggleMe(e);
//
// //Assert
// assert(e.preventDefault.called);
// assert(div.className == 'active');
