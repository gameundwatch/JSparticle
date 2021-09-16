
//============================================
// PARTICLE
//============================================
const particle = {
  
  x: null,
  y: null,
  dx: null,
  dy: null,
  maxlife: null,
  life: null,
  value: null,
  size: null,
  wipeInTime: null,
  wipeInCurve: null,
  wipeOutTime: null,
  wipeOutCurve: null,
  speed: null,
  shape: shape,
  force: force,
  data:[],

  // DRAW
  draw: function() {
    this.data.forEach( part =>  {
      if (part.life >= 0){
        part.shape.drawShape(part.x, part.y, part.size, part.life, part.maxlife);
      }
    })
  },

  // GENERATE
  generate: function(posx, posy, spreadx, spready, life) {
    let degree = xors.rand_range(360);
     this.data.push({
      x: posx + Math.cos(degree) * spreadx,
      y: posy + Math.sin(degree) * spready,
      dx: this.speed*( Math.cos( (getRandomInt(360)*Math.PI) /180 )),
      dy: this.speed*( Math.sin( (getRandomInt(360)*Math.PI) /180 )),
      shape: shape,
      force: force,
      size: this.size,
      maxlife:life,
      life:life
    });
  },

  // MOVE
  move: function() {
    this.data.forEach( part =>  {

      part.dx += part.force.forceX(part.life, part.maxlife);
      part.dy += part.force.forceY(part.life, part.maxlife);

      part.x += part.dx;
      part.y += part.dy;
    })
  },


  resize: function () {
    // lifeはParticle生成時にMaxlifeと同値で定義され、そこから１フレームごとに減算される。
    // そのため0からMaxlifeの順に時間を進めるのではなく、Maxlifeから0へと時間が進む。 

    this.data.forEach( part =>  {

      let wipeInStartTime = part.maxlife;
      let wipeInEndTime = part.maxlife - part.maxlife * this.wipeInTime;
   
      let wipeOutStartTime = part.maxlife * this.wipeOutTime;
      let wipeOutEndTime = 0;

      let wipeInFactor = (wipeInStartTime - part.life) / (wipeInStartTime - wipeInEndTime);
      let wipeOutFactor = part.life  / (wipeOutStartTime - wipeOutEndTime);
      let wipeInSize = this.size * Math.pow(wipeInFactor, getTrueCurve(this.wipeInCurve) );
      let wipeOutSize = this.size * Math.pow(wipeOutFactor, getTrueCurve(this.wipeOutCurve) );

      part.size = Math.min( this.size, wipeInSize, wipeOutSize );
    })
  },

  // ERASE
  erase: function() {
    this.data.forEach((part, index) =>  {
      part.life -= 1;
      if (part.life <= 0) {
        this.data.splice(index, 1);
      }
    })
    
    if(this.value < this.data.length){
      this.data.splice(0, 1);
    }
    
  },

  // SETTING
  setParticle: function(value, size, speed, wipeInTime, wipeInCurve, wipeOutTime, wipeOutCurve) {
    this.value = value;
    this.size = size;
    this.speed = speed;
    this.wipeInTime = wipeInTime;
    this.wipeInCurve = wipeInCurve;
    this.wipeOutTime = wipeOutTime;
    this.wipeOutCurve = wipeOutCurve;
  }

}