
// get RandomInt function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get Distance
function getDistanceFrom(x,y,fromX,fromY) { 
    return Math.sqrt( Math.pow(x-fromX, 2) + Math.pow(y-fromY, 2) );
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

//============================================
// ARRAY SPLICE EXTENSION
//============================================

function SpliceObject(arr, key, value) {
}


//============================================
// PARTICLE
//============================================
const particle = {
  
  x: null,
  y: null,
  dx: null,
  dy: null,
  size: null,
  value: null,
  shrink: null,
  shape: shape,
  force: force,
  maxlife: null,
  life: null,
  data:[],

  // DRAW
  draw: function() {
    this.data.forEach( part =>  {
      if (part.life >= 0){
        part.shape.drawShape(part.x, part.y, part.size, part.life, part.maxlife);
      }
    })
  },

  // GENERATE
  generate: function(posx, posy, spreadx, spready, speed, size, life) {
    let degree = xors.rand_range(360);
     this.data.push({
      x: posx + Math.cos(degree) * spreadx,
      y: posy + Math.sin(degree) * spready,
      dx: speed*( Math.cos( (getRandomInt(360)*Math.PI) /180 )),
      dy: speed*( Math.sin( (getRandomInt(360)*Math.PI) /180 )),
      shape: shape,
      force: force,
      size: size,
      maxlife:life,
      life:life
    });
  },

  // MOVE
  move: function() {
    this.data.forEach( part =>  {

      part.dx += part.force.forceX();
      part.dy += part.force.forceY();

      part.x += part.dx;
      part.y += part.dy;

      part.size *= Math.pow(part.life/part.maxlife, this.shrink);

    })
  },

  // transform:
  transform: function() {
  },

  // ERASE
  erase: function() {
    this.data.forEach((part, index) =>  {
      part.life -= 1;
      if (part.life <= 0) {
        this.data.splice(index, 1);
      }
    })
    
    if(this.value < this.data.length){
      this.data.splice(0, 1);
    }
    
  },

  // SETTING
  setParticle: function(value, shrink) {
    this.value = value;
    this.shrink = shrink;
  }

}