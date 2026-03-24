import {createCard,drawCard,shuffleDeck,getCurrentPlayer} from './gameOps.js'
import { gameState } from './gameState.js';


// UI Elements
const bank=document.querySelector('.bank');
const hand=document.querySelector('#hand');
const property=document.querySelector('.properties');

export function renderDeck() {
document.querySelector('#deck').innerHTML = ''; // Clear existing deck display

const topCard = gameState.deck[gameState.deck.length - 1];
const newcard=createCard(topCard,'deck'); // Create a card element based on the top card object
const deckcard=newcard.querySelector('.deckcard');

document.querySelector('#deck').appendChild(newcard);

deckcard.addEventListener('click', () => {
    
    deckcard.classList.add('zoomed');
    setTimeout(() => {
            deckcard.classList.add('flip');}
            , 800);
    setTimeout(() => {
        const player = getCurrentPlayer();
        drawCard(player);
        deckcard.classList.remove('zoomed','flip', 'on-deck');
        deckcard.classList.add('in-hand' , 'flip');
        renderDeck();
        renderHand();
    }, 2000);

});

}

export function renderHand() {
    const player = getCurrentPlayer();
    const handContainer = document.querySelector('#hand');
    
    // Only show hand for the human player
    if (player.name === 'Computer') {
        handContainer.innerHTML = '';
        console.log('Computer turn - hand hidden');
        return;
    }
    
    console.log('Rendering hand for player:', player.name, 'Cards:', player.playerHand.length);
    handContainer.innerHTML = '';

    player.playerHand.forEach(card =>{
        console.log('Creating card element for:', card.name);
        const cardEl=createCard(card,'hand');
        if (cardEl) {
            handContainer.appendChild(cardEl);
        }
    });
}

export function renderProperties() {

gameState.players.forEach(player =>{//for each player, append their properties
    const properties=document.querySelector(`#${player.name}`);
    properties.innerHTML = ''; 

    player.playerProperties.forEach(card =>{
        // Find existing set for this color
        let propertySet = properties.querySelector(`.set[data-id="${card.color}"]`);

        if (!propertySet) { // No set exists yet. create one
            propertySet = document.createElement('div');
            propertySet.classList.add('set');
            propertySet.dataset.id = card.color;
            properties.appendChild(propertySet);
        }

    const cardEl = createCard(card, 'properties');
    propertySet.appendChild(cardEl);
        });
    });
}

export function renderBank() {
    bank.innerHTML = '';
}

export function renderActions(){

}





export function gameInit() {
    shuffleDeck();
    const player = gameState.players[0]; // Player "You"
    for(let i=0; i<5; i++){
        drawCard(player);
    }
    renderDeck();
    renderHand();
    console.log('Game initialized!');
    console.log('Player hand:', player.playerHand);
};

//everytime a chnag ie made, the UI updates eg. play card, discard card, action card, win, 
export function updateGame(){
    renderDeck();
    renderProperties();
    renderHand();
    updateBackground();
    updateHeader();
}

function updateBackground() {
    const player = getCurrentPlayer();
    const body = document.querySelector('body');
    if (player.name === 'Computer') {
        body.style.backgroundImage = 'url(assets/gamebg2.png)';
    } else {
        body.style.backgroundImage = 'url(assets/gamebg1.png)';
    }
}

function updateHeader() {
    const player = getCurrentPlayer();
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.textContent = player.name + '\'s Turn';
    }
}