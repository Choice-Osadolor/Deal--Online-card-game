import { animatedraw, animateLose, animateWin } from "./animations.js";
import { playCard,drawCard,getCurrentPlayer, discardCard, bankCard} from "./gameOps.js";
import { gameState } from "./gameState.js";
import { updateGame ,dealCards} from "./render.js";
import { saveGame } from "./storage.js";


function canComputerPlayAction(card, player) {
    const opponent = gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];
    if (card.type === "rent") {
        const requiredColors = [card.color1, card.color2]
            .filter(Boolean)
            .map(normalizeColor);
        if (requiredColors.length === 0) {
            return player.playerProperties.length > 0;
        }

        return player.playerProperties.some(property =>
          requiredColors.includes(String(color || "").toLowerCase().replace(/\s+/g, ""))
        );
    }
    if (card.type === "steal" || card.type === "stealSet" || card.name === "Forced Deal" || card.type === "swap") {
        if (!opponent?.playerProperties?.length) {
            return false;
        }if ((card.type === "swap" || card.name === "Forced Deal") && player.playerProperties.length === 0) {
            return false;
        }
    return true;
    }
    return true;
}

export async function startTurn(){
const startDate = new Date('2023-08-15T00:00:00');
const endDate = Date.now();
const timeDifferenceMS = endDate - startDate;
const timeDifferenceMins = Math.floor(timeDifferenceMS / 60000);

    const player=getCurrentPlayer();
    gameState.cardsPlayed=0;
    //Set Current Player=player
    if(player.playerHand.length==0){
        dealCards(player, 5);
    }
    dealCards(player, 2, true);

    if (player.name == 'Computer') {
        computerTurn();
    }

    // Cards Played variable
console.log('You have played '+gameState.cardsPlayed+' moves.');

}


export function endTurn(){
    const player = getCurrentPlayer();
    gameState.turnstaken++;
    saveGame(gameState);

    if (player.playerHand.length > 7 && player.name=='You') {
        alert('You have more than 7 cards, discard cards before endin your turn')
    }else{
        console.log('ending Turn');
        gameState.currentPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
        updateGame();
        startTurn();    
    }

}

export function computerTurn() {
console.log("Computer turn started");
    const player = getCurrentPlayer();

    player.playerHand.forEach((card,i)=>{
        const matchingCards = player.playerProperties.filter(
            p => p.color === card.color
        );

        if (matchingCards.length > 0 || card.category=='property') {
            gameState.selectedCard = card;
            try {
                playCard(player);
            } catch (err) {
                console.error("AI failed while playing:", err);
            }            
            updateGame();
            setTimeout(() => {
                if(hasWon(player)){
                    endGame();
                }  
            }, 1000);
        }else if(card.type=='money'){
            gameState.selectedCard=card;
            try {
                playCard(player);
            } catch (err) {
                console.error("AI failed while playing:", err);
            }                
            updateGame();
        }else if(card.category=='action'){
            gameState.selectedCard=card;
            try {
                if (canComputerPlayAction(card, player)) {
                    playCard(player);
                } else {
                    bankCard(card, player);
                }
            } catch (err) {
                console.error("AI failed while playing:", err);
            }                
            updateGame();    
        }     
           
    })
    setTimeout(() => {
        endTurn()
    }, 2000);


}
// export function computerTurn() {
// console.log("Computer turn started");
//     const nextPlayer =gameState.players[(gameState.currentPlayer + 1) % gameState.players.length];    

//     const player = getCurrentPlayer();

//     player.playerHand.forEach((card,i)=>{
//         const matchingCards = player.playerProperties.filter(
//             p => p.color === card.color
//         );

//         if (matchingCards.length > 0 || card.category=='property') {
//             if(card.type=='wildcard'){
//                 return
//             }else{
//             gameState.selectedCard = card;
//             }
//             try {
//                 playCard(player);
//             } catch (err) {
//                 console.error("AI failed while playing:", err);
//             }            
//             updateGame();
//             setTimeout(() => {
//                 if(hasWon(player)){
//                     endGame();
//                 }  
//             }, 1000);
//         }else if(card.type=='money'){
//             gameState.selectedCard=card;
//             try {
//                 playCard(player);
//             } catch (err) {
//                 console.error("AI failed while playing:", err);
//             }                
//             updateGame();
//         }else if(card.category=='action'){
//             gameState.selectedCard=card;

//             if(card.type=='steal' || card.type=='swap' || card.type=='stealSet'){
//                 if(nextPlayer.playerProperties.length==0){
//                     // Dont play card
//                     bankCard(card,player);
//                 }
//             }else if(card.type=='swap' || card.type=='rent'){
//                 if(player.playerProperties.length==0){
//                     bankCard(card,player);
//                 }
//             }else{

//             try {
//                 playCard(player);
//             } catch (err) {
//                 console.error("AI failed while playing:", err);
//             }               
//         }

             
//             updateGame();    
//         }     
           
//     })



//     // if the difference is greater than 0, discard card
// // Eveyrtime a card is discarded, difference --
//     setTimeout(() => {
//         endTurn()
//     }, 2000);


// }


export function endGame(){

    console.log('This game is over, '+getCurrentPlayer().name+' won');
    
}

export function hasWon(player) {
    if (player.fullSets === 2 && player.playerBank >= 0) {
    // if (player.fullSets ==1) {

        if (player.name === "You") {
            animateWin();
        } else {
            animateLose();
        }
        gameState.winner=player;
        return true;
    }

    return false;
}