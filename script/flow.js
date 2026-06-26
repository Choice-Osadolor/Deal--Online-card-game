import { animateLose, animateWin } from "./animations.js";
import { playCard,drawCard,getCurrentPlayer,playerProperties} from "./gameOps.js";
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
    gameState.currentPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
    updateGame();
    startTurn();
}

export function computerTurn() {
    console.log('Computers turn');
    const player = getCurrentPlayer();

    player.playerHand.forEach((card,i)=>{
        const matchingCards = player.playerProperties.filter(
            p => p.color === card.color
        );
        if (matchingCards.length > 0 || card.color) {
            gameState.selectedCard = card;
            playCard(player);
            updateGame();
            setTimeout(() => {
                if(hasWon(player)){
                    endGame();
                }  
            }, 1000);
        }else if(card.type=='money'){
                gameState.selectedCard=card;
                playCard(player);
                updateGame();
            }else if(card.type=='action'){
                gameState.selectedCard=card;
                playCard(player);
                updateGame();    
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
    if(player.fullSets==3){
        if(player.name=='You'){
            animateWin();
        }else{
            animateLose();
        }
        return true;
    }
}