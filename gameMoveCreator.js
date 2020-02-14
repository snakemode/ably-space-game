const allMoves = require("./gameMoves");

function createMoves(numberOfMovesToGenerate, fromMoveSelection = allMoves) {
    let moves = [];
    const switchStates = {};

    for (let i = 0; i < numberOfMovesToGenerate; i++) {
        const randomMoveId = Math.floor((Math.random() * fromMoveSelection.length) + 0);
        const actualMove = fromMoveSelection[randomMoveId]();
      
        ensureSwitchesAreConsistent(actualMove, switchStates);        
      
        actualMove["id"] = randomMoveId;
        moves.push(actualMove);
    }
    
    // We're reversing our moves here so that the switchState tracking works.
    // This makes sure we never ask our players to turn an "off" switch to "off" or the inverse!
    // The array is being reversed because game pops the last element from the moves first like a stack
    // so our switch states have to be checked in order prior to this.

    moves = moves.reverse();
    return moves;
}

function ensureSwitchesAreConsistent(actualMove, switchStates) {
  if (!actualMove.isSwitch) return;
  if (actualMove.isSwitch !== true) return;  
    
  if (!switchStates.hasOwnProperty(actualMove.ElementId)) {
    actualMove.Target = true;
    switchStates[actualMove.ElementId] = true;    
  } else {    
    actualMove.Target = !switchStates[actualMove.ElementId];
    switchStates[actualMove.ElementId] = actualMove.Target;    
  }  
}

module.exports = createMoves;