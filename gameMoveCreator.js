const allMoves = require("./gameMoves");

function createMoves(numberOfMovesToGenerate) {
    const moves = [];
    const switchStates = {};

    for (let i = 0; i < numberOfMovesToGenerate; i++) {
        const randomMoveId = Math.floor((Math.random() * allMoves.length) + 0);
        const actualMove = allMoves[randomMoveId]();
      
        ensureSwitchesAreConsistent(actualMove, switchStates);        
      
        actualMove["id"] = randomMoveId;
        moves.push(actualMove);
    }
    return moves;
}


function ensureSwitchesAreConsistent(actualMove, switchStates) {
  if (!actualMove.isSwitch) return;
  if (actualMove.isSwitch !== true) return;  
    
  if (actualMove.Target == false && !switchStates.hasOwnProperty(actualMove.ElementId)) {    
    actualMove.Target = true;
    switchStates[actualMove.ElementId] = true;    
  } else {    
    actualMove.Target = !switchStates[actualMove.ElementId];
    switchStates[actualMove.ElementId] = actualMove.Target;    
  }  
}

module.exports = createMoves;