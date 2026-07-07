import{gameState} from './gameState.js'
import { updateGame } from './render.js';
import {saveGame } from './storage.js';

// export const playerHand=gameState.playerHand;
// export const playerBank=gameState.playerBank;
// export const playerProperties=gameState.playerProperties;
                                    // Card Componenets

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
const headerTemplates = {
    default: await loadSVG("./assets/card/header.svg"),
    property: await loadSVG("./assets/card/header-property.svg"),
    wild: await loadSVG("./assets/card/header-wild.svg")
};
const mainTemplates = {
    default: await loadSVG("./assets/card/main.svg"),
    // property: await loadSVG("./assets/card/sets4.svg"),
    wild: await loadSVG("./assets/card/main-wild.svg")
};
const rentTemplate=await loadSVG('./assets/card/rent.svg');

                                        // Functions
export function getCurrentPlayer(){
    const currentPlayer=gameState.players[gameState.currentPlayer];
    return currentPlayer;
}

export function getCardOptions(card,player){
    let options=[];

    if(card.category=='property'){
        options.push('play');
    }    
    if (card.type === "money") {
        options.push("bank");
    }
    if (card.category=='action'){
        options.push("play");
        options.push("bank");
    }
    if (player.playerHand.length > 7) {
        options.push("discard");
    }
    if(card.name=='House' || card.name=='Hotel'){
        if (player.fullSets === 0) {
            options = options.filter(option => option !== "play");
        }
    }

    if(card.name=='Just Say No'){
        if(currentAction && player.name=='You'){
            options = options.filter(option => option !== "play");    
        }
    }
    if(gameState.cardsPlayed==3){
            options = options.filter(option => option !== "play");
            options = options.filter(option => option !== "bank");

  
    }
    const nextPlayer =gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];    

    if(card.type=='steal' || card.type=='stealSet' ||card.type=='swap'){
        if(nextPlayer.playerProperties.length==0){
                options = options.filter(option => option !== "play");
        }else{
        options.push("play");

        }
    }

