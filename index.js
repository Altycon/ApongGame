/*
    ATTEMPT TO PUT ALL LISTENERS INTO A FUNCTION TO BE CALLED WITH INIT

    FIGURE OUT RESIZING OF CANVAS WHEN WINDOW CHANGES --- Already tried everything and nothing works

    KEEP WORKING ON PADDLE AND BALL COLLISIONS
        -ball and paddle clip when coming into contact on left and right sides when paddle is moving towards ball
        -I think this has something to do with the y velocity changing only if its farther than paddle x
        - I need to change the x velocity when the ball x + r > paddle x + w || < paddle x

*/



document.addEventListener('DOMContentLoaded', init);

function init(){

    let StoredRecords = localStorage.getItem('HighScores') ? JSON.parse(localStorage.getItem('HighScores')) : localStorage.setItem('HighScores', JSON.stringify([]));

    AddRecordsFromStorage(StoredRecords);

    // Initialize all objects to be displayed

    
    let field = new Field(canvas);
    let paddle = new Paddle(field);
    let ball = new Ball(field, (field.width/2), 25, 10);    // Figure a ratio for the radius relative to window size
    let scoreboard = new ScoreBoard(ScoreOutput, LevelOutput, TimerOutput);
    let game = new Game(field, paddle, ball, scoreboard);

    //game.renderGame();

    // Controls
    addColorInputListeners();
    addKeyListeners(paddle);
    document.addEventListener('keypress',(ev)=>{
        let char = ev.key;
        switch(char){
            case 's':
                BeginGame();
            break;
            case 'r':
                ResetGame();
            break;
        }
        
    });
    ConfirmSaveButton.addEventListener('click',(ev)=>{
        ev.preventDefault();
        const ScoreObject = GetScore();
        SaveScoreToStorage(ScoreObject);

        // UPDATE THE HIGHSCORE PAGE

        CloseSaveMenu();
        NameInput.value = "";
    });
    CancelSaveButton.addEventListener('click', (ev)=>{
        ev.preventDefault();
        
        CloseSaveMenu();

        // Do not clear the innerText of the elements so any unsaved score will still be stored in the element text field;
    });
    
    BeginButton.addEventListener('click', (ev)=>{
        // Begin Game
        BeginGame();
        BeginButton.style.animation = 'buttonPressed 250ms linear forwards';
        AgainButton.style.animation = 'none';
    });
    AgainButton.addEventListener('click', (ev)=>{
        // Reset Game
        ResetGame();
        BeginButton.style.animation = 'none';
        AgainButton.style.animation = 'buttonPressed 250ms linear forwards';
    });
    SaveButton.addEventListener('click', (ev)=>{
        ev.preventDefault();
        
        OpenSaveMenu();
        DisplayDataToSave(scoreboard);
    });
    

    MenuButton.addEventListener('click', (ev)=>{
        document.querySelector('.menu').classList.toggle('open'); 
    });

    HighScoresButton.addEventListener('click', (ev)=>{
        document.querySelector('.highscore-page').classList.add('retrieve-scores');
    });
    CloseHighScoresButton.addEventListener('click', (ev)=>{
        document.querySelector('.highscore-page').classList.remove('retrieve-scores');
    });
    canvas.addEventListener('mousedown',(ev)=>{
        ev.preventDefault();
        pointerPosition.x = ev.clientX;
        pointerPosition.y = ev.clientY;
        if(pointerPosition.x < field.width/2){
            paddle.speed = 10;
            paddle.moveLeft = true;
        }else if(pointerPosition.x > field.width/2){
            paddle.speed = 10;
            paddle.moveRight = true;
        }
    });
    canvas.addEventListener('mouseup',(ev)=>{
        paddle.speed = 0;
        paddle.moveLeft = false;
        paddle.moveRight = false;
    });
    canvas.addEventListener('touchstart',(ev)=>{
        ev.preventDefault();
        pointerPosition.x = ev.touches[0].clientX;
        pointerPosition.y = ev.touches[0].clientY;
        if(pointerPosition.x < field.width/2){
            paddle.speed = 10;
            paddle.moveLeft = true;
        }else if(pointerPosition.x > field.width/2){
            paddle.speed = 10;
            paddle.moveRight = true;
        }
    });
    canvas.addEventListener('touchend',(ev)=>{
        paddle.speed = 0;
        paddle.moveLeft = false;
        paddle.moveRight = false;
    });
    // Animating
    function animate(){
        field.ctx.clearRect(0,0,field.width,field.height);
        game.renderGame();
        requestAnimationFrame(animate);
    }
    animate();


    function BeginGame(){
        ball.speed = 5;
        let v = new UnitVector().multiply(ball.speed);
        ball.velocity = v;

        interval = setInterval(StartTimer,1000); 
    }
    function ResetGame(){
        ball.position = ball.startingPosition;
        ball.velocity = new Vector(0,0);
        scoreboard.reset();
        clearInterval(interval);
    }

    function StartTimer(){
        scoreboard.second++;

        if(scoreboard.second % 30 === 0){
            scoreboard.level++;
        }
        if(scoreboard.second % 60 === 0){
            scoreboard.second = 0;
            scoreboard.minute++
        }

        if(scoreboard.second > 9){
            scoreboard.time = `${scoreboard.minute}:${scoreboard.second}`;
        }else{
            scoreboard.time = `${scoreboard.minute}:0${scoreboard.second}`;
        }
        
    }

    function AddRecordsFromStorage(StoredRecords){
        const RecordsTableBody = document.querySelector('tbody');
        if(StoredRecords.length === 0){
            let p = document.createElement('p');
            p.style.color = 'var(--text-color)';
            p.style.textAlign = 'center';
            p.style.padding = '1rem';
            p.innerText = 'You should play the game first';
            document.querySelector('.highscore-page-content').appendChild(p);
            
        }else{
            
        StoredRecords.forEach( record =>{
            let row = document.createElement('tr');
            row.innerHTML = `<td>${record.id}</td>
                            <td>${record.score}</td>
                            <td>${record.level}</td>
                            <td>${record.time}</td>`;
            RecordsTableBody.appendChild(row);
        });
        }
    }

    
}



