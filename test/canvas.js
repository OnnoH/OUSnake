var expect = chai.expect;

describe("Canvas", function() {
  describe("new Canvas", function() {
    var canvas = new Canvas($("#testCanvas"), 10, 20);
    it("an object of type Canvas should be created", function() {
      expect(typeof(canvas)).to.equal("object");
    });
    it("the public attributes should have the right values", function() {
      expect(canvas.width).to.equal(720);
      expect(canvas.height).to.equal(720);
      expect(canvas.max).to.equal(35);
      expect(canvas.xmin).to.equal(10);
      expect(canvas.xmax).to.equal(710);
      expect(canvas.ymin).to.equal(10);
      expect(canvas.ymax).to.equal(710);
    });
    it("the public methods should be available", function() {
      expect(typeof(canvas.clear)).to.equal("function");
      expect(typeof(canvas.drawText)).to.equal("function");
      expect(typeof(canvas.drawElement)).to.equal("function");
    });
  });
});
