const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var emitterX = null;
var emitterY = null;
var togglefire = false;
var counter = 0;

const SPEED = 1;          // particle speed
const SIZE = 40;           // particle size
const MAXLIFE = 2000;     // particle max life
const SHRINK = 1;         // shrink curve. 1 is liner shrink. if it is higher than 1, shrinking speed is faster. if it is lower, slower. if 0, stable particle.
const ACCEL = 1;          // particle acceleration curve.

const SHAPE_TYPE = 1;               // shape type : 1 is circle, 2 is line, 3 or higher is polygon. 
const SHAPE_INSET = 1;              // inside verticle to make star shape. 1 is flat.
const SHAPE_DEFAULT_ROTATE = 90;    // default shape degree
const SHAPE_SPIN_SPEED = 4;         // negative value ... clockwise rotation.
const SHAPE_BODY_COLOR = "white";
const SHAPE_LINE_COLOR = "cyan";


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
  shape: shape,
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
      size:size,
      // color:'hsl(' + hue + ',100%,50%)', // color test
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
      part.size *= Math.pow(part.life/MAXLIFE, SHRINK);

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
  }

}

const init = () => {

  emitterX = canvas.width / 2;
  emitterY = canvas.height / 2;

  particle.shape.setShape(
    SHAPE_TYPE, 
    SHAPE_INSET, 
    SHAPE_DEFAULT_ROTATE,
    SHAPE_SPIN_SPEED,
    SHAPE_BODY_COLOR,
    SHAPE_LINE_COLOR
    );

}

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (togglefire) {
    particle.generate(emitterX, emitterY, SPEED, SIZE, MAXLIFE); 
  }

  particle.move();
  particle.erase();

  particle.draw();

  console.log(particle.data);

  window.requestAnimationFrame(loop);
}

init();
loop();

document.addEventListener('mousemove', function(e) {
  emitterX = e.x;
  emitterY = e.y;
});

document.addEventListener('mousedown', function(e) {
  togglefire = true;
});

document.addEventListener('mouseup', function(e) {
  togglefire = false;
});