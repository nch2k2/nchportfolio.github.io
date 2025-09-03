let back_ground = document.querySelector('.bg');
//let frame = document.querySelector('.window');
let cross = document.querySelector('.cross');
let spark1 = document.querySelector('.spark1');
let spark2 = document.querySelector('.spark2');
let spark3 = document.querySelector('.spark3');
let bullet = document.querySelector('.bullet');
let target = document.querySelector('.target');
let gun = document.querySelector('.gun');
let ring2 = document.querySelector('.ring2');
let ring3 = document.querySelector('.ring3');
let score_div = document.querySelector('.score');
let gametime_div = document.querySelector('.gametime');
let start_game = document.querySelector('.startgame');
let pause_game = document.querySelector('.pausegame');
let gameoverscreen = document.querySelector('.gameoverscreen');
let settings_menu = document.querySelector('.settingsmenu');
let more_settings = document.querySelector('.moresettings');
let start_btn = document.querySelector('.startbtn');
let settings_btn = document.querySelector('.custombtn');
let ok_btn = document.querySelectorAll('.okbtn');
let more_btn = document.querySelector('.advancedsettings');
let sensitivity_btn = document.querySelector('#sensitivity');
let sound_btn = document.querySelector('#sound');
let sensitivity_value = document.querySelector('.sensitivityvalue');
let sound_value = document.querySelector('.soundvalue');
let back_btn = document.querySelectorAll('.backbtn');
let resume_btn = document.querySelector('.resumebtn');
let score_number = document.querySelector('.scorenumber');
let countdwn = document.querySelector('.countdwn');

let cross1 = document.querySelector('.cross1');
let cross2 = document.querySelector('.cross2');
let ring1_frame = document.querySelector('.ring1');
let ring2_frame = document.querySelector('.ring2');
let ring3_frame = document.querySelector('.ring3');

let crosshaircolor = document.querySelector('#crosshaircolor');
let wheel1 = document.querySelector('#wheel1');
let wheel2 = document.querySelector('#wheel2');
let wheel3 = document.querySelector('#wheel3');

let shoot_sound = new Audio("fire.mp3");
let hit_sound = new Audio("hit.mp3");

let curx = 0;
let cury = 0;
let sensitivity = 1.0;
let mouse_difx = 0;
let mouse_dify = 0;

let crosspos = cross.getBoundingClientRect();
let crossx = crosspos.left + 20;
let crossy = crosspos.top + 20;

let x_pos = [100, 500, 1000, 1500, 100, 500, 1000, 1500];
let y_pos = [100, 100, 100, 100, 500, 500, 500, 500];
let j = Math.floor(Math.random() * 8);
let score = 0;
let gametime = 30;
let time_interval;
let gameover = false;
let current_round = 1;
let target_posx = 100;
let target_direction = 1;
let speed_interval;
let trajectory_interval;
let countdown_interval;

let x_coor = 0.0;
let y_coor = 0.0;
let height;
let theta;
let t;
let offset_x;
let offset_y = [600, 650, 700, 750, 800, 850, 900, 950, 1000];
let prev_height;
let prev_offset_no = 0;
let prev_offset = 0;
let direction = -1;

function countdown(){
    countdwn.innerHTML = '';
    countdwn.style.display = 'flex';
    let d = 3;
    countdown_interval = setInterval(() => {
        countdwn.innerHTML = d;
        d = d - 1;
    }, 1000);
}

function trajectory(){
    y_coor = Math.sqrt(2 * 980 * height) * t - 0.5 * 980 * t * t;
    x_coor = offset_x + direction * Math.sqrt( 2 * 980 * height) * 1/Math.tan(theta * Math.PI / 180) * t;
    t = t + 0.1
    target.style.left = `${x_coor}px`;
    target.style.top = `${1080 - y_coor}px`;
}

function speed_control(){
    target.style.left = `${target_posx}px`;
    target_posx = target_posx + 20*target_direction;
    if (target_posx > 1500 || target_posx < 100)
        target_direction = target_direction * -1;
}

