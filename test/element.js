var expect = chai.expect;

describe("Element", function() {
  describe("new Element", function() {
    var elements = [new Element(10, 20, "Red"), new Element(10, 30, "Orange")];
    var element = new Element(10, 20, "Red");
    it("should create an object of type Element", function() {
      expect(typeof(element)).to.equal("object");
    });
    it("the public attributes should have the right values", function() {
      expect(element.x).to.equal(10);
      expect(element.y).to.equal(20);
      expect(element.color).to.equal("Red");
    });
    it("the public methods should be available", function() {
      expect(typeof(element.isPresent)).to.equal("function");
      expect(typeof(element.indexOf)).to.equal("function");
    });
    it("the element should be present in elements", function() {
      expect(element.isPresent(elements)).to.equal(true);
      expect(element.indexOf(elements)).to.equal(0);
    });
    it("the new element should not be present in elements", function() {
      var newElement = new Element(10, 40, "Green");
      expect(newElement.isPresent(elements)).to.equal(false);
      expect(newElement.indexOf(elements)).to.equal(-1);
    });
  });
});
