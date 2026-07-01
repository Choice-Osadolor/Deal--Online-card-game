
/////////////////////////////////////// Cards //////////////////////////////////////////////////
/////////////////////////////////////// Cards //////////////////////////////////////////////////
export const properties = [
  // Brown
  // { name: "Old Kent Road", color: "#836647", setSize: 2, value: 1, id: 1 },
  { name: "Old Kent Road", color: "brown", setSize: 2, value: 1, id: 1 ,rent:[1,2]},
  { name: "Whitechapel Road", color: "brown", setSize: 2, value: 1, id: 2 ,rent:[1,2]},

  // Light Blue
  { name: "The Angel Islington", color: "lightBlue", setSize: 3, value: 1, id: 3 ,rent:[1,2,3]},
  { name: "Euston Road", color: "lightBlue", setSize: 3, value: 1, id: 4, rent:[1,2,3]},
  { name: "Pentonville Road", color: "lightBlue", setSize: 3, value: 1, id: 5 , rent:[1,2,3]},

  // Pink
  { name: "Pall Mall", color: "#FFCAD4", setSize: 3, value: 2, id: 6 , rent:[1,2,4]},
  { name: "Whitehall", color: "#FFCAD4", setSize: 3, value: 2, id: 7 , rent:[1,2,4]},
  { name: "Northumberland Avenue", color: "#FFCAD4", setSize: 3, value: 2, id: 8 , rent:[1,2,4]},

  // Orange
  { name: "Bow Street", color: "#EE964B", setSize: 3, value: 2, id: 9 , rent:[1,3,5] },
  { name: "Marlborough Street", color: "#EE964B", setSize: 3, value: 2, id: 10 , rent:[1,3,5]},
  { name: "Vine Street", color: "#EE964B", setSize: 3, value: 2, id: 11 , rent:[1,3,5]},

  // Red
  { name: "Strand", color: "red", setSize: 3, value: 3, id: 12 , rent:[2,3,6]},
  { name: "Fleet Street", color: "red", setSize: 3, value: 3, id: 13 , rent:[2,3,6]},
  { name: "Trafalgar Square", color: "red", setSize: 3, value: 3, id: 14 , rent:[2,3,6]},

  // Yellow
  { name: "Leicester Square", color: "yellow", setSize: 3, value: 3, id: 15 , rent:[2,4,6]},
  { name: "Coventry Street", color: "yellow", setSize: 3, value: 3, id: 16 , rent:[2,4,6]},
  { name: "Piccadilly", color: "yellow", setSize: 3, value: 3, id: 17 , rent:[2,4,6]},

  // Green
  { name: "Regent Street", color: "green", setSize: 3, value: 4, id: 18 , rent:[2,4,7]},
  { name: "Oxford Street", color: "green", setSize: 3, value: 4, id: 19 , rent:[2,4,7]},
  { name: "Bond Street", color: "green", setSize: 3, value: 4, id: 20 , rent:[2,4,7]},

  // Dark Blue
  { name: "Park Lane", color: "#0D3B66", setSize: 2, value: 4, id: 21 , rent:[3,8]},
  { name: "Mayfair", color: "#0D3B66", setSize: 2, value: 4, id: 22 , rent:[3,8]},

  // Railroads
  { name: "Railroad", color: "#36454F", setSize: 4, value: 2, id: 23  , rent:[1,2,3,4]},
  { name: "Railroad", color: "#36454F", setSize: 4, value: 2, id: 230  , rent:[1,2,3,4]},
  { name: "Railroad", color: "#36454F", setSize: 4, value: 2, id: 231  , rent:[1,2,3,4]},
  { name: "Railroad", color: "#36454F", setSize: 4, value: 2, id: 234  , rent:[1,2,3,4]},

  // Utilities
  { name: "Utility", color: "#D8E2DC", setSize: 2, value: 2, id: 24, rent:[1,2] },
  { name: "Utility", color: "#D8E2DC", setSize: 2, value: 2, id: 240, rent:[1,2] },

  
  // Wildcards
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 'w', id: 25 , color:'#CDA4F8'},
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 'w', id: 26 , color:'#CDA4F8'},
  // { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 'w', id: 27 , color:'#CDA4F8'},
  // { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 'w', id: 28 , color:'#CDA4F8'},
  // { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 'w', id: 29 , color:'#CDA4F8'}, 
   { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 0, id: 25 },
  { name: "Wildcard Any", color: "any", type: "wildcard", setSize: null, value: 'w', id: 30 }
].map(card => ({
    ...card,
    category: "property",
}));;

export const moneyCards = [
  { value: 1, type: 'money', id: 31 },
  { value: 1, type: 'money', id: 31 },
  { value: 1, type: 'money', id: 31 },
  { value: 1, type: 'money', id: 31 },
  { value: 1, type: 'money', id: 31 },
  { value: 1, type: 'money', id: 31 },

  { value: 2, type: 'money', id: 32 },
  { value: 2, type: 'money', id: 32 },
  { value: 2, type: 'money', id: 32 },
  { value: 2, type: 'money', id: 32 },
  { value: 2, type: 'money', id: 32 },

  { value: 3, type: 'money', id: 33 },
  { value: 3, type: 'money', id: 33 },
  { value: 3, type: 'money', id: 33 },

  { value: 4, type: 'money', id: 34 },
  { value: 4, type: 'money', id: 34 },
  { value: 4, type: 'money', id: 34 },

  { value: 5, type: 'money', id: 35 },
  { value: 5, type: 'money', id: 35 },

  { value: 10, type: 'money', id: 36 }
];