function addColorInputListeners(){
    PrimaryColorInput.addEventListener('change', (ev)=>{
        root.style.setProperty('--primary-color', ev.target.value);
    });
    ButtonsColorInput.addEventListener('change', (ev)=>{
        root.style.setProperty('--buttons-color', ev.target.value);
    });
    TextColorInput.addEventListener('change', (ev)=>{
        root.style.setProperty('--text-color', ev.target.value);
    });
    

    BallColorInput.addEventListener('change', (ev)=>{
        ball.color = ev.target.value;
    });
    PaddleColorInput.addEventListener('change', (ev)=>{
        paddle.color = ev.target.value;
    });
    TableColorInput.addEventListener('change', (ev)=>{
        root.style.setProperty('--table-color', ev.target.value);
    });
}

function addKeyListeners(paddle){
    document.addEventListener('keydown', (ev)=>{
        let char = ev.key;
    switch(char){
        case 'ArrowLeft':
            // move paddle up
            paddle.speed = 10;
            paddle.moveLeft = true;
            break;
        case 'ArrowRight':
            // move paddle down
            paddle.speed = 10;
            paddle.moveRight = true;
        break;
    }
    });
    document.addEventListener('keyup', (ev)=>{
        let char = ev.key;
        switch(char){
            case 'ArrowLeft':
                // stop paddle moving
                paddle.speed = 0;
                paddle.moveLeft = false;
                break;
            case 'ArrowRight':
                // stop paddle moving
                paddle.speed = 0;
                paddle.moveRight = false;
            break;
        }
    });


}

function OpenSaveMenu(){
    document.querySelector('.saving-container').classList.add('open-save-menu');
    document.querySelectorAll('.decorative-bar').forEach(bar => bar.classList.add('extend-bar'));
    document.querySelector('.saving-container-content').classList.add('fadeIn');
}

function DisplayDataToSave(scoreboard){
    // display scoreboard data in Save display fields
    document.getElementById('SaveScoreDataDisplay').innerText = scoreboard.score;
    document.getElementById('SaveLevelDataDisplay').innerText = scoreboard.level;
    document.getElementById('SaveTimeDataDisplay').innerText = scoreboard.time;
}
function CloseSaveMenu(){
    document.querySelector('.saving-container').classList.remove('open-save-menu');
    document.querySelectorAll('.decorative-bar').forEach(bar => bar.classList.remove('extend-bar'));
    document.querySelector('.saving-container-content').classList.remove('fadeIn');
}

function GetScore(){
    obj = {
        id: NameInput.value,
        score: document.getElementById('SaveScoreDataDisplay').innerText,
        level: document.getElementById('SaveLevelDataDisplay').innerText,
        time: document.getElementById('SaveTimeDataDisplay').innerText
    }
    return obj;
}
function SaveScoreToStorage(score){
    const storage = JSON.parse(localStorage.getItem('HighScores'));
    storage.push(score)
    localStorage.setItem('HighScores', JSON.stringify(storage))
}
