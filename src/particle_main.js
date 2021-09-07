const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var emitterX = null;
var emitterY = null;
var togglefire = false;
var counter = 0;

const PART_SPEED = 1;          // particle speed
const PART_MAXVALUE = 200;
const PART_SIZE = 40;          // particle size
const PART_LIFE = 200;     // particle max life
const PART_SHRINK = 0.5;         // shrink curve. 1 is liner shrink. if it is higher than 1, shrinking speed is faster. if it is lower, slower. if 0, stable particle.

const MOTION_ACCEL = 1;          // particle acceleration curve.

//============================================
// SHAPE SETTINGS
//============================================

const SHAPE_TYPE = 2;               // shape type : 1 is circle, 2 is line, 3 or higher is polygon. 
const SHAPE_INSET = 1;              // inside verticle to make star shape. 1 is flat.
const SHAPE_DEFAULT_ROTATE = 90;    // default shape degree
const SHAPE_SPIN_SPEED = 4;         // negative value ... clockwise rotation.

const SHAPE_BODY_COLOR = "#AAddff";
const SHAPE_BODY_ALPHA = 0.2;
const SHAPE_LINE_COLOR = "#0077AA";
const SHAPE_LINE_ALPHA = 0.8;

const SHAPE_SHADOW_OFFSET_X = 0;
const SHAPE_SHADOW_OFFSET_Y = 0;
const SHAPE_SHADOW_BLUR = 5;
const SHAPE_SHADOW_COLOR = 'black';

//============================================
// MOTION SETTINGS
//============================================



//============================================
// LOAD PARTICLE SYSTEM
//============================================

/*
function loadParticleSystem() {
  let script = document.createElement('script');
  script.src = "./src/particle_body.js"
  document.body.prepend(script);
}
loadParticleSystem();
*/

//============================================
// INIT
//============================================

const init = () => {

  emitterX = canvas.width / 2;
  emitterY = canvas.height / 2;

  particle.shape.setShape(
    SHAPE_TYPE, 
    SHAPE_INSET, 
    SHAPE_DEFAULT_ROTATE,
    SHAPE_SPIN_SPEED,

    SHAPE_BODY_COLOR,
    SHAPE_BODY_ALPHA,
    SHAPE_LINE_COLOR,
    SHAPE_LINE_ALPHA,

    SHAPE_SHADOW_OFFSET_X,
    SHAPE_SHADOW_OFFSET_Y,
    SHAPE_SHADOW_BLUR,
    SHAPE_SHADOW_COLOR
  );

  particle.setParticle (
    PART_MAXVALUE,
    PART_SHRINK
  );

}

//============================================
// MAIN LOOP
//============================================

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (togglefire) {
    particle.generate(emitterX, emitterY, PART_SPEED, PART_SIZE, PART_LIFE); 
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