export const actionCards = [
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 37 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 370 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 371 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 372 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 37 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 370 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 371 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 372 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 37 , color:'#7841B1'},
  { name: "Pass Go", category: "action", type: "draw", value: 1, id: 370 , color:'#7841B1'},
  { name: "Debt Collector", category: "action", type: "charge", value: 3, id: 38 , color:'#7841B1'},
  { name: "Debt Collector", category: "action", type: "charge", value: 3, id: 380 , color:'#7841B1'},
  { name: "Debt Collector", category: "action", type: "charge", value: 3, id: 381 , color:'#7841B1'},
  { name: "It's My Birthday", category: "action", type: "chargeAll", value: 2, id: 39 , color:'#7841B1'},
  { name: "It's My Birthday", category: "action", type: "chargeAll", value: 2, id: 390 , color:'#7841B1'},

  { name: "Rent (Wild)", category: "action", type: "rent", value: 3, id: 40 , color:'#7841B1'},
  { name: "Rent Green/Blue", color1:'green', color2:'#0D3B66', category: "action", type: "rent", value: 1, id: 41 , color:'#7841B1'},
  { name: "Rent Brown/LightBlue", color1:'Brown', color2:'lightBlue', category: "action", type: "rent", value: 1, id: 42 , color:'#7841B1'},
  { name: "Rent Pink/Orange", color1:'#FFCAD4',color2:'#EE964B', category: "action", type: "rent", value: 1, id: 43 , color:'#7841B1'},
  { name: "Rent Red/Yellow", color1:'red', color2:'yellow', category: "action", type: "rent", value: 1, id: 44 , color:'#7841B1'},
  { name: "Rent Railroad/Utility", color1:'#36454F', color2:'#D8E2DC', category: "action", type: "rent", value: 1, id: 45 , color:'#7841B1'},
  { name: "Rent (Wild)", category: "action", type: "rent", value: 3, id: 40 , color:'#7841B1'},
  { name: "Rent Green/Blue", color1:'green', color2:'#0D3B66', category: "action", type: "rent", value: 1, id: 41 , color:'#7841B1'},
  { name: "Rent Brown/LightBlue", color1:'Brown', color2:'lightBlue', category: "action", type: "rent", value: 1, id: 42 , color:'#7841B1'},
  { name: "Rent Pink/Orange", color1:'#FFCAD4',color2:'#EE964B', category: "action", type: "rent", value: 1, id: 43 , color:'#7841B1'},
  { name: "Rent Red/Yellow", color1:'red', color2:'yellow', category: "action", type: "rent", value: 1, id: 44 , color:'#7841B1'},
  { name: "Rent Railroad/Utility", color1:'#36454F', color2:'#D8E2DC', category: "action", type: "rent", value: 1, id: 45 , color:'#7841B1'},

  { name: "House", category: "action", type: "upgrade", value: 3, id: 46 , color:'#7841B1'},
  { name: "House", category: "action", type: "upgrade", value: 3, id: 461 , color:'#7841B1'},
  { name: "House", category: "action", type: "upgrade", value: 3, id: 462 , color:'#7841B1'},
  { name: "Hotel", category: "action", type: "upgrade", value: 4, id: 470 , color:'#7841B1'},
  { name: "Hotel", category: "action", type: "upgrade", value: 4, id: 471 , color:'#7841B1'},
  { name: "Hotel", category: "action", type: "upgrade", value: 4, id: 472 , color:'#7841B1'},
  { name: "Forced Deal", category: "action", type: "swap", value: 3, id: 48 , color:'#7841B1'},
  { name: "Forced Deal", category: "action", type: "swap", value: 3, id: 480 , color:'#7841B1'},
  { name: "Forced Deal", category: "action", type: "swap", value: 3, id: 481 , color:'#7841B1'},
  { name: "Forced Deal", category: "action", type: "swap", value: 3, id: 482 , color:'#7841B1'},
  { name: "Sly Deal", category: "action", type: "steal", value: 3, id: 49 , color:'#7841B1'},
  { name: "Sly Deal", category: "action", type: "steal", value: 3, id: 490 , color:'#7841B1'},
  { name: "Sly Deal", category: "action", type: "steal", value: 3, id: 491 , color:'#7841B1'},
  { name: "Deal Breaker", category: "action", type: "stealSet", value: 5, id: 50 , color:'#7841B1'},
  { name: "Just Say No", category: "action", type: "block", value: 4, id: 51 , color:'#7841B1'},
  { name: "Just Say No", category: "action", type: "block", value: 4, id: 510 , color:'#7841B1'},
  { name: "Just Say No", category: "action", type: "block", value: 4, id: 511 , color:'#7841B1'},
  { name: "Double The Rent", category: "action", type: "modifier", value: 1, id: 52 , color:'#7841B1'},
  { name: "Double The Rent", category: "action", type: "modifier", value: 1, id: 520 , color:'#7841B1'}
].map(card => ({
    ...card,
    description: ""
}));;;

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
    playerBank: 0,

    fullSets:0,
    fullHand:false
      },
    {   
    name:'Computer', 
    playerHand: [],
    playerProperties: [],
    playerBank: 0,
    fullSets:0,
    fullHand:false
      }
    ],
    currentPlayer:0,//index of curent player
    cardsPlayed:0,
    selectedCard:null,
    targetedCard:null,
    targetedSet:null,
    discardPile:[],
    currentAction:null,
    // pendingAction/currentAction

    isGameOver:false,
    winner:null,

  // TargetSet
  // target Player
    // fullSet:false,
    // fullHand:false,
    // fullBank:false

};


// Game rules variables
export const winningSetSize = 3; 
export const winningValue = 20;

