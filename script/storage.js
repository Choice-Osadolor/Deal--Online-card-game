import { gameState } from './gameState.js';

export function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function loadGame() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        Object.assign(gameState, JSON.parse(saved));
    }
}