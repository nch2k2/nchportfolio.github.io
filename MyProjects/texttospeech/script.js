let speech = new SpeechSynthesisUtterance();
let voices = [];
voiceselect = document.querySelector('select');
window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice, i) => (voiceselect.options[i] = new Option(voice.name, i)));
}
voiceselect.addEventListener('change', ()=>{
    speech.voice = voices[voiceselect.value];
})
let btn = document.getElementById('btn');
let img = document.getElementById('playstop');
let btnname = document.getElementById('btnname');
btn.addEventListener('click', ()=>{
    if(speechSynthesis.speaking){
        window.speechSynthesis.cancel();
        img.src = "play.svg";
        btnname.innerText = "Play";
    }
    else{
        speech.text = document.querySelector('textarea').value;
        window.speechSynthesis.speak(speech);
        img.src = "stop.svg";
        btnname.innerText = "Stop";
    }
});
setInterval(()=>{
    if(!speechSynthesis.speaking){
        img.src = "play.svg";
        btnname.innerText = "Listen";
    }
}, 100)