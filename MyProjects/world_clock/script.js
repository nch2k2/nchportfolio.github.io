async function getData(place){
    const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=d7285d6dc4784256abefb8fee67fe401&location=${place}`;
    const res = await fetch(url);
    data = await res.json();
    time = data.datetime;
    document.querySelector('.time').innerText = `Date: ${time.split(' ')[0]} Time: ${time.split(' ')[1]} ${data.timezone_abbreviation}`;
}
let elements = document.getElementsByTagName('path');
Array.from(elements).forEach(element => {
    element.addEventListener('mouseover', function (){
        element.style.fill = "#000d36";
        window.onmousemove = function (j){
            x = j.clientX;
            y = j.clientY;
            document.querySelector('.posx').style.left = x + 2 + 'px';
            document.querySelector('.posy').style.top = y + 5 + 'px';
            document.querySelector('.place').style.left = x + 20 + 'px';
            document.querySelector('.place').style.top = y - 50 + 'px';
        }
        document.querySelector('.place').innerText = element.id;
        document.querySelector('.place').style.display = "block";
    });
    element.addEventListener('mouseleave', ()=>{
        element.style.fill = "black";
        document.querySelector('.place').style.display = "none";
    });
    element.addEventListener('click', ()=>{
        getData(element.id);
    })
});