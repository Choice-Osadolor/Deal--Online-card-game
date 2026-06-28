import{gameState} from './gameState.js'
import { updateGame } from './render.js';
import {saveGame } from './storage.js';

export const playerHand=gameState.playerHand;
export const playerBank=gameState.playerBank;
export const playerProperties=gameState.playerProperties;
                                    // Card Componenets

const cardHeaderPath = "./assets/card/header.svg";
const cardMainPath = "./assets/card/main.svg";


                                    // Parse SVGS
const parser = new DOMParser();
async function loadSVG(path){
    const svgText=await fetch(path)
        .then(res => res.text());
        return new DOMParser()
            .parseFromString(svgText, "image/svg+xml")
            .documentElement;
}
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
}

                                    // Load SVGS
const setTemplates = {
    default: await loadSVG("./assets/card/sets.svg"),
    long: await loadSVG("./assets/card/sets4.svg"),
    short: await loadSVG("./assets/card/sets2.svg")
};
const headerTemplate =await loadSVG(cardHeaderPath);
const mainTemplate=await loadSVG(cardMainPath);


                                        // Functions
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
    const sets =(card.setSize === 4 ? setTemplates.long:card.setSize === 2 ? setTemplates.short: setTemplates.default).cloneNode(true);
    const header = headerTemplate.cloneNode(true);
    const main = mainTemplate.cloneNode(true);
    makeIdsUnique(header);



    const cardEl = clone.querySelector('.deckcard');
    cardEl.dataset.id = card.id;

    // Front & Back of card
    const frontCard = cardEl.querySelector('.deckcard-front');
    const backCard = cardEl.querySelector('.deckcard-back');

    // Add location classes
    if (loc === 'deck') cardEl.classList.add('on-deck'); 
    if (loc === 'hand') cardEl.classList.add('in-hand');
    if (loc === 'properties') cardEl.classList.add('in-set');
    if (loc === 'discard') cardEl.classList.add('in-set');

    if (hidden) {
        cardEl.classList.add("hidden-card");
    }else if(card){
        frontCard.querySelectorAll('.value').forEach(v=>{v.textContent=card.value;})
        frontCard.querySelector('.name').textContent=card.name;
            if (card.category=='property') {
                // Change the colour
                sets.querySelectorAll(".mini-header").forEach(set => {
                    set.setAttribute("fill", card.color);
                });
                header.querySelectorAll(".card-header").forEach(head => {
                    head.setAttribute("fill", card.color);
                });
            
                if(card.name=='Wildcard Any'){
                    frontCard.querySelectorAll('.illustration').forEach(i=>{
                        i.setAttribute('src','./assets/illustrations/wildcard.png');
                        
                    main.querySelectorAll(".main-bg").forEach(bg => {
                    bg.setAttribute("fill", "#CDA4F8");
                });
                    })
                }
                frontCard.querySelector('.sets').appendChild(sets)

            }else if(card.category=='action'){
                    main.querySelectorAll(".main-bg").forEach(bg => {
                    bg.setAttribute("fill", "#CDA4F8");
                });
                header.querySelectorAll(".card-header").forEach(head => {
                    head.setAttribute("fill", card.color);
                });
                
                frontCard.querySelectorAll('.illustration').forEach(i=>{
                    switch (card.name) {
                        case "House":
                            i.setAttribute('src',"./assets/illustrations/House.png");
                            break;
                        case "Hotel":
                            i.setAttribute('src',"./assets/illustrations/hotel.png");
                            break;
                        case "Just Say No":
                            i.setAttribute('src',"./assets/illustrations/JustSayNo.png");
                            break;
                    
                        default:
                            break;
                    }
                })    


                

            }            
        

            frontCard.appendChild(main);
            frontCard.querySelector('.header-main').appendChild(header);


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
        console.log('ACTION CARD IS BEING PLAYEd')
        gameState.currentAction=card;
        console.log('This is the current Action card: '+gameState.currentAction.name)
        discardCard(card,player);
        resolveAction(card,player);
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

export function resolveAction(card,player){
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
        case "Sly Deal":
            transferCard();
            break;

        }

        
}


export function transferCard(from, to, card) {
    const index = from.findIndex(c => c.id === card.id);

    if (index !== -1) {
        const [movedCard] = from.splice(index, 1);
        to.push(movedCard);
    }
    saveGame(gameState);
}