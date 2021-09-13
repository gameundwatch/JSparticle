
// get RandomInt function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get Distance
function getDistanceFrom(x,y,fromX,fromY) { 
    return Math.sqrt( Math.pow(x-fromX, 2) + Math.pow(y-fromY, 2) );
}

// convert curve -1 ~ 1 to 0 ~ 2
function getTrueCurve (x) {
  return Math.tanh(x) + 1;
}

//============================================
// XOR SHIFT RANDOM GENERATOR
//============================================

const xors = {
  x: 123456789,
  y: 390865025,
  z: 432987525,
  w: 97545989,

  seed: function(s) {
    xors.w = s;
  },
  
  rand: function() {
    var t = xors.x ^ (xors.x << 11);
    xors.x = xors.y;
    xors.y = xors.z;
    xors.z = xors.w;
    return xors.w = (xors.w^(xors.w>>>19))^(t^(t>>>8));
  },
  
  rand_range: function( max ) {
    return (xors.rand() % max + max) % max;
  }

}