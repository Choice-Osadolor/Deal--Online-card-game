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
export function createCard(card, loc) {
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

    // Select the SVG base image
    const baseImg = cardEl.querySelector('.base-image');
    if (!baseImg) {
        console.warn('base-image not found in template for card:', card.name);
    }

    // Add location classes
    if (loc === 'deck') cardEl.classList.add('on-deck');
    if (loc === 'hand') cardEl.classList.add('in-hand');
    if (loc === 'properties') cardEl.classList.add('in-set');

    // Add a single class based on card color/type
    if (card.color) {
        if (card.color === 'any' || Array.isArray(card.color)) {
            if (baseImg) baseImg.setAttribute('xlink:href', 'assets/wildcard.png');
        } else {
            if (baseImg) baseImg.setAttribute('xlink:href', `assets/defaultcard.png`);
            cardEl.classList.add(card.color.toLowerCase());
        }
    }

    if (card.type) {
        cardEl.classList.add(card.type.toLowerCase());
    }

    return clone;
}

export function drawCard(player) {
    if(gameState.deck.length === 0) {
        console.log("Deck is empty!");
        return null;
    }
const drawnCard=gameState.deck.pop();
player.playerHand.push(drawnCard);
console.log(player.name+'has drawn:'+drawnCard.name);

saveGame(gameState);//save to storage
return drawnCard;
}


export function playCard(player) {
    let card = gameState.selectedCard;
    // const player=getCurrentPlayer();// PASS CURREBTPLAYER INTO PLAYCARD

    if (!card) {
        console.log('Please select a card first');
        return;
    }
    if (card.color) { // Property card
        player.playerProperties.push(card); // Save in game state
    } 
    else if (card.type === 'money') {
        player.playerBank += card.value;
    } 
    else if (card.type === 'action') {
 // apply action card function
    }

    console.log(player.name+' has played: ' + card.name);

    // Remove from hand & reset selection
    player.playerHand = player.playerHand.filter(c => c.id !== card.id);
    gameState.selectedCard = null;

    saveGame(gameState);
}

function computerTurn() {
    const player = getCurrentPlayer();

    for (let i = 0; i < 3; i++) {
        let card = player.hand[Math.floor(Math.random() * player.hand.length)];
        if (!card) break;

        gameState.selectedCard = card;
        playCard(player);
    }

    endTurn();
}