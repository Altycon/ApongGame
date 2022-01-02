

class Game{
    constructor(field, paddle, ball, scoreboard){
        this.field = field;
        this.ctx = field.ctx;
        this.paddle = paddle;
        this.pointOnPaddle = null;
        this.ball = ball;
        this.scoreboard = scoreboard;
        this.angle = Math.PI/4;
    }
    renderGame(){

        if(this.rectCircleColliding()){
            if(this.ball.position.x - this.ball.radius <= this.paddle.position.x ||
                this.ball.position.x + this.ball.radius >= this.paddle.position.x + this.paddle.width){
                this.ball.velocity.x = -this.ball.velocity.x;
            }else{
                this.ball.velocity.y = -this.ball.velocity.y;
                this.scoreboard.score++;
            }  
        }
        if(this.ball.hitsBottom()){
            this.ball.position = this.ball.startingPosition;
            this.velocity = new UnitVector();
            this.velocity.x = Math.random() < 0.5 ? -1 : 1;
            this.scoreboard.score--;
        }
        
        this.scoreboard.displayData();
        this.paddle.move();
        this.ball.move();
    }
    ballHitsPaddle(){
        this.pointOnPaddle = new Vector(
            clamp(this.paddle.position.x, this.paddle.position.x + this.paddle.width, this.ball.position.x),
            clamp(this.paddle.position.y, this.paddle.position.y + this.paddle.height, this.ball.position.y)
        );
        this.distanceToPaddleEdge = distanceBetween(this.ball.position, this.pointOnPaddle);

        // this.ctx.beginPath();
        // this.ctx.strokeStyle = 'yellow';
        // this.ctx.moveTo(this.ball.position.x, this.ball.position.y);
        // this.ctx.lineTo(this.pointOnPaddle.x, this.pointOnPaddle.y);
        // this.ctx.arc(this.pointOnPaddle.x, this.pointOnPaddle.y, 5, 0, 2*Math.PI);
        // this.ctx.stroke();

        return (this.distanceToPaddleEdge < this.ball.radius);
    }
    rectCircleColliding(circle,rect){
        let distanceX = Math.abs(this.ball.position.x - this.paddle.position.x - this.paddle.width/2);
        let distanceY = Math.abs(this.ball.position.y - this.paddle.position.y - this.paddle.height/2);

        if(distanceX > (this.paddle.width/2 + this.ball.radius)){return false};
        if(distanceY > (this.paddle.height/2 + this.ball.radius)){return false};

        if(distanceX <= (this.paddle.width/2)){return true};
        if(distanceY <= (this.paddle.height/2)){return true};

        let dx = distanceX - this.paddle.width/2;
        let dy = distanceY = this.paddle.height/2;
         return (dx * dx + dy * dy <= (this.ball.radius * this.ball.radius));
    }
}