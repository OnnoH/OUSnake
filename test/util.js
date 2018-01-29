var expect = chai.expect;

describe("Util", function() {
  describe("all utility functions to be present", function() {
    expect(typeof(getRandomInt)).to.equal("function");
    expect(typeof(indexOf)).to.equal("function");
  });
  describe("get random integer between given boundaries", function() {
    var randomInt = getRandomInt(100, 209);
    expect(randomInt).to.be.above(100);
    expect(randomInt).to.be.below(209);
  });
  describe("get index of given element", function() {
    var segments = [ { x: 10, y: 10}, { x: 10, y: 20 }];
    expect(indexOf(segments, 10, 10)).equal(0);
    expect(indexOf(segments, 10, 20)).equal(1);
    expect(indexOf(segments, 10, 30)).equal(-1);
  });
});

// Tests are properly executed but somehow the describe output is hidden.
