var ev = require('events');
var ut = require('util');

exports.tested = tested
exports.notTested = notTested

exports.JsonSpace = JsonSpace;

function JsonSpace() {
  this.all = [];
}
ut.inherits(JsonSpace, ev.EventEmitter);

JsonSpace.prototype.put = function(ob) {
  this.all.push(ob);
  this.emit('put', ob);
} 

JsonSpace.prototype.read = function(arg) {
  if (typeof arg === 'function') {
    var ret = [];
    for (var i = 0; i < this.all.length; i++) {
      if (arg(this.all[i])) {
        ret.push(klone(this.all[i]));
      }
    }
    return ret;
  } else if (typeof arg === 'undefined') {
    return klone(this.all);
  } else {
    throw 'bad read';
  }
}

function klone(ob) {
  return JSON.parse(JSON.stringify(ob)); 
}

function tested() {
  var word;
  if (1 > 2) {
    // this limb is not tested
    word = "not ";
  } else {
    // this limb is tested
    word = "";
  }
  return "this function is " + word + "tested";
}

function notTested() {
  return "this function is not tested";
}
