var assert = require("assert")

var js = require('../lib/index.js').jsonspace;
describe('The example module', function() {
  it('should say "this function is tested"', function() {
    assert.equal('this function is tested', js.tested());
  });
  it('should create a JsonSpace', function() {
    var space = new js.JsonSpace();
    assert('JsonSpace', space.constructor.name); 
  });
});

