var assert = require("assert")

var jsonspace = require('../lib/index.js').jsonspace;
describe('The example module', function() {
  it('should say "this function is tested"', function() {
    assert.equal("this function is tested", jsonspace.tested());
  });
});

