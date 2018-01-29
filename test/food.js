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
      expect(food.getSegments().length).to.equal(0);
    });
    it("the food should be present if added", function() {
      food.add(10, 10, 10);
      expect(food.remaining()).to.equal(1);
    });
    it("the food should collide with itself", function() {
      expect(food.collision(10, 10)).to.equal(true);
    });
    it("the food should be gone if eaten", function() {
      food.eat(10, 10);
      expect(food.remaining()).to.equal(0);
    });
  });
});
