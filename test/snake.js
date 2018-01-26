var expect = chai.expect;

// Also need element module for this, so make sure it's loaded
describe("Snake", function() {
  describe("new Snake", function() {
    var snake = new Snake([new Element(10, 10, 10, "Red"), new Element(10, 10, 20, "Orange")]);
    it("should create an object of type Snake", function() {
      expect(typeof(snake)).to.equal("object");
    });
    it("the public methods should be available", function() {
      expect(typeof(snake.getHead)).to.equal("function");
      expect(typeof(snake.getSegments)).to.equal("function");
      expect(typeof(snake.collision)).to.equal("function");
      expect(typeof(snake.move)).to.equal("function");
    });
    it("the snake should be two segments large", function() {
      expect(snake.getSegments().length).to.equal(2);
    });
  });
});
