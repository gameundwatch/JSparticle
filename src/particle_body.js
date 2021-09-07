
// get RandomInt function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get Distance
function getDistanceFrom(x,y,fromX,fromY) { 
    return Math.sqrt( Math.pow(x-fromX, 2) + Math.pow(y-fromY, 2) );
}

//============================================
// PARTICLE
//============================================
const particle = {
  
  x: null,
  y: null,
  dx: null, // direction X
  dy: null, // direction Y
  size: null,
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
      shape: shape, // {type: 1, color:"orange"},
      size: size,
      maxlife:life,
      life:life
    })
  },

  // MOVE
  move: function() {
    this.data.forEach( part =>  {

      const distance = getDistanceFrom(part.x, part.y, emitterX, emitterY);

      part.dx *= ACCEL;
      part.dy *= ACCEL;
      part.x += part.dx;
      part.y += part.dy;

      // part.size *= part.life/MAXLIFE;
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
  },

  // SETTING
  setParticle: function(shrink) {
    this.shrink = shrink;
  }

}