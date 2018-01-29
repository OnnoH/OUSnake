// const { JSDOM } = require('jsdom');
// const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
// const { window } = jsdom;
// const $ = global.jQuery = require('jquery')(window);
const $ = global.jQuery = require('../lib/jquery-3.2.1.min.js');
const snake = require('../js/snake.js')
const assert = require('assert');

describe('Initialization', function() {

  it('Signs of life',()=>{
	  const result = snake.init()
	  expect(result).to.equal('it lives!')
  });

});

describe('Foods', function() {
  describe('Aantal voedselelementen', function() {
    var foods;
    snake.init();
    it('moet in het begin gelijk zijn aan NUMFOODS', function(done) {
      assert.equal(foods.length, NUMFOODS);
      done();
    });
  });
});


// var calc = require('./calc.js');
//
// // Tests are hierarchical. Here we define a test suite for our calculator.
// describe('Calculator Tests', function() {
// 	// And then we describe our testcases.
// 	it('returns 1+1=2', function(done) {
// 		assert.equal(calc.add(1, 1), 2);
// 		// Invoke done when the test is complete.
// 		done();
// 	});
//
// 	it('returns 2*2=4', function(done) {
// 		assert.equal(calc.mul(2, 2), 4);
// 		// Invoke done when the test is complete.
// 		done();
// 	});
// });
