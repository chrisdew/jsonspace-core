// just a placeholder for functionality
exports.hello = function() { return "hello index"; }
exports.example = process.env.EXPRESS_COV
  ? require('../lib-cov/example')
  : require('./example')
exports.jsonspace = process.env.EXPRESS_COV
  ? require('../lib-cov/jsonspace')
  : require('./jsonspace')
  

