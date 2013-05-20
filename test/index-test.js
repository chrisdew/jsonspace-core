var assert = require("assert")

var index = require('../lib/index.js');
describe('index', function() {
  it('should say "hello index"', function() {
    assert.equal("hello index", index.hello());
  });
});

