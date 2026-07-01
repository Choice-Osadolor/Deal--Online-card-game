import { animatedraw } from './animations.js';
import {createCard,drawCard,shuffleDeck,getCurrentPlayer,transferCard, discardCard} from './gameOps.js'
import { gameState } from './gameState.js';
import { saveGame } from './storage.js';





// UI Elements
const bank=document.querySelector('.bank');
const hand=document.querySelector('#hand');
const property=document.querySelector('.properties');

export function renderDeck() {
document.querySelector('#deck').innerHTML = ''; // Clear existing deck display

const topCard = gameState.deck[gameState.deck.length - 1];
const newcard=createCard(topCard,'deck'); // Create a card element based on the top card object
const deckcard=newcard.querySelector('.deckcard');
deckcard.setAttribute('id','topCard');
// Our job is toretrieve the deckcard created here, .deckcard, specially in the deck container;

document.querySelector('#deck').appendChild(newcard);

}

export function renderHand() {
    const player = getCurrentPlayer();
    let handContainer;

    gameState.players.forEach((player)=>{
        if (player.name === 'Computer') {
            handContainer=document.querySelector('#ComputerHand');
        }
        if (player.name === 'You') {
            handContainer = document.querySelector('#hand');
        }
        // console.log('Rendering hand for player:', player.name, 'Cards:', player.playerHand.length);
        handContainer.innerHTML = '';

    const hidden = player.name === "Computer";

    player.playerHand.forEach(card => {
        const cardEl = createCard(card, "hand", hidden);
            // console.log('Creating card element for:', card.name);

            if (cardEl) {
                    handContainer.appendChild(cardEl);
            }
        });        
    })
}

export function renderProperties() {
        const playBtn = document.querySelector("#playcard_btn");


gameState.players.forEach(player =>{//for each player, append their properties
    const properties=document.querySelector(`#${player.name}`);
    const currentPlayer = getCurrentPlayer();
    const isOpponent = player !== currentPlayer;

    properties.innerHTML = ''; 

    player.playerProperties.forEach(card =>{
        let propertySet = properties.querySelector(`.set[data-id="${card.color}"]`);
        if (!propertySet) { // No set exists yet. create one
            propertySet = document.createElement('div');
            propertySet.classList.add('set');
            propertySet.dataset.id = card.color;
            properties.appendChild(propertySet);
        }
// const matchingCards = player.playerProperties.filter(
//     p => p.color === card.color
// );

// if (matchingCards.length === card.setSize) {
//     player.fullSets++;
// }

    
    const cardEl = createCard(card, 'properties');
    const deckCard = cardEl.querySelector(".deckcard");
    if (gameState.currentAction?.name === "Sly Deal" && isOpponent) {
        deckCard.classList.add("clickable");
    }
    if (gameState.currentAction?.name === "Forced Deal") {
        deckCard.classList.add("clickable");
    }
    if (gameState.currentAction?.name === "Deal Breaker" && isOpponent) {
        propertySet.classList.add("clickable");
    }
    if (gameState.currentAction?.type === "rent" && !isOpponent) {
        if((gameState.currentAction.color1==propertySet.dataset.id)|| (gameState.currentAction.color2==propertySet.dataset.id))
        propertySet.classList.add("clickable");
    }
deckCard.addEventListener("click", () => {
    // const cardId = Number(cardEl.dataset.id);
    // const foundCard = player.playerProperties.find(c => c.id === cardId);
    deckCard.classList.toggle("clicked");
    playBtn.textContent='Confirm';

    gameState.selectedCard=card;

    if (gameState.currentAction?.name === "Sly Deal") {
        gameState.targetedCard = gameState.selectedCard;
        gameState.selectedCard = null;
        return;
    }
    if (gameState.currentAction?.name === "Forced Deal") {
        // If a card hasnt  been targeted yet, then set the crd clciked, as selected(already targeted opponenets crad, ick yorus now))
        /*card hasnt been targetted= were at teh ssstart of our swap, and need to select then target idk*/
        if(!gameState.targetedCard){
            gameState.targetedCard=gameState.selectedCard;
        }else{
            gameState.selectedCard=card;
        }
        return;
    }

    // if (gameState.currentAction?.name === "Deal Breaker") {
    //     gameState.targetedCard = gameState.selectedCard;
    //     gameState.selectedCard = null;
    //     return;
    // }
        saveGame(gameState);
    // if (gameState.currentAction) return;

    //         gameState.selectedCard = foundCard;
    //         console.log("Selected:", foundCard.name+' property');
        // gameState.targetedCard = gameState.selectedCard;
        console.log("Target selected:", gameState.targetedCard.name);


});

propertySet.addEventListener('click',()=>{
    console.log('set has been clicked');
    propertySet.classList.toggle("clicked");
    playBtn.textContent='Confirm';


    if (gameState.currentAction?.name === "Deal Breaker" && isOpponent) {
        gameState.targetedSet = propertySet.dataset.id;
        console.log('im taking your set'+gameState.targetedSet);
    }

    if (gameState.currentAction?.type === "rent" && !isOpponent) {
        gameState.targetedSet = propertySet.dataset.id;
        console.log('im Charging you rent on '+gameState.targetedSet);
    }
        saveGame(gameState);
})
    
propertySet.appendChild(cardEl);

        });
    });
}

