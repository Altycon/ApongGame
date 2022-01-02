
class Field{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.demensions = this.canvas.getBoundingClientRect();
        this.canvas.width = this.demensions.width;
        this.canvas.height = this.demensions.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.top = this.demensions.top;
        this.right = this.demensions.right;
        this.bottom = this.demensions.bottom;
        this.left = this.demensions.left;
        //this.canvas.style.border = '1px solid blue';
    }
}