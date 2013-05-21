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
  it('should read with a function filter', function() {
    var space = new js.JsonSpace();
    space.put({"hello": "world"});
    space.put({"foo": "bar"});
    assert.deepEqual([{"hello": "world"}], space.read(function(ob) {
      return ob.hello !== undefined; 
    }));
  });
  it('should register a read function', function(done) {
    var space = new js.JsonSpace();
    space.on('put', function(ob) {
      assert.deepEqual([{"hello": "world"}], space.read());
      done();
    }); 
    space.put({"hello": "world"});
  });
});

