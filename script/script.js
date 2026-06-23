import { gameInit, updateGame,dealCards,renderButtons} from './render.js';
import { playCard,getCurrentPlayer,getCardOptions,bankCard,discardCard} from './gameOps.js';
import { gameState } from './gameState.js';
import { startTurn, endTurn,hasWon,endGame} from './flow.js';


console.log(gameState.deck.length);

const start=document.getElementById('startgame_btn');
const end=document.getElementById('endturn_btn');
start.addEventListener('click', () => {
    start.classList.add('disabled');
    end.classList.remove('disabled');
    gameInit();
    updateGame();

    setTimeout(() => {
        startTurn();
    }, 2000); // or however long the dealing animation lasts    
    dealCards()
    document.querySelector('#playcard_btn').addEventListener('click', () => {
        const player = getCurrentPlayer();
        playCard(player);
        updateGame();

        setTimeout(() => {
            if(hasWon(player)){
                endGame();
            }  
        }, 1000);
        if(gameState.cardsPlayed>=3){
            endTurn();
        }
    });

    // Add end turn button
    const endTurnBtn = document.getElementById('endturn_btn');


    endTurnBtn.addEventListener('click', () => {
            endTurn();
    });

    

    document.querySelector('#hand').addEventListener('click', (e) => {
        const cardEl = e.target.closest('.deckcard');
        if (!cardEl) return;

        const cardId = Number(cardEl.dataset.id);
        const player = getCurrentPlayer();
        const foundCard = player.playerHand.find(c => c.id === cardId);

        if (foundCard) {
            gameState.selectedCard = foundCard;
            let currentOptions = getCardOptions(foundCard, player);
            renderButtons(currentOptions);
            console.log(getCardOptions(foundCard, player));
            console.log("Selected:", foundCard.name);
        }

        document.querySelectorAll('#hand .deckcard').forEach(c => c.classList.remove('active'));
        cardEl.classList.add('active');
    });
});

const bankBtn = document.querySelector("#bankcard_btn");
bankBtn.addEventListener('click', () => {
    const player = getCurrentPlayer();
    const card = gameState.selectedCard;

    if (!card) {
        console.warn('Select a card first to bank.');
        return;
    }

    const options = getCardOptions(card, player);
    if (!options.includes('bank')) {
        console.warn('Selected card cannot be banked.');
        return;
    }

    bankCard(card, player);
    updateGame();
});

const discardBtn = document.querySelector("#discard_btn");
discardBtn.addEventListener('click', () => {
    const player = getCurrentPlayer();
    const card = gameState.selectedCard;

    if (!card) {
        console.warn('Select a card first to discard.');
        return;
    }

    // const options = getCardOptions(card, player);
    // if (!options.includes('discard')) {
    //     console.warn('Selected card cannot be discarded yet.');
    //     return;
    // }

    discardCard(card, player);
    updateGame();
});
