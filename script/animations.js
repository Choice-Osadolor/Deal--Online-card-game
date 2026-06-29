

// function animatetransfer(){}
// function animatedraw(){}
// function animatediscard(){}

export function animateWin(){
    const winscreen=document.querySelector('.overlay');
    winscreen.classList.add('show');
}

export function animateLose() {
    const overlay = document.querySelector(".overlay");
    const screen = document.querySelector(".screen");

    screen.src = "assets/screens/lose.png";

    overlay.classList.add("show");
}