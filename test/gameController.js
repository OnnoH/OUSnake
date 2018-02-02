var expect = chai.expect;

describe("Game Controller", function() {
  describe("new GameController", function() {
    var controller = new GameController();
    it("an object of type GameController should be created", function() {
      expect(typeof(controller)).to.equal("object");
    });
    it("the public methods should be available", function() {
      expect(typeof(controller.start)).to.equal("function");
      expect(typeof(controller.stop)).to.equal("function");
      expect(typeof(controller.toggleSound)).to.equal("function");
      expect(typeof(controller.gameOver)).to.equal("function");
      expect(typeof(controller.gameWon)).to.equal("function");
      expect(typeof(controller.keyPressed)).to.equal("function");
      expect(typeof(controller.playSound)).to.equal("function");
    });
  });
});
