
class Ball{
    constructor(field,x,y,r){
        this.field = field;
        this.ctx = this.field.ctx;
        this.position = new Vector(x,y);
        this.startingPosition = new Vector(this.position.x, this.position.y);
        this.currentVelocity = null;
        this.radius = r;
        this.speed = 0;
        this.velocity = new Vector(0,0);
        this.color = '#fff';
    }
    move(){
        
        if(this.hitsRightSide() || this.hitsLeftSide()){
            this.velocity.x = this.velocity.x * -1;
        }else if(this.hitsTop()){
            this.velocity.y = this.velocity.y * -1;
        }else if(this.hitsBottom()){
            this.position = this.startingPosition;
        } 
        this.position = this.position.add(this.velocity);
        this.draw();
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        this.ctx.fill();
    }
    hitsBottom(){
        return (this.position.y + this.radius > this.field.height);
    }
    hitsTop(){
        return (this.position.y - this.radius < 0);
    }
    hitsRightSide(){
        return (this.position.x + this.radius > this.field.width);
    }
    hitsLeftSide(){
        return (this.position.x - this.radius < 0);
    }
    reset(){
        
    }
}