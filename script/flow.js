import { animateLose, animateWin } from "./animations.js";
import { playCard,drawCard,getCurrentPlayer} from "./gameOps.js";
import { gameState } from "./gameState.js";
import { updateGame ,dealCards} from "./render.js";

export function startTurn(){
    const player=getCurrentPlayer();
    gameState.cardsPlayed=0;
    //Set Current Player=player
    dealCards(player,2);
    if (player.name == 'Computer') {
        computerTurn();
    }

    // Cards Played variable
console.log(gameState.cardsPlayed);
console.log(typeof gameState.cardsPlayed);

}


export function endTurn(){
    const player = getCurrentPlayer();
    if (player.playerHand.length > 7) {
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
        if (matchingCards.length > 0 || card.color) {
            gameState.selectedCard = card;
try {
    playCard(player);
} catch (err) {
    console.error("AI failed while playing:", err);
}            updateGame();
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
}                updateGame();
            }else if(card.type=='action'){
                gameState.selectedCard=card;
try {
    playCard(player);
} catch (err) {
    console.error("AI failed while playing:", err);
}                updateGame();    
            }            
    })

    setTimeout(() => {
        endTurn()
    }, 2000);


}

export function endGame(){
    console.log('This game is over, '+getCurrentPlayer().name+' won');
    
}

export function hasWon(player){
    if(player.fullSets==1){
        if(player.name=='You'){
            animateWin();
        }else{
            animateLose();
        }
        return true;
    }
}