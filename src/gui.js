
const inputs = {

  //============================================
  // PARTICLE SETTINGS
  //============================================

  PART_SPREAD_X:  document.getElementById('PART_SPREAD_X'),
  PART_SPREAD_Y:  document.getElementById('PART_SPREAD_Y'),
  
  PART_SPEED:     document.getElementById('PART_SPEED'),
  PART_MAXVALUE:  document.getElementById('PART_MAXVALUE'),
  PART_SIZE:      document.getElementById('PART_SIZE'),          // particle size
  PART_LIFE:      document.getElementById('PART_LIFE'),     // particle max life
  PART_SHRINK:    document.getElementById('PART_SHRINK'),         // shrink curve. 1 is liner shrink. if it is higher than 1, shrinking speed is faster. if it is lower, slower. if 0, stable particle.

  //============================================
  // SHAPE SETTINGS
  //============================================

  SHAPE_TYPE:             document.getElementById('SHAPE_TYPE'),               // shape type : 1 is circle, 2 is line, 3 or higher is polygon. 
  SHAPE_INSET:            document.getElementById('SHAPE_INSET'),              // inside verticle to make star shape. 1 is flat.
  SHAPE_DEFAULT_ANGLE:   document.getElementById('SHAPE_DEFAULT_ANGLE'),    // default shape degree
  SHAPE_SPIN_SPEED:       document.getElementById('SHAPE_SPIN_SPEED'),         // negative value ... clockwise rotation.

  SHAPE_BODY_COLOR:       document.getElementById('SHAPE_BODY_COLOR'),
  SHAPE_BODY_ALPHA:       document.getElementById('SHAPE_BODY_ALPHA'),
  SHAPE_LINE_COLOR:       document.getElementById('SHAPE_LINE_COLOR'),
  SHAPE_LINE_ALPHA:       document.getElementById('SHAPE_LINE_ALPHA'),

  SHAPE_SHADOW_OFFSET_X:  document.getElementById('SHAPE_SHADOW_OFFSET_X'),
  SHAPE_SHADOW_OFFSET_Y:  document.getElementById('SHAPE_SHADOW_OFFSET_Y'),
  SHAPE_SHADOW_BLUR:      document.getElementById('SHAPE_SHADOW_BLUR'),
  SHAPE_SHADOW_COLOR:     document.getElementById('SHAPE_SHADOW_COLOR'),

//============================================
// MOTION SETTINGS
//============================================

MOTION_ACCEL: 1,         // particle acceleration curve.

MOTION_FORCE_DEGREE: -90,
MOTION_FORCE_POWER: 0.01,

  getInputValue : function (key) {
    console.log(this[key].value);
    return this[key].value;
  }
};

// const input_PART_SPEED = document.getElementById('PART_SPEED');

const currentValueElem = document.getElementById('current-value'); // 埋め込む先のspan要素

const setCurrentValue = (val) => {
  currentValueElem.innerText = val;
}