// If card is property and is in player properteis
    // const inHand = player.playerHand.filter(
    //         p=> p.color === card.color
    //     );
    // if(card.category=='property' && !inHand){
    //     options.push("steal");
    // }
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
    const header =(card.type === "wildcard" ? headerTemplates.wild: card.category==='property'?headerTemplates.property: headerTemplates.default).cloneNode(true);
    const main =(card.type === "wildcard" ? mainTemplates.wild:mainTemplates.default).cloneNode(true);
    const rent = rentTemplate.cloneNode(true);

    let fillcolor='#CDA4F8';
    makeIdsUnique(header);
    makeIdsUnique(main);
    makeIdsUnique(rent);



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
        if(card.type!='rent'){
            frontCard.querySelector('.name').textContent=card.name;
        }
            if (card.category=='property' && card.type!='wildcard') {
                // Change the colour
                fillcolor='transparent';
                sets.querySelectorAll(".mini-header").forEach(set => {
                    set.setAttribute("fill", card.color);
                });
                header.querySelectorAll(".card-header").forEach(head => {
                    head.setAttribute("fill", card.color);
                });
        
                frontCard.querySelector('.sets').appendChild(sets)

            }else if(card.category=='action'){

                if(card.type=='rent'){
                    fillcolor='transparent';
                    rent.classList.add('illustration', 'rent');
                    card.description='Charge All Players, Rent of either Color';
                    card.color='transparent';
                    rent.querySelectorAll('.color1').forEach(c=>{
                        c.setAttribute('stop-color', card.color1 || '#FFEA00');
                    })
                    rent.querySelectorAll('.color2').forEach(c=>{
                        c.setAttribute('stop-color', card.color2 || '#FF0000');
                    })

                    const mainLayer = frontCard.querySelector('.main');
                    const rentPlaceholder = mainLayer.querySelector('.rent');
                    if (rentPlaceholder) {
                        rentPlaceholder.style.display = 'none';
                    }

                    mainLayer.appendChild(rent);

                }

                frontCard.querySelectorAll('.bottom').forEach(b=>{
                    b.setAttribute('src','./assets/card/content-short.svg')
                })
                frontCard.querySelectorAll('.description').forEach(d=>{
                    d.textContent=card.description;
                })

                header.querySelectorAll(".card-header").forEach(head => {
                    head.setAttribute("fill", card.color);
                });
                
                frontCard.querySelectorAll('.illustration').forEach(i=>{

                    switch (card.name) {
                        case "House":
                            card.description='Place this on a complete set';
                            i.setAttribute('src',"./assets/illustrations/House.png");
                            break;
                        case "Hotel":
                            card.description='Place this unto a complete set with a house';
                            i.setAttribute('src',"./assets/illustrations/hotel.png");
                            break;
                        case "Just Say No":
                            card.description='Say no to card dealt by opponent'
                            i.setAttribute('src',"./assets/illustrations/JustSayNo.png");
                            break;
                        case "Double The Rent":
                            card.description='Needs to be played with a rent card'
                            i.setAttribute('src',"./assets/illustrations/double.png");
                            break; 
                        case "Deal Breaker":
                            card.description='Steal an opponents full,complete set';
                            i.setAttribute('src',"./assets/illustrations/deal.png");  
                            break; 
                        case "Sly Deal":
                            card.description='Steal a property(Cannot be part of a full set)';
                            i.setAttribute('src',"./assets/illustrations/steal.png");  
                            break;              
                        case "Forced Deal":
                            card.description='swap any property with another player';
                            i.setAttribute('src',"./assets/illustrations/swap.png");                
                        default:
                            break;
                    }
                })    


                

            }else if(card.type==='wildcard'){
                fillcolor='#CDA4F8';
                frontCard.querySelectorAll('.bottom').forEach(b=>{
                    b.setAttribute('src','./assets/card/content-short.svg')
                })
                frontCard.querySelectorAll('.description').forEach(d=>{
                    d.textContent='This card can be used as any part of any set';
                })
                frontCard.querySelectorAll('.illustration').forEach(i=>{
                    i.setAttribute('src','./assets/illustrations/wildcard.png');
                        
                })
            }else if(card.type=='money'){
                fillcolor='#CAEBB8';
                frontCard.querySelectorAll('.illustration').forEach(i=>{
                    i.classList.add('money')
                    i.setAttribute('src',"./assets/illustrations/cash.png");
                    frontCard.querySelectorAll('.description').forEach(d=>{
                        d.textContent=`${card.value}m`;
                        d.classList.add('money')
                    })
                })

            }
        if (card.type === 'rent') {
            main.querySelectorAll('.color1').forEach(c=>{
                c.setAttribute('stop-color', card.color1 || '#FFEA00');
            })
            main.querySelectorAll('.color2').forEach(c=>{
                c.setAttribute('stop-color', card.color2 || '#FF0000');
            })
            main.querySelectorAll('.main-bg').forEach(bg => {
                bg.setAttribute('fill', 'transparent');
            });
        } else {
            main.querySelectorAll('.main-bg').forEach(bg => {
                bg.setAttribute('fill', fillcolor);
            });
        }
        
            frontCard.appendChild(main);
            if(card.type!='rent'){
                            frontCard.querySelector('.header-main').appendChild(header);

            }


    }

    return clone;
}

export function isFullSet(player, color) {
    const matchingCards = player.playerProperties.filter(
        p => p.color === color
    );

    if (matchingCards.length === 0) return false;
    return matchingCards.length >= matchingCards[0].setSize;
}

export function drawCard(player) {
    
    if(gameState.deck.length === 0) {
        console.log("Deck is empty!");
        return null;
    }

const drawnCard=gameState.deck.pop();
player.playerHand.push(drawnCard);

// console.log(player.name+'has drawn:'+drawnCard.name);

saveGame(gameState);//save to storage
return drawnCard;
}


let playSound=document.getElementById('playSound')
function playAudio() {
  playSound.play();
}


