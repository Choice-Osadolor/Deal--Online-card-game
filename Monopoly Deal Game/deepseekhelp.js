/////////////////////////////////////// Cards //////////////////////////////////////////////////
const properties = [
  // Brown
  { name: "Old Kent Road", color: "brown", setSize: 2, value: 1, type: "property" },
  { name: "Whitechapel Road", color: "brown", setSize: 2, value: 1, type: "property" },
  // Light Blue
  { name: "The Angel Islington", color: "lightBlue", setSize: 3, value: 1, type: "property" },
  { name: "Euston Road", color: "lightBlue", setSize: 3, value: 1, type: "property" },
  { name: "Pentonville Road", color: "lightBlue", setSize: 3, value: 1, type: "property" },
  // Pink
  { name: "Pall Mall", color: "pink", setSize: 3, value: 2, type: "property" },
  { name: "Whitehall", color: "pink", setSize: 3, value: 2, type: "property" },
  { name: "Northumberland Avenue", color: "pink", setSize: 3, value: 2, type: "property" },
  // Orange
  { name: "Bow Street", color: "orange", setSize: 3, value: 2, type: "property" },
  { name: "Marlborough Street", color: "orange", setSize: 3, value: 2, type: "property" },
  { name: "Vine Street", color: "orange", setSize: 3, value: 2, type: "property" },
  // Red
  { name: "Strand", color: "red", setSize: 3, value: 3, type: "property" },
  { name: "Fleet Street", color: "red", setSize: 3, value: 3, type: "property" },
  { name: "Trafalgar Square", color: "red", setSize: 3, value: 3, type: "property" },
  // Yellow
  { name: "Leicester Square", color: "yellow", setSize: 3, value: 3, type: "property" },
  { name: "Coventry Street", color: "yellow", setSize: 3, value: 3, type: "property" },
  { name: "Piccadilly", color: "yellow", setSize: 3, value: 3, type: "property" },
  // Green
  { name: "Regent Street", color: "green", setSize: 3, value: 4, type: "property" },
  { name: "Oxford Street", color: "green", setSize: 3, value: 4, type: "property" },
  { name: "Bond Street", color: "green", setSize: 3, value: 4, type: "property" },
  // Dark Blue
  { name: "Park Lane", color: "darkBlue", setSize: 2, value: 4, type: "property" },
  { name: "Mayfair", color: "darkBlue", setSize: 2, value: 4, type: "property" },
  // Railroads
  { name: "Railroad", color: "railroad", setSize: 4, value: 2, type: "property" },
  // Utilities
  { name: "Utility", color: "utility", setSize: 2, value: 2, type: "property" },
  // Wildcards
  { name: "Wildcard Brown/LightBlue", color: ["brown", "lightBlue"], setSize: null, value: 1, type: "property" },
  { name: "Wildcard Pink/Orange", color: ["pink", "orange"], setSize: null, value: 2, type: "property" },
  { name: "Wildcard Red/Yellow", color: ["red", "yellow"], setSize: null, value: 3, type: "property" },
  { name: "Wildcard Green/DarkBlue", color: ["green", "darkBlue"], setSize: null, value: 4, type: "property" },
  { name: "Wildcard Railroad/Utility", color: ["railroad", "utility"], setSize: null, value: 2, type: "property" },
  { name: "Wildcard Any", color: "any", setSize: null, value: 0, type: "property" }
];

const moneyCards = [
  { name: "$1", value: 1, type: "money" },
  { name: "$2", value: 2, type: "money" },
  { name: "$3", value: 3, type: "money" },
  { name: "$4", value: 4, type: "money" },
  { name: "$5", value: 5, type: "money" },
  { name: "$10", value: 10, type: "money" }
];

