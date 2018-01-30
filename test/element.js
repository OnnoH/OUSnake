var expect = chai.expect;

describe("Element", function() {
  describe("new Element", function() {
    var element = new Element(10, 20, "Red");
    it("should create an object of type Element", function() {
      expect(typeof(element)).to.equal("object");
    });
    it("the public attributes should have the right values", function() {
      expect(element.x).to.equal(10);
      expect(element.y).to.equal(20);
      expect(element.color).to.equal("Red");
    });
  });
});
