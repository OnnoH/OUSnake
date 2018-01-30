var expect = chai.expect;

describe("Canvas", function() {
  describe("new Canvas", function() {
    var canvas = new Canvas($("#testCanvas"), 20); // size 720 x 720
    it("an object of type Canvas should be created", function() {
      expect(typeof(canvas)).to.equal("object");
    });
    it("the public attributes should have the right values", function() {
      expect(canvas.xmax).to.equal(19);
      expect(canvas.ymax).to.equal(19);
    });
    it("the public methods should be available", function() {
      expect(typeof(canvas.clear)).to.equal("function");
      expect(typeof(canvas.drawText)).to.equal("function");
      expect(typeof(canvas.drawElement)).to.equal("function");
    });
    it("the canvas should be a square", function() {
      expect($("#testCanvas")[0].height).to.equal($("#testCanvas")[0].width);
    });
  });
});
