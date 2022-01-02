
const PrimaryColorInput = document.getElementById('PrimaryColorInput');
const ButtonsColorInput = document.getElementById('ButtonsColorInput');
const TextColorInput = document.getElementById('TextColorInput');
const BallColorInput = document.getElementById('BallColorInput');
const PaddleColorInput = document.getElementById('PaddleColorInput');
const TableColorInput = document.getElementById('TableColorInput');

const root = document.querySelector(':root');


const canvas = document.getElementById('canvas');
// const canvasDemensions = canvas.getBoundingClientRect();
// canvas.width = canvasDemensions.width;
// canvas.height = canvasDemensions.height;
// const cw = canvas.width;
// const ch = canvas.height;

const ScoreOutput = document.getElementById('ScoreOutput');
const LevelOutput = document.getElementById('LevelOutput');
const TimerOutput = document.getElementById('TimerOutput');

const BeginButton = document.getElementById('BeginButton');
const AgainButton = document.getElementById('AgainButton');
const MenuButton = document.getElementById('MenuButton');
const SaveButton = document.getElementById('SaveButton');

const NameInput = document.getElementById('NameInput');

const HighScoresButton = document.getElementById('HighScoresButton');
const CloseHighScoresButton = document.getElementById('CloseHighScoresButton');

const ConfirmSaveButton = document.getElementById('ConfirmSaveButton');
const CancelSaveButton = document.getElementById('CancelSaveButton');

let interval;

let pointerPosition = {
    x: null,
    y: null
}

let positions = {
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0
}



