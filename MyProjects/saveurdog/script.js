let score = 0;
let dog_run = document.getElementById('dog_run');
let restart = document.getElementById('restart');
let showscore = document.querySelector('.score');
let showgameover = document.querySelector('.showgameover');
let frame = 0;
let gameover = false;
document.onkeydown = function (e){
    if(!gameover){
        if(e.key == "ArrowUp"){
            dog = document.querySelector('.dog');
            clearInterval(myInterval);
            dog_run.src = "img/dog_run_cycle/3.png"
            dog.classList.add('jump');
            setTimeout(()=>{
                dog.classList.remove('jump');
                if(!gameover)
                    myInterval = setInterval(runAnimation, 100);
            },500);
        }
    }
}
myInterval = setInterval(runAnimation, 100);
function runAnimation(){
    dog_run.src = `img/dog_run_cycle/${(frame+1)}.png`;
    frame = (frame+1)%6;
}
setInterval(()=>{
    dog = document.querySelector('.dog');
    obstacle = document.querySelector('.obstacle')

    dx = parseInt(window.getComputedStyle(dog, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dog, null).getPropertyValue('top'));
    
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offSetX = Math.abs(dx-ox);
    offSetY = Math.abs(dy-oy);

    if(offSetX < 93 && offSetY < 100){
        obstacle.classList.remove('obstaclemove');
        obstacle.classList.add('obs-stationary');
        clearInterval(myInterval);
        clearInterval(animalInterval);
        clearInterval(scoreInterval);
        gameover = true;
        showgameover.style.display = "block";
        document.getElementById('time').innerHTML = score + 's';
    }
}, 100);
animalInterval = setInterval(changeanimal, 2000);
function changeanimal(){
    let animal = document.getElementById('animal');
    let i = Math.ceil(Math.random()*3);
    animal.src = `img/animal${i}.png`;
}
restart.addEventListener('click', ()=>{
    obstacle = document.querySelector('.obstacle')
    gameover = false;
    myInterval = setInterval(runAnimation, 100);
    animalInterval = setInterval(changeanimal, 2000);
    scoreInterval = setInterval(updateScore, 1000);
    obstacle.classList.add('obstaclemove');
    obstacle.classList.remove('obs-stationary');
    showgameover.style.display = "none";
    score = 0;
});
scoreInterval = setInterval(updateScore, 1000);
function updateScore(){
    score += 1;
    showscore.innerHTML = score + 's';
}