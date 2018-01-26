/***************************************************************************
 **                 Canvas                                                **
 ***************************************************************************/

/**
   @constructor Canvas() -> void
   @desc vult de afmetingen op basis van het canvas
   @param {object} canvas object met canvas element uit de html
   @param {number} radius straal van een element om min/max te berekenen
   @param {number} step stapgrootte voor het berekenen van de veldbreedte
*/
function Canvas(canvas, radius, step) {

    var _canvas = canvas;
    var _height = _canvas[0].height; // canvas height
    var _width = _canvas[0].width;   // canvas width
    var _max = _width / step - 1;    // netto veldbreedte
    var _xmin = radius;              // minimale x waarde
    var _xmax = _width - radius      // maximale x waarde
    var _ymin = radius;              // minimale y waarde
    var _ymax = _height - radius;    // maximale y waarde

    /***********************************************************************
     **             Publieke attibuten                                    **
     ***********************************************************************/
    var canvas = {
        clear: function() {
            _canvas.clearCanvas();
        },
        drawElement: function(element) {
            drawElement(element);
        },
        drawText: function(text, color) {
            drawText(text, color);
        },
        max : _max,
        xmin : _xmin,
        xmax : _xmax,
        ymin : _ymin,
        ymax : _ymax,
        height : _height,
        width : _width
    };
    /***********************************************************************
     **             Methodes                                              **
     ***********************************************************************/

    /**
        @function drawElement(element) -> void
        @desc Een element tekenen
        @param {Element} element een Element object
    */
    var drawElement = function(element) {
        _canvas.drawArc({
            draggable : false,
            fillStyle : element.color,
            x : element.x,
            y : element.y,
            radius : element.radius
        });
    }

    /**
        @function drawText(text,color) -> void
        @desc drukt gegeven tekst af op het canvas in de gegeven kleur
        @param {string} text de tekst
        @param {string} color de kleur
    */
    var drawText = function(text, color) {
      var context = _canvas[0].getContext("2d");
      context.font = "50px Comic Sans MS";
      context.fillStyle = color;
      context.textAlign = "center";
      context.fillText(text, _width / 2, _height / 2);
    }

    /***********************************************************************
     **             Prive Methodes                                        **
     ***********************************************************************/

    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/

     return canvas;

}
