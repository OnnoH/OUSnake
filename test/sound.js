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
      expect(typeof(sound.playSounds)).to.equal("function");
      expect(typeof(sound.getSounds)).to.equal("function");
    });
    it("initial sound library should contain 4 noise makers", function() {
      expect(Object.keys(sound.getSounds()).length).to.equal(4);
    });
    it("initial sound should not be played", function() {
      expect(sound.playSounds()).to.equal(false);
    });
    it("after toggle sound should be played", function() {
      sound.toggle();
      expect(sound.playSounds()).to.equal(true);
    });
    it("a sound should be played", function() {
      sound.play("winner");
      // don't know what to expect
    });
  });
});
