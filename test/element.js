var expect = chai.expect;

var element = new Element(100, 10, 20, "Red");

describe("Element", function() {
  describe("new Element", function() {
    it("should create an object of type Element", function() {
      expect(typeof(element)).to.equal("object");
    });
    it("the public attributes should have the right values", function() {
      expect(element.radius).to.equal(100);
      expect(element.x).to.equal(10);
      expect(element.y).to.equal(20);
      expect(element.color).to.equal("Red");
    });
    it("the public methods should be available", function() {
      expect(typeof(element.isPresent)).to.equal("function");
      expect(typeof(element.indexOf)).to.equal("function");
    });
  });
});
