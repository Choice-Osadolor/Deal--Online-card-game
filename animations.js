
// Deck Card Animation , zoom, flip, place in your hand

// function activeDeckCard() {
//     const deckcards = document.querySelectorAll('.deckcard');
//     deckcards.forEach(deckcard =>{
//         deckcard.addEventListener('click',()=>{
//             deckcard.classList.toggle('zoomed');
            

//         setTimeout(() => {
//             if(!deckcard.classList.contains('flip')) {
//                 deckcard.classList.toggle('flip');
//             } }, 800);

//         setTimeout(() => {
//             moveCard();
//         }, 2000);

//         setTimeout(() => {
//             deckcard.classList.remove('zoomed');
//         }, 2500);
//         })
//     })};

// function moveCard() {
// const card = document.querySelector('.deckcard'); // The card you want to move
// const hand = document.querySelector('#hand');
// card.transition = 'all 0.5s ease-in-out'; // Add transition for smooth movement

// hand.appendChild(card); // moves it out of inner-container
// }
// activeDeckCard();


// function viewCard() {
//     const cards = document.querySelectorAll('.card');
    
// cards.forEach(card => {

//     card.addEventListener('click', () => {
//         //toggle active for only one card at a time, we can use cotains check for the cards
//         if(card.classList.contains('active')) {
//             card.classList.remove('active');
//         }else {
//             cards.forEach(c => c.classList.remove('active'));
//             card.classList.add('active');
//         }
//     });

// });
// }


// viewCard();