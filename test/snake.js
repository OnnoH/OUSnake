var expect = chai.expect;

// Also need element module for this, so make sure it's loaded
describe("Snake", function() {
  describe("new Snake", function() {
    var snake = new Snake();
    var newHead = snake.getNewHead(10, 10);
    it("should create an object of type Snake", function() {
      expect(typeof(snake)).to.equal("object");
    });
    it("the public methods should be available", function() {
      expect(typeof(snake.getHead)).to.equal("function");
      expect(typeof(snake.getNewHead)).to.equal("function");
      expect(typeof(snake.getSegments)).to.equal("function");
      expect(typeof(snake.collision)).to.equal("function");
      expect(typeof(snake.move)).to.equal("function");
    });
    it("the snake should be one segment after first move", function() {
      snake.move(newHead, true);
      expect(snake.getSegments().length).to.equal(1);
    });
    it("the snake should be two segments after second move", function() {
      newHead = snake.getNewHead(10, 20);
      snake.move(newHead, true);
      expect(snake.getSegments().length).to.equal(2);
    });
    it("the snake should move without growing", function() {
      newHead = snake.getNewHead(10, 30);
      snake.move(newHead, false);
      expect(snake.getSegments().length).to.equal(2);
    });
    it("the snake should move and grow at the same time", function() {
      newHead = snake.getNewHead(10, 40);
      snake.move(newHead, true);
      expect(snake.getSegments().length).to.equal(3);
    });
    it("the snake should have hit itself", function() {
      expect(snake.collision(10, 30)).to.equal(true);
    });
    it("the snake should have an orange head", function() {
      expect(snake.getHead().color).to.equal("DarkOrange");
    });
  });
});
