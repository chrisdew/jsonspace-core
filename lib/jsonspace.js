exports.tested = tested
exports.notTested = notTested

exports.JsonSpace = JsonSpace;

function JsonSpace() {
  this.all = [];
}

JsonSpace.prototype.put = function(ob) {
  this.all.push(ob);
} 

JsonSpace.prototype.read = function() {
  return klone(this.all);
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
