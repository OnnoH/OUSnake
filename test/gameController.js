var expect = chai.expect;

describe("Game Controller", function() {
  describe("new GameController", function() {
    var controller = new GameController();
    it("an object of type GameController should be created", function() {
      expect(typeof(controller)).to.equal("object");
    });
    it("the public properties should be available", function() {
      expect(typeof(controller.level)).to.equal("number");
    });
    it("the public methods should be available", function() {
      expect(typeof(controller.start)).to.equal("function");
      expect(typeof(controller.stop)).to.equal("function");
      expect(typeof(controller.gameOver)).to.equal("function");
      expect(typeof(controller.gameWon)).to.equal("function");
      expect(typeof(controller.keyPressed)).to.equal("function");
    });
    it("the game starts at level 1", function() {
      expect(controller.level).to.equal(1);
    });
  });
});
