import{gameState} from './gameState.js'
import {saveGame } from './storage.js';


export const playerHand=gameState.playerHand;
export const playerBank=gameState.playerBank;
export const playerProperties=gameState.playerProperties;

let cardIdCounter = 0;

function makeIdsUnique(element) {
    const suffix = cardIdCounter++;
    const ids = element.querySelectorAll('[id]');
    const idMap = {};
    ids.forEach(el => {
        const oldId = el.id;
        const newId = oldId + '_' + suffix;
        idMap[oldId] = newId;
        el.id = newId;
    });
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
        ['clip-path', 'mask', 'fill', 'stroke', 'xlink:href'].forEach(attr => {
            if (el.hasAttribute(attr)) {
                const val = el.getAttribute(attr);
                if (val.startsWith('url(#')) {
                    const id = val.slice(5, -1);
                    if (idMap[id]) {
                        el.setAttribute(attr, 'url(#' + idMap[id] + ')');
                    }
                } else if (val.startsWith('#')) {
                    const id = val.slice(1);
                    if (idMap[id]) {
                        el.setAttribute(attr, '#' + idMap[id]);
                    }
                }
            }
        });
    });
}// TEMPORARUY SOLUTION TO SVG PROBLEM< DISRUPTING RENDEIRNG OF ELEMENTS BECAUSE OF DUPLICATE IDS


export function getCurrentPlayer(){
    const currentPlayer=gameState.players[gameState.currentPlayer];
    return currentPlayer;
}

export function getCardOptions(card,player){
    let options=[];

    if(card.color){
        options.push('play');
    }    
    if (card.type === "money") {
        options.push("bank");
    }
    if (card.category){
        options.push("play");
        options.push("bank");
    }
    if (player.playerHand.length > 7) {
        options.push("discard");
    }
    return options;
}

export function switchPlayer(){
  currentPlayerIndex = (currentPlayerIndex + 1) % 2;
  const currentPlayer=gameState.players[gameState.currentPlayer];
  console.log('Switched!, it is now '+currentPlayer+' turn');
}
//////////////////////////////// Game operations functions //////////////////////////////////////// 

export function shuffleDeck() {
const deck=gameState.deck;
    for(let i=0; i<deck.length; i++){
        //use random number gen to generate a random INDEX in array, swap current idex with random index;
        let shuffle= Math.floor(Math.random() * (gameState.deck.length));
        let temp = deck[i];
        deck[i] = deck[shuffle];
        deck[shuffle] = temp;
    }
}

//crud
export function createCard(card, loc, hidden = false) {
    const template = document.querySelector('#cardtemplate');
    if (!template) {
        console.error('Card template not found!');
        return null;
    }

    const clone = template.content.cloneNode(true);
    const svg = clone.querySelector('svg');
    if (svg) makeIdsUnique(svg);

    const cardEl = clone.querySelector('.deckcard');
    cardEl.dataset.id = card.id;

    // Front & Back of card
    const frontCard = cardEl.querySelector('.deckcard-front');
    const backCard = cardEl.querySelector('.deckcard-back');

if (hidden) {
    cardEl.classList.add("hidden-card");
}

    // Select the SVG base image
    const baseImg = cardEl.querySelector('.base-image');
    if (!baseImg) {
        console.warn('base-image not found in template for card:', card.name);
    }

    // Add location classes
    if (loc === 'deck') cardEl.classList.add('on-deck');
    if (loc === 'hand') cardEl.classList.add('in-hand');
    if (loc === 'properties') cardEl.classList.add('in-set');
    if (loc === 'discard') cardEl.classList.add('in-set');
    // Don't bother styling the hidden face
    if (!hidden) {

        if (card.color) {
            if (card.color === 'any' || Array.isArray(card.color)) {
                if (baseImg) {
                    baseImg.setAttribute('xlink:href', 'assets/wildcard.png');
                }
            } else {
                if (baseImg) {
                    baseImg.setAttribute('xlink:href', 'assets/defaultcard.png');
                }
                cardEl.classList.add(card.color.toLowerCase());
            }
        }

        if (card.type) {
            cardEl.classList.add(card.type.toLowerCase());
        }
    }

    return clone;
}

export function drawCard(player) {
    if(gameState.deck.length === 0) {
        console.log("Deck is empty!");
        return null;
    }

        player.playerHand.forEach((card,index) =>{
        // console.log('Creating card element for:', card.name);
        const cardEl=createCard(card,'hand');

        if (cardEl) {
            setTimeout(()=>{
                handContainer.appendChild(cardEl);
                
            },500*index);
        }
    });
const drawnCard=gameState.deck.pop();
player.playerHand.push(drawnCard);

// console.log(player.name+'has drawn:'+drawnCard.name);

saveGame(gameState);//save to storage
return drawnCard;
}


export function playCard(player) {
    let card = gameState.selectedCard;
    const nextPlayer =gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];    
    console.log('opponent is:' + nextPlayer.name);
    gameState.cardsPlayed++;

    if (gameState.cardsPlayed >= 4) {
        endTurn();
        return;
    }
    console.log(gameState.cardsPlayed);

    if (!card) {
        console.log('Please select a card first');
        return;
    }

    if (card.color && card.setSize != null) {
        const matchingCards = player.playerProperties.filter(
            p => p.color === card.color
        );
        const completedSet = matchingCards.length + 1;
        console.log(`Playing ${card.name} (${card.color}); existing same-color cards=${matchingCards.length}; setSize=${card.setSize}`);
        if (completedSet === card.setSize) {
            console.log('This is a full set pls work');
            player.fullSets++;
            saveGame(gameState);
            console.log('you have '+player.fullSets + 'full sets')
        }
        player.playerProperties.push(card); // Save in game state
    } else if (card.type === 'money') {
    player.playerBank += card.value;
    } 
    else if (card.category === 'action') {
        gameState.currentAction=card;
        console.log('This is the current Action card: '+gameState.currentAction.name)
        discardCard(card,player);
        switch(card.name) {
        case "Pass Go":
            drawCard(player);
            drawCard(player);
            break;
        case "It's My Birthday":
            nextPlayer.playerBank-=2;
            player.playerBank+=2;
            break;
        case "Debt Collector":
            nextPlayer.playerBank-=5;
            player.playerBank+=5;
            break;
        }
        saveGame(gameState);    
    }

    console.log(player.name+' has played: ' + card.name);

    // Remove from hand & reset selection
    player.playerHand = player.playerHand.filter(c => c.id !== card.id);
    gameState.selectedCard = null;

    saveGame(gameState);
}

export function bankCard(card, player) {
    if (!card) {
        console.error('No card selected for banking.');
        return;
    }

    player.playerBank += card.value;
    player.playerHand = player.playerHand.filter(c => c.id !== card.id);
    gameState.selectedCard = null;
    saveGame(gameState);
}

export function discardCard(card, player) {
    if (!card) {
        console.error('No card selected for discarding.');
        return;
    }

    player.playerHand = player.playerHand.filter(c => c.id !== card.id);
    gameState.discardPile.push(card);
    gameState.selectedCard = null;
    saveGame(gameState);
}

export function transfercard(loc1,loc2,cards){
    cards.forEach((card)=>{
        loc1=loc1.filter(c=>!cards.include(card));
        loc2.push(card);
        saveGame(gameState);
    })
}
