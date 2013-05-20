var assert = require("assert")

var js = require('../lib/index.js').jsonspace;
describe('The example module', function() {
  it('should say "this function is tested"', function() {
    assert.equal('this function is tested', js.tested());
  });
  it('should create a JsonSpace', function() {
    var space = new js.JsonSpace();
    assert.equal('JsonSpace', space.constructor.name); 
  });
  it('should insert an object', function() {
    var space = new js.JsonSpace();
    space.put({"hello": "world"});
    assert.deepEqual([{"hello": "world"}], space.read());
  });
});

