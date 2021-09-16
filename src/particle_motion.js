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

  forceX: function() {


    return this.power * Math.cos( ( this.angle *Math.PI) /180 );
  },

  forceY: function() {

    
    return this.power * Math.sin( ( this.angle *Math.PI) /180 );
  }

}