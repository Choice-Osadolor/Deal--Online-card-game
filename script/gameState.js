
/////////////////////////////////////// Cards //////////////////////////////////////////////////
/////////////////////////////////////// Cards //////////////////////////////////////////////////
export const properties = [
  // Brown
  { name: "Old Kent Road", color: "brown", setSize: 2, value: 1, id: 1 },
  { name: "Whitechapel Road", color: "brown", setSize: 2, value: 1, id: 2 },

  // Light Blue
  { name: "The Angel Islington", color: "lightBlue", setSize: 3, value: 1, id: 3 },
  { name: "Euston Road", color: "lightBlue", setSize: 3, value: 1, id: 4 },
  { name: "Pentonville Road", color: "lightBlue", setSize: 3, value: 1, id: 5 },

  // Pink
  { name: "Pall Mall", color: "pink", setSize: 3, value: 2, id: 6 },
  { name: "Whitehall", color: "pink", setSize: 3, value: 2, id: 7 },
  { name: "Northumberland Avenue", color: "pink", setSize: 3, value: 2, id: 8 },

  // Orange
  { name: "Bow Street", color: "orange", setSize: 3, value: 2, id: 9 },
  { name: "Marlborough Street", color: "orange", setSize: 3, value: 2, id: 10 },
  { name: "Vine Street", color: "orange", setSize: 3, value: 2, id: 11 },

  // Red
  { name: "Strand", color: "red", setSize: 3, value: 3, id: 12 },
  { name: "Fleet Street", color: "red", setSize: 3, value: 3, id: 13 },
  { name: "Trafalgar Square", color: "red", setSize: 3, value: 3, id: 14 },

  // Yellow
  { name: "Leicester Square", color: "yellow", setSize: 3, value: 3, id: 15 },
  { name: "Coventry Street", color: "yellow", setSize: 3, value: 3, id: 16 },
  { name: "Piccadilly", color: "yellow", setSize: 3, value: 3, id: 17 },

  // Green
  { name: "Regent Street", color: "green", setSize: 3, value: 4, id: 18 },
  { name: "Oxford Street", color: "green", setSize: 3, value: 4, id: 19 },
  { name: "Bond Street", color: "green", setSize: 3, value: 4, id: 20 },

  // Dark Blue
  { name: "Park Lane", color: "darkBlue", setSize: 2, value: 4, id: 21 },
  { name: "Mayfair", color: "darkBlue", setSize: 2, value: 4, id: 22 },

  // Railroads
  { name: "Railroad", color: "railroad", setSize: 4, value: 2, id: 23 },

  // Utilities
  { name: "Utility", color: "utility", setSize: 2, value: 2, id: 24 },

  // Wildcards
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 0, id: 25 },
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 0, id: 26 },
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 0, id: 27 },
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 0, id: 28 },
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 0, id: 29 },
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 0, id: 30 }
];

export const moneyCards = [
  { value: 1, type: 'money', id: 31 },
  { value: 2, type: 'money', id: 32 },
  { value: 3, type: 'money', id: 33 },
  { value: 4, type: 'money', id: 34 },
  { value: 5, type: 'money', id: 35 },
  { value: 10, type: 'money', id: 36 }
];

export const actionCards = [
  { name: "Pass Go", type: "draw", value: 1, id: 37 },
  { name: "Debt Collector", type: "charge", value: 3, id: 38 },
  { name: "It's My Birthday", type: "chargeAll", value: 2, id: 39 },
  { name: "Rent (Wild)", type: "rent", value: 3, id: 40 },
  { name: "Rent Green/Blue", type: "rent", value: 1, id: 41 },
  { name: "Rent Brown/LightBlue", type: "rent", value: 1, id: 42 },
  { name: "Rent Pink/Orange", type: "rent", value: 1, id: 43 },
  { name: "Rent Red/Yellow", type: "rent", value: 1, id: 44 },
  { name: "Rent Railroad/Utility", type: "rent", value: 1, id: 45 },
  { name: "House", type: "upgrade", value: 3, id: 46 },
  { name: "Hotel", type: "upgrade", value: 4, id: 47 },
  { name: "Forced Deal", type: "swap", value: 3, id: 48 },
  { name: "Sly Deal", type: "steal", value: 3, id: 49 },
  { name: "Deal Breaker", type: "stealSet", value: 5, id: 50 },
  { name: "Just Say No", type: "block", value: 4, id: 51 },
  { name: "Double The Rent", type: "modifier", value: 1, id: 52 }
];

////////////////////////////////////// Game Setup ///////////////////////////////////////////

// Game state variables
// console.log(deck);

let player=[];

export const gameState = {
    deck:properties.concat(moneyCards, actionCards),
    players:[
      {   
    name:'You', 
    playerHand: [],
    playerProperties: [],
    playerBank: 0
      },
    {   
    name:'Computer', 
    playerHand: [],
    playerProperties: [],
    playerBank: 0
      }
    ],
    currentPlayer:0,//index of curent player
    drawCount:0,
    selectedCard:null,

    isGameOver:false,
    winner:null,

    fullSet:false,
    fullHand:false,
    fullBank:false

};


// Game rules variables
export const winningSetSize = 3; 
export const winningValue = 20;

