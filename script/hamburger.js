let ham = document.querySelector(".hamburger");
        let cross = document.querySelectorAll(".ham");
        let nav = document.querySelector(".navbar");
        let active = false;
        ham.addEventListener('click', ()=>{
            if(active == false){
                cross[0].style.transform = "translateY(15px) rotate(45deg)";
                cross[1].style.opacity = "0";
                cross[2].style.transform = "translateY(-15px) rotate(-45deg)";
                active = true;
            }
            else{
                cross[0].style.transform = "translateY(0px) rotate(0deg)";
                cross[1].style.opacity = "1";
                cross[2].style.transform = "translateY(0px) rotate(0deg)";
                active = false;
            }
            nav.classList.toggle('active')
        });