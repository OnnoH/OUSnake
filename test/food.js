var expect = chai.expect;

describe("Food", function() {
  describe("new Food", function() {
    var food = new Food([]);
    it("should create an object of type Food", function() {
      expect(typeof(food)).to.equal("object");
    });
    it("the public methods should be available", function() {
      expect(typeof(food.add)).to.equal("function");
      expect(typeof(food.remove)).to.equal("function");
      expect(typeof(food.createNewFood)).to.equal("function");
      expect(typeof(food.remaining)).to.equal("function");
      expect(typeof(food.getSegments)).to.equal("function");
    });
    it("the inital size should be zero", function() {
      expect(food.getSegments().length).to.equal(0);
    });
    var foodElement = food.createNewFood(10, 10);
    it("the food should be present if added", function() {
      food.add(foodElement);
      expect(food.remaining()).to.equal(1);
    });
    it("the food should be gone if eaten", function() {
      food.remove(foodElement);
      expect(food.remaining()).to.equal(0);
    });
  });
});
