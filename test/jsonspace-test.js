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
    assert.deepEqual([{"hello": "world"},{"foo": "bar"}], space.read());
  });
  it('should register a reading onPut function', function(done) {
    var space = new js.JsonSpace();
    space.onPut(function(ob) {
      assert.deepEqual({"hello": "world"}, ob);
      assert.deepEqual([], space.read());
      process.nextTick(function() {
        assert.deepEqual([{"hello": "world"}], space.read());
        done();
      });
      return false; // don't take
    }); 
    space.put({"hello": "world"});
  });
  it('should register a taking onPut function', function(done) {
    var space = new js.JsonSpace();
    space.onPut(function(ob) {
      assert.deepEqual({"hello": "world"}, ob);
      assert.deepEqual([], space.read());
      process.nextTick(function() {
        assert.deepEqual([], space.read());
        done();
      });
      return true; // take the object
    }); 
    space.put({"hello": "world"});
  });
  it('should allow a global take', function() {
    var space = new js.JsonSpace();
    space.put({"hello": "world"});
    assert.deepEqual([{"hello": "world"}], space.read());
    var taken = space.take();
    assert.deepEqual([{"hello": "world"}], taken);
    assert.deepEqual([], space.read());
  });
  it('should take with a function filter', function() {
    var space = new js.JsonSpace();
    space.put({"hello": "world"});
    space.put({"foo": "bar"});
    assert.deepEqual([{"hello": "world"}], space.take(function(ob) {
      return ob.hello !== undefined; 
    }));
    assert.deepEqual([{"foo": "bar"}], space.read());
  });
});

