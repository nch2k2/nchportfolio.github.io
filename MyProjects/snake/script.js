let blocksize = 25;
let rows = 20;
let cols = 20;
if(screen.width <= 500)
    cols = 15;
let board;
let context;
let snakeX = 10 * blocksize;
let snakeY = 10 * blocksize;
let foodX;
let foodY;
let velocityX = 0;
let velocityY = 0;
let snake = [];
let gameover = false;
let scoreboard;
let score = 0;
let reset;
let gameovertitle;
let gamestart;
let upbtn;
let downbtn;
let leftbtn;
let rightbtn;

window.onload = function (){
    board = document.getElementById("board");
    scoreboard = document.querySelector(".score");
    reset = document.getElementById("reset");
    gameovertitle = document.querySelector(".gameover");
    gamestart = document.querySelector(".i");
    upbtn = document.getElementById("upkey");
    downbtn = document.getElementById("downkey");
    leftbtn = document.getElementById("leftkey");
    rightbtn = document.getElementById("rightkey");

    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keydown", changedir);
    reset.addEventListener('click', ()=>{
        gameover = false;
        snakeX = 10 * blocksize;
        snakeY = 10 * blocksize;
        score = 0;
        snake = [];
        gameovertitle.style.display = "none";
    });
    upbtn.addEventListener('click', ()=>{
        if(velocityY != 1){
            velocityX = 0;
            velocityY = -1;
            gamestart.style.display = "none";
        }
    });
    downbtn.addEventListener('click', ()=>{
        if(velocityY != -1){
            velocityX = 0;
            velocityY = 1;
            gamestart.style.display = "none";
        }
    });
    leftbtn.addEventListener('click', ()=>{
        if(velocityX != 1){
            velocityX = -1;
            velocityY = 0;
            gamestart.style.display = "none";
        }
    });
    rightbtn.addEventListener('click', ()=>{
        if(velocityX != -1){
            velocityX = 1;
            velocityY = 0;
            gamestart.style.display = "none";
        }
    });
    setInterval(update, 100);
}
function update(){
    if(gameover){
        velocityX = 0;
        velocityY = 0;
        gameovertitle.style.display = "flex";
    }

    scoreboard.innerHTML = score;

    context.fillStyle = "greenyellow";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if(snakeX == foodX && snakeY == foodY){
        snake.push([foodX, foodY]);
        score++;
        placefood();
    }

    for(let i = snake.length-1; i>0; i--){
        snake[i] = snake[i-1];
    }
    if(snake.length)
        snake[0] = [snakeX, snakeY];

    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;

    context.fillStyle = "green";
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    
    for(let i = 0; i<snake.length; i++)
        context.fillRect(snake[i][0], snake[i][1], blocksize, blocksize);

    if(snakeX < 0 || snakeX >= cols*blocksize || snakeY < 0 || snakeY >= rows*blocksize)
        gameover = true;
    for(let i = 0; i<snake.length; i++)
        if(snakeX == snake[i][0] && snakeY == snake[i][1])
            gameover = true;
}
function placefood(){
    foodY = Math.floor(Math.random() * rows) * blocksize;
    foodX = Math.floor(Math.random() * cols) * blocksize;
}
function changedir(e){
    if(e.key == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
        gamestart.style.display = "none";
    }
    else if(e.key == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
        gamestart.style.display = "none";
    }
    else if(e.key == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
        gamestart.style.display = "none";
    }
    else if(e.key == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
        gamestart.style.display = "none";
    }
}
