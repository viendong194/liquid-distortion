export default class Blob{
  constructor(){
    this.container = document.getElementsByClassName('canvas-container')[0];
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.numberPoint = 100;
    this.points = [];
    this.radius = 100;
    this.step = 0;
    this.angle = Math.PI*2/this.numberPoint;
    this.ctx.fillStyle = "#000";
    this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fill();
    this.draw();
    window.addEventListener('resize',this.resize,false);
  }
  draw = () =>{
    this.createPoints();
    this.drawBlob();
    this.animation();
  }
  drawBlob = () =>{
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#ff0";
    let _p1 = this.points[0];
    this.ctx.moveTo(_p1.x,_p1.y);
    for(let i = 0 ; i < this.points.length-1;i++){
      let check = this.points.length;
      // console.log(check)
      // console.log(1)
      let p1 = this.points[i];
      let p2 = this.points[i+1];
      let pc = {
        x:(p1.x+p2.x)/2,
        y:(p1.y+p2.y)/2
      }
      this.ctx.quadraticCurveTo(pc.x,pc.y,p2.x,p2.y);
    }
    let lastPoint = {
      x:(this.points[0].x+this.points[this.points.length-1].x)/2,
      y:(this.points[0].y+this.points[this.points.length-1].y)/2
    };
    this.ctx.fillStyle = "#ff0";
    this.ctx.quadraticCurveTo(lastPoint.x,lastPoint.y,this.points[0].x,this.points[0].y);
    this.ctx.stroke();
    this.ctx.fill();
  }
  handlePoints = () =>{
    
    for(let i=0;i<this.points.length;i++){
      let speed = {
        x:Math.cos(this.step)*(Math.random()*0.2-0.2),
        y:Math.sin(this.step)*(Math.random()*0.2-0.2)
      }
      if(i%2===0){
        this.points[i].x += speed.x;
        this.points[i].y += speed.y;  
      }else{
        this.points[i].x -= speed.x;
        this.points[i].y -= speed.y;  
      }
    }
  }
  createPoints = () =>{
    let centerPoint = {
      x:this.canvas.width/2,
      y:this.canvas.height/2
    };
    for(let i =1;i<this.numberPoint;i++){
      // console.log(1)
      let point = {
        x: centerPoint.x+this.radius*Math.cos(this.angle*i),
        y: centerPoint.y+this.radius*Math.sin(this.angle*i),
        division: this.angle*i,
        maxRange: centerPoint.x+this.radius*Math.cos(this.angle*i)+Math.random()*2+Math.random()*0.5+10,
        minRange: centerPoint.y+this.radius*Math.sin(this.angle*i)+Math.random()*2+Math.random()*0.5-10,
      }
      this.points.push(point);
    }
  }
  animation = () => {
    this.step+=0.1;
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = "#000";
    this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fill();
    this.drawBlob();
    this.handlePoints();
    
    window.requestAnimationFrame(this.animation);
  }
  resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = "#000";
    this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fill();
  }
}