export function playCard(player){
console.log("currentAction:", gameState.currentAction?.name);
console.log("selectedCard:", gameState.selectedCard?.name);
console.log("targetedCard:", gameState.targetedCard?.name);

playAudio();

    const playBtn = document.querySelector("#playcard_btn");
    const nextPlayer =gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];    
    console.log('opponent is:' + nextPlayer.name);

    if(gameState.currentAction){
    // If an action is in progress, depen'

         switch (gameState.currentAction.type) {
            case "steal":
                transferCard(nextPlayer.playerProperties, player.playerProperties, gameState.targetedCard);
                gameState.currentAction = null;
                gameState.targetedCard=null;
        playBtn.textContent='Play Card';

                return;
            case "swap":
                transferCard(nextPlayer.playerProperties, player.playerProperties, gameState.targetedCard);
                transferCard(player.playerProperties,nextPlayer.playerProperties, gameState.selectedCard);
                gameState.currentAction = null;
                gameState.targetedCard=null;
            playBtn.textContent='Play Card';
                return;
            case "stealSet":
                const foundSet = nextPlayer.playerProperties.filter(p => p.color === gameState.targetedSet);
                foundSet.forEach(card=>{
                    transferCard(nextPlayer.playerProperties, player.playerProperties, card);
                })
                gameState.currentAction = null;
                gameState.targetedSet=null;
                console.log('A set has been stolen');
                return;
            case "rent":
                chargeRent(player);
                console.log('Opponent has been charged rent, and WE UP');
            return;
            case "block":
                gameState.currentAction=null;
            return;
            case "wildcard":
                const wildcardSet = gameState.targetedSet || chooseBestSet(player);
                if (wildcardSet) {
                    gameState.currentAction.color = wildcardSet;
                    const alreadyPlaced = player.playerProperties.some(card => card.id === gameState.currentAction.id);
                    if (!alreadyPlaced) {
                        player.playerProperties.push(gameState.currentAction);
                    }
                    updateFullSets(player);
                    console.log('Wildcard resolved for set:', wildcardSet);
                }
                saveGame(gameState);
                gameState.currentAction = null;
                gameState.targetedSet = null;
            return;

            }
            
updateFullSets(player);
updateFullSets(nextPlayer);
        saveGame(gameState);
        updateGame();
        return;
    }

    const card = gameState.selectedCard;
    if (!card) {
        console.log("Please select a card first");
        return;
    }
    gameState.cardsPlayed++;
    console.log(gameState.cardsPlayed);
        if(card.type=='wildcard'){
        player.playerProperties.push(card); // Save in game state
            gameState.currentAction=card;
        }
    if (card.color && card.setSize != null) {
        player.playerProperties.push(card); // Save in game state
        updateFullSets(player);
    } else if (card.type === 'money') {
    player.playerBank += card.value;
    } 
    else if (card.category === 'action') {
        // Otherwise we're starting the action
        discardCard(card, player);
        gameState.currentAction = card;
        gameState.selectedCard = null;
        saveGame(gameState);


        resolveAction(card, player);
        updateGame();
        return;

    }


console.log(player.name + ' has played: ' + card.name);
    // Remove from hand & reset selection

player.playerHand = player.playerHand.filter(c => c.id !== card.id);
gameState.selectedCard = null;

saveGame(gameState);
updateGame();
}

export function bankCard(card, player) {
    if (!card) {
        console.error('No card selected for banking.');
        return;
    }
    gameState.cardsPlayed++;
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
    const nextPlayer =gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];    
const currentPlayer = getCurrentPlayer();
const isOpponent = player !== currentPlayer;

    switch(card.name) {
        case "Pass Go":
            drawCard(player);
            drawCard(player);
            gameState.currentAction=null;
            break;
        case "It's My Birthday":
            nextPlayer.playerBank-=2;
            player.playerBank+=2;
            gameState.currentAction=null;
            break;
        case "Debt Collector":
            nextPlayer.playerBank-=5;
            player.playerBank+=5;
            gameState.currentAction=null;
            break;
        }
if(player.name=='Computer'){
    console.log('TESTING COMPUTERS RESOLVE FOR ACTIONS');
    switch(card.type) {
        case "steal":
        // gameState.targetedCard=nextPlayer.playerProperties[0];
        gameState.targetedCard=chooseBestProperty(player);
        // Returns a full card object
        
        saveGame(gameState);
        playCard(player);
        console.log('Your Card has been stolen')
            break;
        case "swap":
    gameState.targetedCard = chooseBestProperty(player);
    gameState.selectedCard = chooseSwapProperty(player);

        saveGame(gameState);
        playCard(player);
            break;
        case "stealSet":
            // const fullSet = nextPlayer.playerProperties.find(card =>
            //     isFullSet(nextPlayer, card.color)
            // );
            // if (fullSet) {
            //     gameState.targetedSet = fullSet.color;
            //     saveGame(gameState)
            //     playCard(player);
            // }

                gameState.targetedSet = chooseBestFullSet(nextPlayer);

    if (gameState.targetedSet) {
        saveGame(gameState);
        playCard(player);
    }
            break;
        case "rent":
            const bestSet = chooseBestSet(player);
            gameState.targetedSet = bestSet;
            saveGame(gameState);
            playCard(player);
            break;
        case "wildcard":
            gameState.targetedSet = chooseBestSet(player);
            saveGame(gameState);
            if (gameState.targetedSet) {
                playCard(player);
            }
            break;
        }
    }
}


