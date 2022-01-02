
class ScoreBoard{
    constructor(scoreOutput, levelOutput, timerOutput){
        this.score = 0;
        this.level = 0;
        this.second = 0;
        this.minute = 0;
        this.time = `0:00`;
        this.scoreOutput = scoreOutput;
        this.levelOutput = levelOutput;
        this.timerOutput = timerOutput;
    }
    displayData(){
        this.scoreOutput.innerText = this.score;
        this.levelOutput.innerText = this.level;
        this.timerOutput.innerText = this.time;
    }
    reset(){
        this.score = 0;
        this.level = 0;
        this.second = 0;
        this.minute = 0;
        this.time = `0:00`;
    }
    
}