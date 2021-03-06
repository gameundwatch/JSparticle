const canvas = document.getElementById('viewer');
const ctx = canvas.getContext('2d');

// canvas.height = window.innerHeight;
// canvas.width = window.innerWidth;

canvas.height = 720;
canvas.width = 1280;

var emitterX = null;
var emitterY = null;
var togglefire = false;
var counter = 0;

function isInCanvas (x, y) {
  if ((0 <= x && x < canvas.width) && (0 <= y && y < canvas.height)) {
    return true;
  }
  else {
    return false;
  }
}


//============================================
// MOTION SETTINGS
//============================================

const MOTION_ACCEL = 1;         // particle acceleration curve.

const MOTION_FORCE_DEGREE = -90;
const MOTION_FORCE_POWER = 0.01;

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

}

//============================================
// MAIN LOOP
//============================================

const loop = () => {

  particle.shape.setShape (
    inputs.SHAPE_TYPE.value, 
    inputs.SHAPE_INSET.value, 
    Number(inputs.SHAPE_DEFAULT_ANGLE.value),
    Number(inputs.SHAPE_SPIN_SPEED.value),

    inputs.PART_FADEIN_TIME.value,
    inputs.PART_FADEIN_CURVE.value,
    inputs.PART_FADEOUT_TIME.value,
    inputs.PART_FADEOUT_CURVE.value,

    inputs.SHAPE_BODY_COLOR.value,
    inputs.SHAPE_BODY_ALPHA.value,
    inputs.SHAPE_LINE_COLOR.value,
    inputs.SHAPE_LINE_ALPHA.value,

    inputs.SHAPE_SHADOW_OFFSET_X.value,
    inputs.SHAPE_SHADOW_OFFSET_Y.value,
    inputs.SHAPE_SHADOW_BLUR.value,
    inputs.SHAPE_SHADOW_COLOR.value
  );

  particle.setParticle (
    inputs.PART_MAXVALUE.value,
    inputs.PART_SIZE.value, 
    inputs.PART_SPEED.value,
    inputs.PART_WIPEIN_TIME.value,
    inputs.PART_WIPEIN_CURVE.value,
    inputs.PART_WIPEOUT_TIME.value,
    inputs.PART_WIPEOUT_CURVE.value
  );

  force.setForce ( 
    Number(inputs.MOTION_FORCE_ANGLE.value), 
    Number(inputs.MOTION_FORCE_DELTA.value),
    inputs.MOTION_FORCE_POWER.value
  );

  ctx.clearRect(0, 0, canvas.width, canvas.height);  

  if (togglefire) {
    particle.generate(
      emitterX, 
      emitterY,
      inputs.PART_SPREAD_X.value,
      inputs.PART_SPREAD_Y.value,
      inputs.PART_LIFE.value
    ); 
  }

  particle.move();
  particle.resize();
  particle.erase();

  particle.draw();

  console.log(JSON.parse(JSON.stringify(particle.data)));
  window.requestAnimationFrame(loop);
}

init();
loop();

// input?????????????????????????????????????????????
const rangeOnChange = (e) =>{
  setCurrentValue(e.target.value);
}

// EVENTS
// WINDOW IS LOADED

window.onload = () => {
  for( let key in inputs ){
    console.log(inputs[key]);
    inputs[key].addEventListener('input', rangeOnChange); // ????????????????????????????????????????????????
    setCurrentValue(inputs[key].value); // ??????????????????????????????????????????
  }  

}

document.addEventListener('mousemove', function(e) {
  var rect = canvas.getBoundingClientRect();
  emitterX = e.x - rect.left;
  emitterY = e.y - rect.top;
});

document.addEventListener('mousedown', function(e) {
  var rect = canvas.getBoundingClientRect();
  if (isInCanvas(e.x-rect.left, e.y-rect.top))
    togglefire = true;
  else
    togglefire = false;
});

document.addEventListener('mouseup', function(e) {
  togglefire = false;
});

