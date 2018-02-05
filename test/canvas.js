var expect = chai.expect;

describe("Canvas", function() {
  describe("new Canvas", function() {
    var canvas = new Canvas($("#testCanvas")); // size 720 x 720
    it("an object of type Canvas should be created", function() {
      expect(typeof(canvas)).to.equal("object");
    });
    it("the public constants should be available", function() {
      expect(canvas.GOOD).to.equal("LawnGreen");
      expect(canvas.BAD).to.equal("OrangeRed");
      expect(canvas.NORMAL).to.equal("White");
    });
    it("the public attributes should have the right values", function() {
      expect(canvas.xmax).to.equal(35);
      expect(canvas.ymax).to.equal(35);
    });
    it("the public methods should be available", function() {
      expect(typeof(canvas.draw)).to.equal("function");
    });
    it("the canvas should be a square", function() {
      expect($("#testCanvas")[0].height).to.equal($("#testCanvas")[0].width);
    });
  });
});
