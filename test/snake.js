var expect = chai.expect;

// Also need element module for this, so make sure it's loaded
describe("Snake", function() {
  describe("new Snake", function() {
    var snake = new Snake([new Element(10, 10, 10, "Red"), new Element(10, 10, 20, "DarkOrange")]);
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
    it("the snake should move without growing", function() {
      snake.move(10, 10, false);
      expect(snake.getSegments().length).to.equal(2);
    });
    it("the snake should move and grow at the same time", function() {
      snake.move(10, 10, true);
      expect(snake.getSegments().length).to.equal(3);
    });
    it("the snake should have hit itself", function() {
      expect(snake.collision(10, 10)).to.equal(true);
    });
    it("the snake should have an orange head", function() {
      expect(snake.getHead().color).to.equal("DarkOrange");
    });
  });
});
