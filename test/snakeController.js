var expect = chai.expect;

describe("Snake Controller", function() {
  describe("new SnakeController", function() {
    var controller = new SnakeController();
    it("an object of type SnakeController should be created", function() {
      expect(typeof(controller)).to.equal("object");
    });
    it("the public methods should be available", function() {
      expect(typeof(controller.createSnake)).to.equal("function");
      expect(typeof(controller.createFoods)).to.equal("function");
      expect(typeof(controller.move)).to.equal("function");
      expect(typeof(controller.keyPressed)).to.equal("function");
      expect(typeof(controller.getFood)).to.equal("function");
      expect(typeof(controller.getSnake)).to.equal("function");
      expect(typeof(controller.setDirection)).to.equal("function");
    });
  });
});
