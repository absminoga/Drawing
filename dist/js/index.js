class Canvas{
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.draw = false;
        
        this.btnPencil = document.querySelector('.fa-pencil-alt');
        this.btnHeart = document.querySelector('.fa-heart');
        this.btnCircle = document.querySelector('.fa-circle');
        this.btnSquare = document.querySelector('.fa-square');
        this.btnDown = document.querySelector('.btn_down'); 
        this.btnUp = document.querySelector('.btn_up'); 
        this.btnDelete = document.querySelector('.btn_clean'); 
        this.btnEraser = document.querySelector('.fa-eraser');
        this.Cointer =  1;
        this.valueCointer = document.querySelector('.size_value');
        this.colorLine = document.querySelector('.block_color_value');

        this.btnPencil.onclick = () => this.paintPicture();
        this.btnCircle.onclick = () => this.paintCircle();
        this.btnSquare.onclick = () => this.paintSquare();
        this.btnDown.onclick = () => this.deleteValueCounter();
        this.btnUp.onclick = () => this.addValueCounter();
        this.btnDelete.onclick = () => this.deletePicture();
        this.btnEraser.onclick = (e) => this.erasingPicture(e);
    
    }

  deleteValueCounter(){
    (this.Cointer<=1)?this.valueCointer.innerHTML = 1:
    this.Cointer--;
    this.valueCointer.innerHTML = this.Cointer;
  }  
  addValueCounter(){
    this.Cointer++;
    this.valueCointer.innerHTML = this.Cointer;
  }  
  getMousPosition(e){
    let coords = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - coords.left) / (coords.right - coords.left) * this.canvas.width,
			y: (e.clientY - coords.top) / (coords.bottom - coords.top) * this.canvas.height
    }
   } 
   deletePicture(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
   }
// ---------- Paint picture ------------
paintPicture(e){
  this.canvas.onmousedown = (e) => {
    this.draw = true;
  this.canvas.onmousemove = (e) => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.getMousPosition(e).x,this.getMousPosition(e).y);
    if(this.draw){
      this.ctx.lineWidth = this.Cointer;
      this.ctx.strokeStyle = this.colorLine.value;
      this.ctx.lineCap = 'square';
      this.ctx.lineJoin = 'square';
      this.ctx.lineTo(this.getMousPosition(e).x,this.getMousPosition(e).y);
      this.ctx.stroke();
    }
  };
  this.canvas.onmouseup = (e) => this.draw = false;
  };  
}
// ---------- Erasing picture ------------ 
 erasingPicture(e){
  this.canvas.onmousedown = (e) => {
    this.canvas.onmousemove = (e) => {
      this.ctx.beginPath();
      this.ctx.moveTo(this.getMousPosition(e).x,this.getMousPosition(e).y);
      this.ctx.lineWidth = this.Cointer;
      this.ctx.strokeStyle = "rgb(255, 255, 255)";
      this.ctx.lineTo(this.getMousPosition(e).x-2,this.getMousPosition(e).y-2);
      this.ctx.stroke();
    }
    this.canvas.onmouseup = (e) => {
      this.canvas.onmousemove = null;
    }
     } 
  }
  // ---------- Add figure ------------ 
  paintSquare(e){
  this.canvas.onmousedown = (e) => {
    this.draw = true;
    this.ctx.beginPath();
    this.ctx.moveTo(this.getMousPosition(e).x,this.getMousPosition(e).y);
    if(this.draw){
      this.ctx.strokeStyle = this.colorLine.value;
      this.ctx.rect(this.getMousPosition(e).x, this.getMousPosition(e).y, this.Cointer*1.5, this.Cointer);
      this.ctx.stroke();
    }
    }
}
  paintCircle(){
    this.canvas.onmousedown = (e) => {
      this.draw = true;
      this.ctx.beginPath();
      this.ctx.moveTo(this.getMousPosition(e).x,this.getMousPosition(e).y);
      if(this.draw){
        this.ctx.fillStyle = this.colorLine.value;
        this.ctx.arc(this.getMousPosition(e).x, this.getMousPosition(e).y, this.Cointer, 0, Math.PI*2, false);
        this.ctx.fill();
        this.ctx.stroke();
      }
      }
  }
  
}

let canvas = new Canvas();

