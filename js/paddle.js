
class Paddle{
    constructor(field){
        this.field = field;
        this.ctx = this.field.ctx;
        this.width = Math.floor(this.field.width*.25);
        this.height = Math.floor(field.height*.025);
        (field.width/2) - Math.floor(field.width*.25)/2
        this.position = new Vector((this.field.width/2) - this.width/2, this.field.height - (this.field.height*.1));
        this.center = new Vector(this.position.x + (this.width/2), this.position.y + (this.height/2));
        this.speed = 0;
        this.velocity = new Vector(0,0);
        this.moveLeft = false;
        this.moveRight = false;
        // this.movingLeft = false;
        // this.movingRight = false;
        this.color = '#fff';
    }
    move(){

        if(this.moveLeft){
            this.velocity = new Vector(-1,0);
            this.moveRight = false;
        }
        if(this.moveRight){
            this.velocity = new Vector(1,0);
            this.moveLeft = false;
        }
        if(this.hitsLeftSide()){
            this.velocity.x = 1;
        }else if(this.hitsRightSide()){
            this.velocity.x = -1;
        }

        this.position = this.position.add(this.velocity.multiply(this.speed));
        this.center = new Vector(this.position.x + (this.width/2), this.position.y + (this.height/2));
        
        this.draw();
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.fill();
    }
    hitsLeftSide(){
        return (this.position.x < 0);
    }
    hitsRightSide(){
        return (this.position.x + this.width > this.field.width);
    }

}
