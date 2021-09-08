//============================================
// FORCE
//============================================

const force = {

  degree: null,
  power:  null,
  random_seed: null,
  
  setForce: function(degree, power) {
    this.degree = degree;
    this.power = power;
  },

  forceX: function() {
    return this.power * Math.cos( (this.degree*Math.PI) /180 );
  },

  forceY: function() {
    return this.power * Math.sin( (this.degree*Math.PI) /180 );
  }

}