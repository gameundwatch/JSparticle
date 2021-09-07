//============================================
// SHAPE
//============================================

const shape = {

  type: null, // lower than 1 = "circle", 2 or highter = "polygon"
  inset: null,
  color: null,

  setShape: function(type, inset, color) {
    this.type = type;
    this.inset = inset;
    this.color = color;
  },

  drawShape: function(x, y, radius) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    if(this.shape == 0){

    }
    else if(this.type == 1){
      ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    }
    else {
      ctx.moveTo(0, -radius);
      for (let i = 0; i < this.type; i++) {
        ctx.rotate(Math.PI/this.type);
        ctx.lineTo(0, 0 -radius*this.inset);
        ctx.rotate(Math.PI/this.type);
        ctx.lineTo(0, 0 -radius);
      }
    }
    ctx.restore();
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}