import { playCard,drawCard,getCurrentPlayer } from "./gameOps.js";
import { gameState } from "./gameState.js";
import { updateGame } from "./render.js";

export function startTurn(){
    const player=getCurrentPlayer();
    console.log(player.name+'r turn');

//draw two cards at the start of each turn
    drawCard(player);
    drawCard(player);
    
    if(player.name==='Computer'){
        setTimeout(computerTurn,2000);
    }
}

export function endTurn(){
    gameState.currentPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
    updateGame();
    startTurn();
}

export function computerTurn() {
    const player = getCurrentPlayer();

    let plays = 3;

    while (plays > 0) {
        let card =
            player.playerHand.find(c => c.color) ||
            player.playerHand.find(c => c.type === 'money') ||
            player.playerHand.find(c => c.type === 'action');

        if (!card) break;

        gameState.selectedCard = card;
        playCard(player);
        updateGame();
        plays--;
    }

    // End computer turn after a delay
    setTimeout(() => {
        endTurn();
    }, 1000);
}