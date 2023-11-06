let turn = "&#10005";
let color = "purple";
let gameover = false;
let fireworks = document.querySelector(".win");
let victory = new Audio("victory.m4a");
let sound = new Audio("ting.mp3");
let line = document.querySelector(".drawLine");
let draw = document.querySelector(".showdraw");
const changeturn = ()=>{
    return turn === "&#10005"?"&#9711":"&#10005"
};
const changecolor = ()=>{
    return color === "red"? "purple": "red";
};
const checkwin = ()=>{
    let wins = [
        [0, 1, 2, 0, -150, 90],
        [3, 4, 5, 0, 0 , 90],
        [6, 7, 8, 0, -150, 90],
        [0, 3, 6, -150, 0, 0],
        [1, 4, 7, 0, 0, 0],
        [2, 5, 8, 150, 0, 0],
        [0, 4, 8, 0, 0, -45],
        [2, 4, 6, 0, 0, 45]
    ];
    let boxtexts = document.getElementsByClassName("boxtext");
    wins.forEach(win =>{
        if((boxtexts[win[0]].innerHTML === boxtexts[win[1]].innerHTML) && (boxtexts[win[2]].innerHTML === boxtexts[win[1]].innerHTML) && (boxtexts[win[0]].innerHTML !== '')){
            gameover = true;
            fireworks.style.display = "flex";
            line.style.transform = `translate(${win[3]}px, ${win[4]}px) rotate(${win[5]}deg)`
            line.style.display = "block";
            victory.play();
        }
    });
};
const checkdraw = ()=>{
    let boxtext = document.querySelectorAll(".boxtext");
    var i = 0;
    Array.from(boxtext).forEach(box => {
        if(box.innerHTML == '')
            i++;
    });
    if(i == 0 ){
        draw.style.display = "flex";
        draw.style.width = "500px";
    }
};
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(box => {
    let boxtext = box.querySelector(".boxtext");
    box.addEventListener('click', clickresponse);
    function clickresponse(){
        if(gameover){
            Array.from(boxes).forEach(box =>{
                if(boxtext.innerHTML == '')
                    boxtext.innerHTML = ' ';
            });
        }
        else if(boxtext.innerHTML == ''){
            boxtext.innerHTML = turn;
            turn = changeturn();
            color = changecolor();
            box.style.color = color;
            sound.play();
            checkwin();
            if(!gameover)
                checkdraw();
        }
    }
});
let reset = document.getElementById('reset');
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(boxtext =>{
        boxtext.innerHTML = '';
    });
    turn = "&#10005";
    color = "purple";
    gameover = false;
    fireworks.style.display = "none";
    line.style.display = "none";
    draw.style.display = "none";
});