const actionCards = [
  { name: "Pass Go", type: "action", actionType: "draw", value: 1 },
  { name: "Debt Collector", type: "action", actionType: "charge", value: 3 },
  { name: "It's My Birthday", type: "action", actionType: "chargeAll", value: 2 },
  { name: "Rent (Wild)", type: "action", actionType: "rent", value: 3 },
  { name: "Rent Green/Blue", type: "action", actionType: "rent", value: 1 },
  { name: "Rent Brown/LightBlue", type: "action", actionType: "rent", value: 1 },
  { name: "Rent Pink/Orange", type: "action", actionType: "rent", value: 1 },
  { name: "Rent Red/Yellow", type: "action", actionType: "rent", value: 1 },
  { name: "Rent Railroad/Utility", type: "action", actionType: "rent", value: 1 },
  { name: "House", type: "action", actionType: "upgrade", value: 3 },
  { name: "Hotel", type: "action", actionType: "upgrade", value: 4 },
  { name: "Forced Deal", type: "action", actionType: "swap", value: 3 },
  { name: "Sly Deal", type: "action", actionType: "steal", value: 3 },
  { name: "Deal Breaker", type: "action", actionType: "stealSet", value: 5 },
  { name: "Just Say No", type: "action", actionType: "block", value: 4 },
  { name: "Double The Rent", type: "action", actionType: "modifier", value: 1 }
];

////////////////////////////////////// Game Setup ///////////////////////////////////////////
let deck = [];
let playerHand = [];
let playerProperties = [];
let playerBank = 0;

// UI Elements
const bankEl = document.querySelector('.bank');
const handEl = document.querySelector('#hand');
const propertyEl = document.querySelector('.properties');
const deckEl = document.querySelector('#deck');

//////////////////////////////// Game operations functions ///////////////////////////////////
function buildDeck() {
  // Combine all cards and shuffle
  deck = [...properties, ...moneyCards, ...actionCards];
  shuffleDeck(deck);
}

function shuffleDeck(deckArray) {
  for (let i = deckArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckArray[i], deckArray[j]] = [deckArray[j], deckArray[i]];
  }
}

function createCardElement(card) {
  const template = document.querySelector('#cardtemplate');
  const cardEl = template.content.cloneNode(true);
  const innerDiv = cardEl.querySelector('.card'); // assuming template has a .card div

  // Customize based on card type
  if (card.type === 'money') {
    innerDiv.textContent = card.name; // e.g., "$5"
  } else {
    innerDiv.textContent = card.name; // property or action name
  }

  // You can also set background color or image based on card.color if needed
  return cardEl;
}

function drawCard() {
  if (deck.length === 0) {
    console.log("Deck is empty!");
    return null;
  }
  const drawnCard = deck.pop();
  playerHand.push(drawnCard);
  return drawnCard;
}

// Rendering functions
function renderDeck() {
  deckEl.innerHTML = ''; // Clear
  if (deck.length > 0) {
    // Show a generic card back (using template or just a div)
    const backCard = document.createElement('div');
    backCard.className = 'card back';
    backCard.textContent = 'Deck';
    backCard.addEventListener('click', () => {
      drawCard();
      renderHand();
      renderDeck(); // update deck count/display
    });
    deckEl.appendChild(backCard);
  } else {
    deckEl.textContent = 'Empty';
  }
}

function renderHand() {
  handEl.innerHTML = '';
  playerHand.forEach(card => {
    const cardEl = createCardElement(card);
    // Optionally add click to play card (not implemented)
    handEl.appendChild(cardEl);
  });
}

function renderProperties() {
  propertyEl.innerHTML = '';
  playerProperties.forEach(card => {
    const cardEl = createCardElement(card);
    propertyEl.appendChild(cardEl);
  });
}

function renderBank() {
  bankEl.textContent = `$${playerBank}`;
}

function renderGame() {
  renderDeck();
  renderHand();
  renderProperties();
  renderBank();
}

// Initial deal: draw 5 cards
function dealInitialHand() {
  for (let i = 0; i < 5; i++) {
    drawCard();
  }
}

// Start the game
buildDeck();
dealInitialHand();
renderGame();

console.log('Game initialized!');