// Strategise
function chooseBestProperty(player) {
const opponent =gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];
const opponentProperties = opponent.playerProperties.filter( property => !isFullSet(opponent, property.color));

    const scoredProperties =opponentProperties.map(property => {
        const matchingColor = player.playerProperties.some( myProperty => myProperty.color == property.color);
        const sameColorCards = opponent.playerProperties.filter( card => card.color === property.color);
        const progress = sameColorCards.length /(sameColorCards[0]?.setSize || 1);
        // Maximum value
        const rentValue = sameColorCards[0]?.rent?.[Math.max(0, sameColorCards.length - 1)] ?? 0;

// dev community code
        return {property,score:(matchingColor ?1000 : 0) + (rentValue * 20) + (progress * 100) + property.value};
    });

    scoredProperties.sort((a,b)=> b.score -a.score);
    return scoredProperties[0]?.property || opponent.playerProperties[0] || null;
}

function chooseBestSet(player) {
    const opponent = gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];
    const colours = [...new Set(player.playerProperties.map(card => card.color))];

    const scoredSets = colours.map(colour => {
        const cards = player.playerProperties.filter(card => card.color === colour);
        const setSize = cards[0]?.setSize || 1;
        const progress = cards.length / setSize;
        const rentValue = cards[0]?.rent?.[Math.max(0, cards.length - 1)] ?? 0;
        const opponentHasColor = opponent.playerProperties.some(card => card.color === colour);

        return {
            colour,
            score: (rentValue * 25) + (progress * 100) + (opponentHasColor ? 15 : 0) + cards.length
        };
    });

    scoredSets.sort((a, b) => b.score - a.score);
    return scoredSets[0]?.colour || null;
}

function chargeRent(player) {
    const targetPlayer = gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];
    const selectedSet = gameState.targetedSet || chooseBestSet(player);
    const propertySet = player.playerProperties.filter(card => card.color === selectedSet);
    const setCard = propertySet[0];
    const rentAmount = setCard?.rent?.[Math.max(0, propertySet.length - 1)] ?? 0;

    if (selectedSet && propertySet.length > 0 && rentAmount > 0) {
        targetPlayer.playerBank -= rentAmount;
        player.playerBank += rentAmount;
    }

    gameState.currentAction = null;
    gameState.targetedSet = null;
    saveGame(gameState);
}

function chooseBestFullSet(player) {
    const colours = [...new Set(player.playerProperties.map(card => card.color))];

    const fullSets = colours
        .filter(colour => isFullSet(player, colour))
        .map(colour => {
            const cards = player.playerProperties.filter(card => card.color === colour);
            const rentValue = cards[0]?.rent?.[Math.max(0, cards.length - 1)] ?? 0;
            return {
                colour,
                score: (rentValue * 25) + cards.reduce((total, card) => total + card.value, 0)
            };
        })
        .sort((a, b) => b.score - a.score);

    return fullSets[0]?.colour || null;
}

function chooseSwapProperty(player) {
    let best = null;

    player.playerProperties.forEach(property => {
        const matching = player.playerProperties.filter(
            p => p.color === property.color
        );
// Only one
        if (matching.length === 1) {
            if (!best || property.value < best.value) {
                best = property;
            }
        }

    });
    // else
    return best || player.playerProperties[0];
}

export function updateFullSets(player) {

    let fullSets = 0;

    const colours = [...new Set(
        player.playerProperties.map(card => card.color)
    )];

    colours.forEach(colour => {
        if (isFullSet(player, colour)) {
            fullSets++;
        }
    });

    player.fullSets = fullSets;

    saveGame(gameState);
}
export function transferCard(from, to, card) {
    const index = from.findIndex(c => c.id === card.id);

    if (index !== -1) {
        const [movedCard] = from.splice(index, 1);
        to.push(movedCard);
    }
    saveGame(gameState);
}