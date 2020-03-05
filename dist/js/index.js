class Canvas{
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        let draw = false;

        this.pen = document.querySelector('.fa-pencil-alt'); 
        this.brush = document.querySelector('.fa-paint-brush');
        this.spray = document.querySelector('.fa-spray-can');
        

        this.canvas.onmousedown = (e) => this.addCanvasElement(e);
        this.canvas.onmousemove = (e) => this.drawing(e);
        this.canvas.onmouseup = (e) => this.outDrawwing(e);

        this.canvas

    }

   getMousPosition(e){
    let coords = this.canvas.getBoundingClientRect();
    return {
      y: e.clientY - coords.top,
      x: e.clientX -coords.left
    }
   
   } 
  addCanvasElement(e){
    this.ctx.beginPath();
    this.ctx.moveTo(this.getMousPosition(e).x,this.getMousPosition(e).y);
    this.draw = true;
    
  }  
  drawing(e){
    if(this.draw){
      this.sizeSmall = 1;
      console.log(this.sizeSmall);
      
    }
  }
 outDrawwing(e){
  this.draw = false;
 }
}
let canvas = new Canvas();