function current_mode(){
    if (current_round == 1){
        let i = Math.floor(Math.random() * 8);
        if (i == j)
            i = (i + 1)% 8;
        target.style.left = `${x_pos[i]}px`;
        target.style.top = `${y_pos[i]}px`;
        j = i;
    }
    else if (current_round == 2){
        let i = Math.floor(Math.random() * 8);
        if (i == j)
            i = (i + 1)% 8;
        target.style.left = `${x_pos[i]}px`;
        target.style.top = `${y_pos[i]}px`;
        j = i;
        target_posx = x_pos[i];
        speed_interval = setInterval(speed_control, 80);
    }
    else if (current_round == 3){
        theta = (Math.floor(Math.random() * 15)) + 70;
        height = offset_y[Math.floor(Math.random() * offset_y.length)];
        offset_x = Math.floor(Math.random() * 1400) + 100;
        if (prev_height == height)
            height = 1600 - height;
        if (offset_x > 700 && prev_offset > 700)
            prev_offset_no = prev_offset_no + 1;
        else if (offset_x <= 700 && prev_offset <= 700)
            prev_offset_no = prev_offset_no + 1;
        else
            prev_offset_no = 0;
        if (prev_offset_no == 4){
            offset_x = 1600 - offset_x;
            prev_offset_no = 0;
        }
        if (offset_x > 750)
            direction = -1;
        else
            direction = 1;
        prev_offset = offset_x;
        prev_height = height;
        t = 0.0;
        trajectory_interval = setInterval(trajectory, 80);
    }
}

function update_time(){
    gametime_div.innerHTML = `Time: ${gametime}`;
    if (gametime <= 0){
        if (current_round == 1){
            current_round = 2;
            gametime = 30;
            current_mode();
        }
        else if (current_round == 2){
            current_round = 3;
            gametime = 30;
            clearInterval(speed_interval);
            current_mode();
        }
        else if (current_round == 3){
            gameover = true;
            document.exitPointerLock();
            clearInterval(trajectory_interval);
        }
    }
    gametime = gametime - 1;
    if (y_coor < 0){
        clearInterval(trajectory_interval);
        current_mode();
    }
}

more_btn.addEventListener('click', ()=>{
    settings_menu.style.display = 'none';
    more_settings.style.display = 'flex';
})

settings_btn.addEventListener('click', ()=>{
    start_game.style.display = 'none';
    settings_menu.style.display = 'flex';
});

sensitivity_btn.addEventListener('input', ()=>{
    let val = sensitivity_btn.value/10;
    val = val.toFixed(1);
    sensitivity_value.innerHTML = val;
});

sound_btn.addEventListener('input', ()=>{
    let val = sound_btn.value * 10;
    sound_value.innerHTML = val;
});

ok_btn[0].addEventListener('click', ()=>{
    sensitivity = parseFloat(sensitivity_btn.value/10);
    shoot_sound.volume = sound_btn.value/10;
    hit_sound.volume = sound_btn.value/10;
    start_game.style.display = 'flex';
    settings_menu.style.display = 'none';
});

ok_btn[1].addEventListener('click', ()=>{
    cross1.style.background = crosshaircolor.value;
    cross2.style.background = crosshaircolor.value;
    ring1_frame.style.background = wheel1.value;
    ring2_frame.style.background = wheel2.value;
    ring3_frame.style.background = wheel3.value;
    more_settings.style.display = 'none';
    settings_menu.style.display = 'flex';
})