export function renderBank() {
    const bank =document.querySelector('#bank');
    bank.innerHTML = '';
    const player=getCurrentPlayer();
    gameState.players[0].name;
    
    bank.textContent=`Bank: ${player.playerBank}m`;
}



export function renderPile(){

    gameState.discardPile.forEach(card=>{
        const discardPile=document.querySelector('#discard');
        discardPile.innerHTML = ''; 

        const cardEl = createCard(card, 'discard');
        discardPile.appendChild(cardEl);
    })
}
    
export async function dealCards(player, amount, animated=false) {

for (let i = 0; i < amount; i++) {

    renderDeck();
    if(animated==true && player.name=='You'){
        await animatedraw()
            .then(()=>{
                drawCard(player);
                renderDeck();

                setTimeout(() => {
                    renderHand();

                }, 300 * i);
            })
    }else{
        setTimeout(() => {
            drawCard(player);
            renderHand();
        }, 300 * i);
    }
}

}
export function renderButtons(options) {

    const bankBtn = document.querySelector("#bankcard_btn");
    const playBtn = document.querySelector("#playcard_btn");
    const discardBtn = document.querySelector("#discard_btn");

    playBtn.classList.toggle("enabled", options.includes("play"));
    if(gameState.currentAction){
        playBtn.textContent=currentAction.type;
    }
    bankBtn.classList.toggle("enabled", options.includes("bank"));
    discardBtn.classList.toggle("enabled", options.includes("discard"));

    // property.classList.toggle("clickable", options.includes("steal"));

// If it is Steal or StealAll, you add classlist to Opponenets property cards, this classlist makes the cards clickable
//once clciked as per ussual, it becomes selecetd card, and thats when you perform he action eg. Sly deal
// transfer teh card over and update game
}




export function gameInit() {
    const player = gameState.players[0]; // Player "You"
    const player2=gameState.players[1];
    shuffleDeck();
    dealCards(player,5);
    dealCards(player2,5);

    console.log('Game initialized!');
    console.log('Player hand:', player.playerHand);
};

//everytime a chnag ie made, the UI updates eg. play card, discard card, action card, win, 
export function updateGame(){
    renderDeck();
    renderProperties();
    renderHand();
    renderBank();
    renderPile();
    updateBackground();
    updateHeader();
    updateEndTurnButton();
}

export function updateEndTurnButton() {
    const endTurnBtn = document.getElementById('endturn_btn');
    if (!endTurnBtn) return;

    const player = getCurrentPlayer();
    const isPlayerTurn = player.name === 'You';

    endTurnBtn.classList.toggle('enabled', isPlayerTurn);
}

function updateBackground() {
    const player = getCurrentPlayer();
    const body = document.querySelector('body');
    if (player.name === 'Computer') {
        body.style.backgroundImage = 'url(assets/grassorange.png)';
    } else {
        body.style.backgroundImage = 'url(assets/grassgreen.png)';
    }
}

function updateHeader() {
    const player = getCurrentPlayer();
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.textContent = player.name +"'"+ 's Turn';
        if(player.name=='You'){
                headerTitle.textContent = 'Your Turn';
        }
    }
}