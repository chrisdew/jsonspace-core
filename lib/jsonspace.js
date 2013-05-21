var ev = require('events');
var ut = require('util');

exports.tested = tested
exports.notTested = notTested

exports.JsonSpace = JsonSpace;

function JsonSpace() {
  this.all = [];
  this.onPutFns = [];
}
//ut.inherits(JsonSpace, ev.EventEmitter);

JsonSpace.prototype.put = function(ob) {
  for (var i in this.onPutFns) {
    if (this.onPutFns[i](ob)) {
      return;
    }
  } 
  this.all.push(ob);
} 

JsonSpace.prototype.take = function(arg) {
  if (typeof arg === 'function') {
    var ret = [];
    for (var i = 0; i < this.all.length; i++) {
      if (arg(this.all[i])) {
        ret.push(klone(this.all[i]));
        this.all.splice(i, 1);
      }
    }
    return ret;
  } else if (typeof arg === 'undefined') {
    var ret;
    ret = this.all;
    this.all = [];
    return ret;
  } else {
    throw 'bad read';
  }
}

JsonSpace.prototype.onPut = function(fn) {
  this.onPutFns.push(fn);
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
