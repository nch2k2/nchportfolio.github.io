setInterval(() => {
    let d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    hr = h * 30 + m/2;
    mr = m * 6;
    sr = s * 6;
    document.querySelector(".hour").style.transform = `rotate(${hr}deg)`;
    document.querySelector(".min").style.transform = `rotate(${mr}deg)`;
    document.querySelector(".sec").style.transform = `rotate(${sr}deg)`;
}, 1000);