
//============================================
// SHAPE
//============================================

const shape = {

  type: null, // lower than 1 = "circle", 2 or highter = "polygon"
  inset: null,
  angle: null,
  spin: null,

  // fade
  fadeInTime: null,
  fadeInCurve: null,
  fadeOutTime: null,
  fadeOutCurve: null,

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

  setShape: function(type, inset, angle, spin, fadeInTime, fadeInCurve, fadeOutTime, fadeOutCurve, bodyColor, bodyAlpha, lineColor, lineAlpha, shadowX, shadowY, shadowBlur, shadowColor) {
    this.type   = type;
    this.inset  = inset;
    this.angle  = angle;
    this.spin   = spin;

    this.fadeInTime = fadeInTime;
    this.fadeInCurve = fadeInCurve;
    this.fadeOutTime = fadeOutTime;
    this.fadeOutCurve = fadeOutCurve;

    this.body_color = bodyColor;
    this.body_alpha = bodyAlpha;
    this.line_color = lineColor;
    this.line_alpha = lineAlpha;

    this.shadow_x     = shadowX;
    this.shadow_y     = shadowY;
    this.shadow_blur  = shadowBlur;
    this.shadow_color = shadowColor;
  },

  drawShape: function(x, y, radius, life, maxlife) {
    let currentStep = maxlife - life;

    // FADING Process

    let fadeInStartTime = maxlife;
    let fadeInEndTime = maxlife - maxlife * this.fadeInTime;
 
    let fadeOutStartTime = maxlife * this.fadeOutTime;
    let fadeOutEndTime = 0;

    let fadeInFactor  = (fadeInStartTime - life) / (fadeInStartTime - fadeInEndTime);
    let fadeOutFactor = life  / (fadeOutStartTime - fadeOutEndTime);

    let fadeInAlpha = Math.pow(fadeInFactor, getTrueCurve(this.fadeInCurve) );
    let fadeOutAlpha = Math.pow(fadeOutFactor, getTrueCurve(this.fadeOutCurve) );

    let trueLineAlpha = this.line_alpha * Math.min(fadeInAlpha, fadeOutAlpha, 1);
    let trueBodyAlpha = this.body_alpha * Math.min(fadeInAlpha, fadeOutAlpha, 1);

    console.log(fadeInFactor);

    // DRAW Process

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
      ctx.rotate(( this.angle + this.spin * currentStep ) * Math.PI / 360 );
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
    ctx.globalAlpha = trueLineAlpha;
    ctx.strokeStyle = this.line_color;
    ctx.stroke();

    // body drawing
    ctx.globalAlpha = trueBodyAlpha;
    ctx.fillStyle = this.body_color;
    ctx.fill();

  },
}