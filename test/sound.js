var expect = chai.expect;

describe("Sound", function() {
  describe("new Sound", function() {
    var sound = new Sound();
    it("should create an object of type Sound", function() {
      expect(typeof(sound)).to.equal("object");
    });
    it("the public methods should be available", function() {
      expect(typeof(sound.play)).to.equal("function");
      expect(typeof(sound.toggle)).to.equal("function");
    });
    it("the public constants should be available", function() {
      expect(sound.FOOD).to.equal("food");
      expect(sound.MOVE).to.equal("move");
      expect(sound.WIN).to.equal("winner");
      expect(sound.LOSE).to.equal("loser");
    });
  });
});
