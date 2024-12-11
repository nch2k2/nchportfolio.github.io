setInterval(() => {
    let d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    hr = h * 30 + m/2;
    mr = m * 6;
    sr = s * 6;
    
    let num1 = document.querySelectorAll(".num1");
    let num2 = document.querySelectorAll(".num2");
    let num3 = document.querySelectorAll(".num3");
    num1.forEach(element => {
        element.innerHTML = h;
        element.style.transform = `rotate(${-hr}deg)`;
    });
    num2.forEach(element => {
        element.innerHTML = m;
        element.style.transform = `rotate(${-mr}deg)`;
    });
    num3.forEach(element => {
        element.innerHTML = s;
        element.style.transform = `rotate(${-sr}deg)`;
    });
    document.querySelector(".hour").style.transform = `rotate(${hr}deg)`;
    document.querySelector(".min").style.transform = `rotate(${mr}deg)`;
    document.querySelector(".sec").style.transform = `rotate(${sr}deg)`;
}, 1000);