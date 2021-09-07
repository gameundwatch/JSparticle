//============================================
// SHAPE
//============================================

const shape = {

  type: null, // lower than 1 = "circle", 2 or highter = "polygon"
  inset: null,
  rotate: null,
  color: null,

  setShape: function(type, inset, rotate, spin, body_color, line_color) {
    this.type = type;
    this.inset = inset;
    this.rotate = rotate;
    this.spin = spin;
    this.body_color = body_color;
    this.line_color = line_color;
  },

  drawShape: function(x, y, radius) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    if (this.shape == 0) {
      // IMAGE IMPORT (FUTURE WORK)
    }
    else if (this.type == 1) {
      ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    }
    else {
      ctx.rotate( this.rotate*Math.PI / 360 )
      ctx.moveTo(0, -radius);
      for (let i = 0; i < this.type; i++) {
        ctx.rotate(Math.PI / this.type);
        ctx.lineTo(0, 0 -radius*this.inset);
        ctx.rotate(Math.PI / this.type);
        ctx.lineTo(0, 0 -radius);
      }
    }
    ctx.restore();
    ctx.closePath();
    ctx.strokeStyle = this.line_color;
    ctx.fillStyle = this.body_color;
    ctx.stroke();
    ctx.fill();

  },

  spinningShape: function() {
    this.rotate += this.spin;
  }

}