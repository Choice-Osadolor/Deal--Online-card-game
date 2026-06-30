

// function animatetransfer(){}
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

export function animatedraw() {
    return new Promise((resolve) => {
        const topCard = document.querySelector("#topCard");
        topCard.classList.add("drawn");

// Resolve when animation ends, track animations end
        topCard.addEventListener("animationend", () => {
            topCard.classList.remove("drawn");
            resolve();
        }, { once: true });
    });
}

// For each card drawn if animated is true
//animatedraw, wiat for animate draw to end and resolve until you renderhand
//or do we drawcard after animation?
//then renderhand
//drawcard sets the created card
