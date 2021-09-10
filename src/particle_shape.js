
//============================================
// SHAPE
//============================================

const shape = {

  type: null, // lower than 1 = "circle", 2 or highter = "polygon"
  inset: null,
  rotate: null,
  spin: null,

  // COLOR
  body_color: null,
  body_alpha: null,
  line_color: null,
  line_alpha: null,

  // SHADOW
  shadow_x: null,
  shadow_y: null,
  shadow_blur: null,
  shadow_color: null,

  setShape: function(type, inset, rotate, spin, bodyColor, bodyAlpha, lineColor, lineAlpha, shadowX, shadowY, shadowBlur, shadowColor) {
    this.type   = type;
    this.inset  = inset;
    this.rotate = rotate;
    this.spin   = spin;

    this.body_color = bodyColor;
    this.body_alpha = bodyAlpha;
    this.line_color = lineColor;
    this.line_alpha = lineAlpha;

    this.shadow_x     = shadowX;
    this.shadow_y     = shadowY;
    this.shadow_blur  = shadowBlur;
    this.shadow_color = shadowColor;
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

    // shadowing
    ctx.shadowOffSetX = this.shadow_x;
    ctx.shadowOffSetY = this.shadow_y;
    ctx.shadowBlur    = this.shadow_blur;
    ctx.shadowColor   = this.shadow_color;

    // line drawing
    ctx.globalAlpha = this.line_alpha;
    ctx.strokeStyle = this.line_color;
    ctx.stroke();

    // body drawing
    ctx.globalAlpha = this.body_alpha;
    ctx.fillStyle = this.body_color;
    ctx.fill();

  },

  spinning: function() {
    console.log(this);
    this.rotate += this.spin;
    if(this.rotate >= 360){
      this.rotate %= 360;
    }
  }

}