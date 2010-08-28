/*
 * Radix converter, adapted from
 * http://www.javascripter.net/faq/convert3.htm
 */
exports.toRadix = function(N, radix) {
  var HexN="", Q=Math.floor(Math.abs(N)), R;
  while (true) {
    R=Q%radix;
    HexN = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(R)+HexN;
    Q=(Q-R)/radix;
    if (Q==0) break;
  }
  return (N<0) ? "-"+HexN : HexN;
}

				
/*
 * PRNG from from http://baagoe.com/en/RandomMusings/javascript/
 * Johannes Baagøe <baagoe@baagoe.com>, 2010
 */
function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}

exports.KISS07 = function() {
  return (function(args) {
    // George Marsaglia, 2007-06-23
    //http://groups.google.com/group/comp.lang.fortran/msg/6edb8ad6ec5421a5
    var x = 123456789;
    var y = 362436069;
    var z =  21288629;
    var w =  14921776;
    var c = 0;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = Mash();
    for (var i = 0; i < args.length; i++) {
      x ^= mash(args[i]) * 0x100000000; // 2^32
      y ^= mash(args[i]) * 0x100000000;
      z ^= mash(args[i]) * 0x100000000;
      w ^= mash(args[i]) * 0x100000000;
    }
    if (y === 0) {
      y = 1;
    }
    c ^= z >>> 31;
    z &= 0x7fffffff;
    if ((z % 7559) === 0) {
      z++;
    }
    w &= 0x7fffffff;
    if ((w % 7559) === 0) {
      w++;
    }
    mash = null;

    var uint32 = function() {
      var t;

      x += 545925293;
      x >>>= 0;

      y ^= y << 13;
      y ^= y >>> 17;
      y ^= y << 5;

      t = z + w + c;
      z = w;
      c = t >>> 31;
      w = t & 0x7fffffff;

      return x + y + w >>> 0;
    };

    var random = function() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };
    random.uint32 = uint32;
    random.fract53 = function() {
      return random() +
        (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };
    random.args = args;
    random.version = 'KISS07 0.9';

    return random;
  } (Array.prototype.slice.call(arguments)));
};
