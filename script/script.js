import { gameInit, updateGame } from './render.js';
import { playCard,getCurrentPlayer} from './gameOps.js';
import { gameState } from './gameState.js';
import { startTurn, endTurn } from './flow.js';

document.addEventListener('DOMContentLoaded', () => {
    gameInit();
    startTurn();

    document.querySelector('#playcard_btn').addEventListener('click', () => {
        const player = getCurrentPlayer();
        playCard(player);
        updateGame();
    });

    // Add end turn button
    const endTurnBtn = document.createElement('button');
    endTurnBtn.id = 'endturn_btn';
    endTurnBtn.textContent = 'End Turn';
    endTurnBtn.style.cssText = 'position: absolute; right: 10%; top: 60%;';
    document.querySelector('main').appendChild(endTurnBtn);
    
    endTurnBtn.addEventListener('click', () => {
        if (getCurrentPlayer().name === 'You') {
            endTurn();
        }
    });

    document.querySelector('#hand').addEventListener('click', (e) => {
        const cardEl = e.target.closest('.deckcard');
        if (!cardEl) return;

        const cardId = Number(cardEl.dataset.id);
        const player = getCurrentPlayer();
        const foundCard = player.playerHand.find(c => c.id === cardId);

        if (foundCard) {
            gameState.selectedCard = foundCard;
            console.log("Selected:", foundCard.name);
        }

        document.querySelectorAll('#hand .deckcard').forEach(c => c.classList.remove('active'));
        cardEl.classList.add('active');
    });
});