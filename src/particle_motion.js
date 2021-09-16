//============================================
// FORCE
//============================================

const force = {

  angle: null,
  delta: null,
  power:  null,
  random_seed: null,
  
  setForce: function(angle, delta, power) {
    this.angle = angle;
    this.delta = delta;
    this.power = power;
  },

  forceX: function(life, maxlife) {

    return this.power * Math.cos( ( foldIn360(this.angle + xors.rand_range(this.delta)) *Math.PI) /180 );
  },

  forceY: function(life, maxlife) {

    return this.power * Math.sin( ( foldIn360(this.angle + xors.rand_range(this.delta)) *Math.PI) /180 );
  },

}