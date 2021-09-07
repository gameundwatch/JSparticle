
// get RandomInt function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get Distance
function getDistanceFrom(x,y,fromX,fromY) { 
    return Math.sqrt( Math.pow(x-fromX, 2) + Math.pow(y-fromY, 2) );
}

function normalizedX (x,y) {
  return x / Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
}

function normalizedY (x,y) {
  return y / Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
}

//============================================
// FORCE
//============================================

const force = {
  x: null,
  y: null,
  
  forceDirection: function( degree, power ) {
    this.x = power * Math.cos( (degree*Math.PI) /180 );
    this.y = power * Math.sin( (degree*Math.PI) /180 );
  }

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
  maxlife: null,
  life: null,
  data:[],

  // DRAW
  draw: function() {
    this.data.forEach( part =>  {
      if (part.life >= 0){
        part.shape.drawShape(part.x, part.y, part.size);
      }
    })
    this.shape.spinningShape();
  },

  // GENERATE
  generate: function(posx, posy, speed, size, life) {
    this.data.push({
      x: posx,
      y: posy,
      dx: speed*( Math.cos( (getRandomInt(360)*Math.PI) /180 )),
      dy: speed*( Math.sin( (getRandomInt(360)*Math.PI) /180 )),
      shape: shape,
      size: size,
      maxlife:life,
      life:life
    })
  },

  // MOVE
  move: function() {
    this.data.forEach( part =>  {

      const distance = getDistanceFrom(part.x, part.y, emitterX, emitterY);

      // part.dx = normalizedX( part.dx + force.x, part.dy + force.y );
      // part.dy = normalizedY( part.dx + force.x, part.dy + force.y );

      part.dx += force.x;
      part.dy += force.y;

      part.x += part.dx;
      part.y += part.dy;

      // console.log(normalizedY(0+force.x, 1 + force.y));
      part.size *= Math.pow(part.life/part.maxlife, this.shrink);

    })
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