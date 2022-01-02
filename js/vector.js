

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(vector){
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector){
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    multiply(scaler){
        return new Vector(this.x * scaler, this.y * scaler);
    }
    divide(scaler){
        return new Vector(this.x / scaler, this.y / scaler);
    }
    getMagnitude(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    setMagnitude(n){
        return this.normalize().multiply(n);
    }
    dotProduct(vector){
        return this.x * vector.x + this.y * vector.y;
    }
    normalize(){
        const length = this.getMagnitude();
        if(length !==0) this.multiply(1/length);
        return this;
    }
    getDirection(){
        return Math.atan2(this.x, this.y);
    }
}
class UnitVector{
    constructor(x,y){
        this.x = 1;
        this.y = 1;
    }
    add(vector){
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector){
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    multiply(scaler){
        return new Vector(this.x * scaler, this.y * scaler);
    }
    divide(scaler){
        return new Vector(this.x / scaler, this.y / scaler);
    }
    getMagnitude(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    setMagnitude(n){
        return this.normalize().multiply(n);
    }
    dotProduct(vector){
        return this.x * vector.x + this.y * vector.y;
    }
    normalize(){
        const length = this.getMagnitude();
        if(length !==0) this.multiply(1/length);
        return this;
    }
    getDirection(){
        return Math.atan2(this.x, this.y);
    }
    randomVector(){
        return new Vector(Math.random() < 0.5 ? -1 : 1, Math.random() < 0.5 ? -1 : 1);
    }
    randomX(){
        return new Vector(Math.random() < 0.5 ? -1 : 1, 1);
    }
    randomY(){
        return new Vector(1, Math.random() < 0.5 ? -1 : 1);
    }
}


function addVectors(vector1,vector2){
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
}
function subtractVectors(vector1,vector2){
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
}
function multiplyVector(vector, scaler){
    return new Vector(vector.x * scaler, vector.y * scaler);
}
function divideVector(vector1,scaler){
    return new Vector(vector1.x / scaler, vector1.y / scaler)
}
function distanceBetween(vector1,vector2){
    return Math.hypot(vector1.x - vector2.x, vector1.y - vector2.y);
}