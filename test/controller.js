var expect = chai.expect;

describe("Controller", function() {
  describe("new Controller", function() {
    var controller = new Controller();
    it("an object of type Controller should be created", function() {
      expect(typeof(controller)).to.equal("object");
    });
    it("the public attributes should have the right values", function() {
      expect(controller.direction).to.equal("UP");
    });
    it("the public methods should be available", function() {
      expect(typeof(controller.doMove)).to.equal("function");
      expect(typeof(controller.canMove)).to.equal("function");
      expect(typeof(controller.gameOver)).to.equal("function");
    });
  });
});
