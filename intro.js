
const PlayButton = document.getElementById('PlayButton');

PlayButton.addEventListener('click', (ev)=>{
    ev.target.style.animation = 'buttonPressed 250ms linear forwards';
    removeIntro();
});

function removeIntro(){
    const StartingMenu = document.querySelector('.starting-menu');
    StartingMenu.classList.add('remove');
    document.querySelector('.menu').classList.add('open');
    ballStopped = false;
}