start_btn.addEventListener('click', async()=>{
    await back_ground.requestPointerLock();
    start_game.style.display = 'none';
    gameoverscreen.style.display = 'none';
    score_div.style.display = 'block';
    gametime_div.style.display = 'block';
    
    time_interval = setInterval(update_time, 1000);
    if (current_round ==2)
        speed_interval = setInterval(speed_control, 80);
    target.style.display = 'flex';
    if (current_round == 1 || current_round == 2){
        target.style.left = `${x_pos[j]}px`;
        target.style.top = `${y_pos[j]}px`;
    }
    current_mode();
});
document.addEventListener('pointerlockchange', ()=>{
    if (document.pointerLockElement === back_ground){
        score_div.innerHTML = `Score: ${score}`;
        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('click', onfire);
    }
    else{
        document.removeEventListener('mousemove', onMousemove);
        document.removeEventListener('click', onfire);
        target.style.display = 'none';
        if (gameover){
            gameoverscreen.style.display = 'flex';
            score_number.innerHTML = `Score: ${score}`;
            gametime = 30;
            score = 0;
            gameover = false;
        }
        else
            pause_game.style.display = 'flex';
        clearInterval(time_interval);
        if (current_round == 2)
            clearInterval(speed_interval);
        if (current_round == 3)
            clearInterval(trajectory_interval);
    }
});

function onMousemove(e){
    mouse_difx = e.movementX;
    mouse_dify = e.movementY;
    per_x = mouse_difx;
    per_y = mouse_dify;
    if (mouse_dify < 0 && cury < 30){
        cury = cury + sensitivity * Math.abs(mouse_dify);
    }
    if (mouse_dify > 0 && cury > -30){
        cury = cury - sensitivity * Math.abs(mouse_dify);
    }
    if (mouse_difx < 0 && curx < 45){
        curx = curx + sensitivity * Math.abs(mouse_difx);
    }
    if (mouse_difx > 0 && curx > -45){
        curx = curx - sensitivity * Math.abs(mouse_difx);
    }
    back_ground.style.transform = `rotateY(${-curx}deg) rotateX(${cury}deg)`;
}

function onfire(e){
    shoot_sound.play();
    bullet.classList.add('bulletmove');
    gun.style.transform = 'rotateZ(0.5deg) translateY(2px) translateX(2px)';
    setTimeout(() => {
        bullet.classList.remove('bulletmove');
        gun.style.transform = 'rotateZ(0) translateY(0) translateX(0)';
    }, 50);
    let target_pos = target.getBoundingClientRect();
    let ring2_pos = ring2.getBoundingClientRect();
    let ring3_pos = ring3.getBoundingClientRect();
    let radius = (target_pos.right - target_pos.left)/2;
    let radius2 = (ring2_pos.right - ring2_pos.left)/2;
    let radius3 = (ring3_pos.right - ring3_pos.left)/2;
    let target_center_x = target_pos.left + radius;
    let target_center_y = target_pos.top + radius;
    let distance_target = Math.sqrt(Math.pow(crossx - target_center_x, 2) + Math.pow(crossy - target_center_y, 2));
    if (distance_target < radius)
    {
        hit_sound.play();
        if (current_round == 2)
            clearInterval(speed_interval);
        if (current_round == 3)
            clearInterval(trajectory_interval);
        current_mode();
        if (distance_target < radius3)
            score = score + 20;
        else if (distance_target < radius2)
            score = score + 10;
        else
            score = score + 5;

        score_div.innerHTML = `Score: ${score}`;
    }
};
function back_menu(){
    pause_game.style.display = 'none';
    gameoverscreen.style.display = 'none';
    start_game.style.display = 'flex';
    j = Math.floor(Math.random() * 8);
    score = 0;
    gametime = 30;
    gameover = false;
    if (current_round == 2)
        clearInterval(speed_interval);
    if (current_round == 3)
        clearInterval(trajectory_interval);
    current_round = 1;
    score_div.style.display = 'none';
    gametime_div.style.display = 'none';
    gametime_div.innerHTML = `Time: ${gametime}`;
}
back_btn[0].addEventListener('click', back_menu);
back_btn[1].addEventListener('click', back_menu);

resume_btn.addEventListener('click', async()=>{
    await back_ground.requestPointerLock();
    pause_game.style.display = 'none';
    target.style.display = 'flex';
    time_interval = setInterval(update_time, 1000);
    if (current_round == 2)
        speed_interval = setInterval(speed_control, 80);
    if (current_round == 3)
        trajectory_interval = setInterval(trajectory, 80);
});