var expect = chai.expect;

describe("Element", function() {
  describe("new Element", function() {
    it("should create an object of type Element", function() {
      var element = new Element(100, 10, 20, "Red");
      expect(typeof(element)).to.equal("object");
      expect(element.radius).to.equal(100);
      expect(element.x).to.equal(10);
      expect(element.y).to.equal(20);
      expect(element.color).to.equal("Red");
    });
  });
});
