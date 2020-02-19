function createMoves(numberOfMovesToGenerate, fromMoveSelection) {
    let moves = [];
    const switchStates = {};

    for (let i = 0; i < numberOfMovesToGenerate; i++) {
        const randomMoveId = Math.floor((Math.random() * fromMoveSelection.length) + 0);
        const actualMove = fromMoveSelection[randomMoveId]();

        ensureSwitchesAreConsistent(actualMove, switchStates);        
        moves.push(actualMove);
    }
    
    return moves;
}

function ensureSwitchesAreConsistent(actualMove, switchStates) {
  if (!actualMove) return;
  if (!actualMove.isSwitch) return;
  if (actualMove.isSwitch !== true) return;  
    
  if (!switchStates.hasOwnProperty(actualMove.elementId)) {
    actualMove.target = true;
    switchStates[actualMove.elementId] = true;    
  } else {    
    actualMove.target = !switchStates[actualMove.elementId];
    switchStates[actualMove.elementId] = actualMove.target;    
  }  
}

module.exports = createMoves;