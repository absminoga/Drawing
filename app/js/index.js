class Canvas{
    constructor(){
        this.canvas = document.querySelector('.canvas');
        this.ctx = canvas.getContext('2d');
        
        this.pen = document.querySelector('.fa-pencil-alt'); 
        this.brush = document.querySelector('.fa-paint-brush');
        this.spray = document.querySelector('.fa-spray-can');

        
    }
  drawing(){
    console.log(1);
  }

}
let canvas = new Canvas();