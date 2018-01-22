/***************************************************************************
 **                 Canvas                                                **
 ***************************************************************************/

/**
   @constructor Canvas() -> void
   @desc vult de afmetingen op basis van het canvas
   @param {string} canvasId naam van het canvast element uit de html
   @param {number} radius straal van een element om min/max te berekenen
   @param {number} step stapgrootte voor het berekenen van de veldbreedte
*/
function Canvas(canvasId, radius, step) {

    var area = $(canvasId);
    var height = area[0].height; // canvas height
    var width = area[0].width;   // canvas width
    var max = width / step - 1;    // netto veldbreedte
    var xmin = radius;             // minimale x waarde
    var xmax = width - radius      // maximale x waarde
    var ymin = radius;             // minimale y waarde
    var ymax = height - radius;    // maximale y waarde

    /***********************************************************************
     **             Publieke attibuten                                    **
     ***********************************************************************/
    var canvas = {
        clearCanvas: function() {
            area.clearCanvas();
        },
        drawElement: function(element) {
            drawElement(element);
        },
        drawText: function(text, color) {
            drawText(text, color);
        },
        max : max,
        xmin : xmin,
        xmax : xmax,
        ymin : ymin,
        ymax : ymax,
        height : height,
        width : width
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
        area.drawArc({
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
      var context = area[0].getContext("2d");
      context.font = "50px Comic Sans MS";
      context.fillStyle = color;
      context.textAlign = "center";
      context.fillText(text, width / 2, height / 2);
    }

    /***********************************************************************
     **             Prive Methodes                                        **
     ***********************************************************************/

    /***********************************************************************
     **             Return                                                **
     ***********************************************************************/

     return canvas

}
