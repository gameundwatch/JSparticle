const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var emitterX = null;
var emitterY = null;
var togglefire = false;
var hue = 0; // color test
var counter = 0;

const SPEED = 1;          // particle speed
const SIZE = 2;           // particle size
const MAXLIFE = 2000;     // particle max life
const SHRINK = 1;         // shrink curve. 1 is liner shrink. if it is higher than 1, shrinking speed is faster. if it is lower, slower. if 0, stable particle.
const ACCEL = 1;          // particle acceleration curve.

// get RandomInt function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get Distance

function getDistanceFrom(x,y,fromX,fromY) { 
    return Math.sqrt( Math.pow(x-fromX, 2) + Math.pow(y-fromY, 2) );
}

const particle = {
  
  x: null,
  y: null,
  dx: null, // direction X
  dy: null, // direction Y
  size: null,
  color: null,
  life: null,
  data:[],

  //---------------
  // DRAW
  //---------------
  draw: function() {
    this.data.forEach( part =>  {
      if (part.size >= 0){
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, 2 * Math.PI, true);
        ctx.fillStyle = part.color;
        ctx.fill();
      }
    })
  },

  //---------------
  // GENERATE
  //---------------
  generate: function(posx, posy, speed, size, life) {
    this.data.push({
      x:posx,
      y:posy,
      dx:speed*( Math.cos( (getRandomInt(360)*Math.PI) /180 )),
      dy:speed*( Math.sin( (getRandomInt(360)*Math.PI) /180 )),
      size:size,
      color:'hsl(' + hue + ',100%,50%)', // color test
      life:life
    })
    hue++; // color test
  },

  //---------------
  // MOVE
  //---------------
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

  //---------------
  // ERASE
  //---------------
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

}

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (togglefire) {
    particle.generate(emitterX, emitterY, SPEED, SIZE, MAXLIFE); 
  }

  particle.move();
  particle.erase();

  particle.draw();

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