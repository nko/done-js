var qn = require('./quasinumeric'),
  prng = qn.KISS07().uint32;

var ResourceManager = exports = module.exports = function() {
  var self = this;
  this.serial = 0;
}

var serialLimit = 0x10000;
var radix = 62;									// digits: [0-9a-zA-Z]

/*
 * Generates a new token of 1-9 alphanumeric characters by
 * concatenating a 16-bit incrementing serial number onto a
 * 32-bit random integer, then expressing the 48-bit quantity
 * in base 62. These should be both hard to guess and extremely
 * unlikely to repeat on reasonable time scales.
 */
ResourceManager.prototype.newToken = function() {
  this.serial = (this.serial + 1) % serialLimit;
  return qn.toRadix(prng() * serialLimit + this.serial, radix);
}