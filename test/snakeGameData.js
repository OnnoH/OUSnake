var expect = chai.expect;

describe("Snake Game Data", function() {
  describe("new SnakeGameData", function() {
    var game = new SnakeGameData(10, 10, 1);
    it("an object of type SnakeGameData should be created", function() {
      expect(typeof(game)).to.equal("object");
    });
    it("the public constants should be available", function() {
      expect(typeof(game.LEFT)).to.equal("string");
      expect(typeof(game.RIGHT)).to.equal("string");
      expect(typeof(game.UP)).to.equal("string");
      expect(typeof(game.DOWN)).to.equal("string");
    });
    it("the public methods should be available", function() {
      expect(typeof(game.getFood)).to.equal("function");
      expect(typeof(game.getSnake)).to.equal("function");
      expect(typeof(game.setDirection)).to.equal("function");
      expect(typeof(game.init)).to.equal("function");
      expect(typeof(game.move)).to.equal("function");
    });
  });
});
