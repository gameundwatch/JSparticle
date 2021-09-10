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

/*
const PART_SPEED = 1;          // particle speed
const PART_MAXVALUE = 1000;
const PART_SIZE = 5;          // particle size
const PART_LIFE = 200;     // particle max life
const PART_SHRINK = 0.01;         // shrink curve. 1 is liner shrink. if it is higher than 1, shrinking speed is faster. if it is lower, slower. if 0, stable particle.

//============================================
// SHAPE SETTINGS
//============================================

const SHAPE_TYPE = 2;               // shape type : 1 is circle, 2 is line, 3 or higher is polygon. 
const SHAPE_INSET = 1;              // inside verticle to make star shape. 1 is flat.
const SHAPE_DEFAULT_ROTATE = 90;    // default shape degree
const SHAPE_SPIN_SPEED = 4;         // negative value ... clockwise rotation.

const SHAPE_BODY_COLOR = "white";
const SHAPE_BODY_ALPHA = 0;
const SHAPE_LINE_COLOR = "#11BBEE";
const SHAPE_LINE_ALPHA = 0.8;

const SHAPE_SHADOW_OFFSET_X = 0;
const SHAPE_SHADOW_OFFSET_Y = 0;
const SHAPE_SHADOW_BLUR = 2;
const SHAPE_SHADOW_COLOR = "#008844";

//============================================
// MOTION SETTINGS
//============================================

const MOTION_ACCEL = 1;         // particle acceleration curve.

const MOTION_FORCE_DEGREE = -90;
const MOTION_FORCE_POWER = 0.01;

*/

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
    Number(inputs.SHAPE_DEFAULT_ROTATE.value),
    Number(inputs.SHAPE_SPIN_SPEED.value),

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
    inputs.PART_SHRINK.value
  );

  force.setForce ( 
    inputs.MOTION_FORCE_DEGREE, 
    inputs.MOTION_FORCE_POWER 
  );

  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  if (togglefire) {
    particle.generate(emitterX, emitterY, inputs.PART_SPEED.value, inputs.PART_SIZE.value, inputs.PART_LIFE.value); 
  }

  particle.move();
  particle.transform();
  particle.erase();

  particle.draw();

  // console.log(JSON.parse(JSON.stringify(particle.data)));
  window.requestAnimationFrame(loop);
}

init();
loop();

// WINDOW IS LOADED

window.onload = () => {
  for( let key in inputs ){
    inputs[key].addEventListener('input', rangeOnChange); // スライダー変化時にイベントを発火
    setCurrentValue(inputs[key].value); // ページ読み込み時に値をセット
  }  

}

// EVENTS

// inputイベント時に値をセットする関数
const rangeOnChange = (e) =>{
  setCurrentValue(e.target.value);
}

document.addEventListener('mousemove', function(e) {
  var rect = canvas.getBoundingClientRect();
  emitterX = e.x - rect.left;
  emitterY = e.y - rect.top;
});

document.addEventListener('mousedown', function(e) {
  togglefire = true;
});

document.addEventListener('mouseup', function(e) {
  togglefire = false;
});

