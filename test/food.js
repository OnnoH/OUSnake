var expect = chai.expect;

describe("Food", function() {
  describe("new Food", function() {
    var food = new Food([]);
    it("should create an object of type Food", function() {
      expect(typeof(food)).to.equal("object");
    });
    it("the public methods should be available", function() {
      expect(typeof(food.add)).to.equal("function");
      expect(typeof(food.eat)).to.equal("function");
      expect(typeof(food.collision)).to.equal("function");
      expect(typeof(food.remaining)).to.equal("function");
      expect(typeof(food.getSegments)).to.equal("function");
    });
    it("the inital size should be zero", function() {
      expect(food.remaining()).to.equal(0);
    });
    it("and one if food is added", function() {
      food.add(10, 10);
      expect(food.remaining()).to.equal(1);
    });
    it("and collides with itself", function() {
      food.add(10, 10);
      expect(food.collision(10, 10)).to.equal(true);
    });
    it("and back to zero if food is eaten", function() {
      food.eat(10, 10);
      expect(food.remaining()).to.equal(0);
    });
  });
});
