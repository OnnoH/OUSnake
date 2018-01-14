/***************************************************************************
 **                 Canvas Constructor                                    **
 ***************************************************************************/
 /**
     @constructor Canvas() -> void
     @desc vult de afmetingen op basis van het canvas
 */
 function Canvas(canvasId) {
   this.area = $(canvasId);

   this.height = this.area[0].height; // canvas height
   this.width = this.area[0].width;   // canvas width

   // er moet gelden: WIDTH = HEIGHT
   this.max = this.width / STEP - 1;    // netto veldbreedte
   this.xmin = R;                       // minimale x waarde
   this.xmax = this.width - R;          // maximale x waarde
   this.ymin = R;                       // minimale y waarde
   this.ymax = this.height - R;         // maximale y waarde
 }

/**
    @function drawElement(element) -> void
    @desc Een element tekenen
    @param {Element} element een Element object
*/
Canvas.prototype.drawElement = function(element) {
    this.area.drawArc({
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
Canvas.prototype.drawText = function(text, color) {
    var context = this.area[0].getContext("2d");
    context.font = "50px Comic Sans MS";
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(text, this.width / 2, this.height / 2);
}
