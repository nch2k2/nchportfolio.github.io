let icon = document.querySelectorAll('.icon');
let startmenu = document.querySelector('.startmenu');
icon[0].addEventListener('click', () => {
    if (startmenu.style.bottom == "-500px")
        startmenu.style.bottom = "60px";
    else
        startmenu.style.bottom = "-500px";
});

let pinned = document.querySelectorAll('.pinnedicon')[0];
let reco = document.querySelectorAll('.reco-icon')[0];
pinned.addEventListener('click', () => {
    startmenu.style.bottom = "-500px";
});
reco.addEventListener('click', () => {
    startmenu.style.bottom = "-500px";
});

let red_x = document.querySelector(".red-x");
let file_start = document.getElementById("file_start");
let file_exp = document.querySelector(".file_exp");
let edge_start = document.getElementById("edge_start");
let edge_app = document.querySelector(".edge_app");
let calculator_start = document.getElementById("calculator_start");
let calculator_app = document.querySelector(".calculator");
let notepad_start = document.getElementById("notepad_start");
let notepad_app = document.querySelector(".notepad");
let chrome_app = document.querySelector(".chrome");
let cmd_start = document.getElementById("cmd");
let cmd_app = document.querySelector(".cmd");
[edge_start, icon[1]].forEach(element => {
    element.addEventListener('click', () => {
        edge_app.style.display = "block";
        red_x.style.display = "flex";
    });
});
[file_start, icon[2]].forEach(element => {
    element.addEventListener('click', () => {
        file_exp.style.display = "block";
        red_x.style.display = "flex";
    });
});
calculator_start.addEventListener('click', () => {
    calculator_app.style.display = "block";
    red_x.style.display = "flex";
});
notepad_start.addEventListener('click', () => {
    notepad_app.style.display = "block";
    red_x.style.display = "flex";
});
icon[3].addEventListener('click', () => {
    chrome_app.style.display = "block";
    red_x.style.display = "flex";
});
cmd_start.addEventListener('click', () => {
    cmd_app.style.display = "block";
    red_x.style.display = "flex";
});
red_x.addEventListener('click', () => {
    file_exp.style.display = "none";
    edge_app.style.display = "none";
    calculator_app.style.display = "none";
    notepad_app.style.display = "none";
    chrome_app.style.display = "none";
    cmd_app.style.display = "none";
    red_x.style.display = "none";
});

let t = "";
let d = "";
function displayTime() {
    let time = new Date();
    if (parseInt(time.getMinutes()) < 10) {
        t = time.getHours() + ':0' + (time.getMinutes()).toString();

    }
    else {
        t = time.getHours() + ':' + time.getMinutes();
    }
    document.querySelector('.time').innerHTML = t;
    d = time.getDate() + '-' + time.getMonth() + '-' + time.getFullYear();
    document.querySelector('.date').innerHTML = d;
}
displayTime();
setInterval(displayTime, 1000);

let log_out = document.querySelector(".shut");
log_out.addEventListener('click', () => {
    if (confirm("Shut Down?"))
        close();
});