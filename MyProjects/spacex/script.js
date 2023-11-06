let blocksize = 25;
let rows = 25;
let columns = 40;
let context;
let rocketY = rows * blocksize - 5 * blocksize;
let rocketX = columns / 2 * blocksize - 2 * blocksize;
let fire = [];
let firev = 2 * blocksize;
let enemyarr = [];
let enemyY = 2;
let gameover = false;
let ship = 0;
let no_ship = 3;
let space_ship = {
    x: rocketX,
    y: rocketY,
    width: 4 * blocksize,
    height: 4 * blocksize
};
let score = 0;

window.onload = function () {
    document.querySelector('.right').addEventListener('click', () => {
        ship = (ship + 1) % no_ship;
        document.getElementById('ship').src = `img/rocket${ship + 1}.png`;
    });
    document.querySelector('.left').addEventListener('click', () => {
        if (ship <= 0)
            ship = no_ship - 1;
        else
            ship--;
        document.getElementById('ship').src = `img/rocket${ship + 1}.png`;
    });
    document.querySelector('.btn').addEventListener('click', () => {
        start();
        document.querySelector('.start').style.display = "none";
        document.querySelector('.gameover').style.display = "none";
        document.getElementById('board').style.display = "block";
    });
    document.querySelector('.restart').addEventListener('click', () => {
        gameover = false;
        start();
        document.querySelector('.gameover').style.display = "none";
        document.getElementById('board').style.display = "block";
    });
}
function start() {
    board = document.getElementById('board');
    board.width = columns * blocksize;
    board.height = rows * blocksize;
    context = board.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    document.addEventListener('keydown', changePosition);
    document.addEventListener('keyup', shoot);
    enemyinterval = setInterval(createEnemy, 1000);
    requestAnimationFrame(update);

}
function update() {
    if (gameover) {
        document.querySelector('.gameover').style.display = "flex";
        document.getElementById('board').style.display = "none";
        clearInterval(enemyinterval);
        document.querySelector('.displayscore').innerHTML = `You Scored: ${score}`;
        score = 0;
        enemyarr = [];
        enemyY = 2;
        fire = [];
        rocketY = rows * blocksize - 5 * blocksize;
        rocketX = columns / 2 * blocksize - 2 * blocksize;
        return;
    }

    requestAnimationFrame(update);
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    let rocket = new Image();
    rocket.src = `img/rocket${ship + 1}.png`;
    context.drawImage(rocket, rocketX, rocketY, 4 * blocksize, 4 * blocksize);

    space_ship.x = rocketX;
    space_ship.y = rocketY;

    context.fillStyle = "white";
    context.font = "30px Sans Serif";
    context.fillText("Score: "+score, blocksize, 2*blocksize);

    if(enemyY<20){
        enemyY *= 1.001;
    }
    for (let i = 0; i < fire.length; i++) {
        let bullet = fire[i];
        bullet.y -= firev;
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        for (let j = 0; j < enemyarr.length; j++) {
            if (enemyarr[j].alive && !bullet.used && detectCollusion(enemyarr[j], bullet)) {
                bullet.used = true;
                enemyarr[j].alive = false;
                score += 10;
            }
        }
    }
    while (fire.length > 0 && (fire[0].used || fire[0].y < 0)) {
        fire.shift();
    }
    for (let i = 0; i < enemyarr.length; i++) {
        let enemy = enemyarr[i];
        if (enemy.alive) {
            enemy.y += enemyY;
            let meteor = new Image();
            meteor.src = `img/meteor${enemy.n}.png`;
            context.drawImage(meteor, enemy.x, enemy.y, 4 * blocksize, 4 * blocksize);
        }
        if (detectCollusion(enemyarr[i], space_ship))
            gameover = true;
    }
    while (enemyarr.length > 0 && (!enemyarr[0].alive || enemyarr[0].y > board.height)) {
        enemyarr.shift();
    }
}
function shoot(e) {
    if (gameover) return;
    if (e.key == " ") {
        let bullet = {
            x: rocketX + 2 * blocksize - blocksize / 8,
            y: rocketY - blocksize / 2,
            width: blocksize / 4,
            height: blocksize / 2,
            used: false
        }
        fire.push(bullet);
    }
}
function createEnemy() {
    if (gameover) return;
    let enemy = {
        n: Math.ceil(Math.random() * 3),
        x: Math.round(Math.random() * (columns - 4)) * blocksize,
        y: -4 * blocksize,
        width: 4 * blocksize,
        height: 4 * blocksize,
        alive: true
    }
    enemyarr.push(enemy);
}
function detectCollusion(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.width > b.y;
}
function changePosition(e) {
    if (gameover) return;
    if (e.key == "ArrowUp" && rocketY > 0) {
        rocketY -= blocksize;
    }
    if (e.key == "ArrowDown" && (rocketY + 3 * blocksize) < board.height) {
        rocketY += blocksize;
    }
    if (e.key == "ArrowLeft" && rocketX > 0) {
        rocketX -= blocksize;
    }
    if (e.key == "ArrowRight" && (rocketX + 4 * blocksize) < board.width) {
        rocketX += blocksize;
    }
}