function createMoves(numberOfMovesToGenerate, fromMoveSelection) {
    let moves = [];
    const switchStates = {};

    let lastMoveId = -1;
    for (let i = 0; i < numberOfMovesToGenerate; i++) {
        
        let randomMoveId = randomMoveThatIsntTheSameAsTheLast(lastMoveId, fromMoveSelection.length);              
        const actualMove = fromMoveSelection[randomMoveId]();

        ensureSwitchesAreConsistent(actualMove, switchStates);
        forceWifiMovesToAlwaysTargetOn(actualMove);
      
        moves.push(actualMove);
        lastMoveId = randomMoveId;
    }
    
    return moves;
}

function randomMoveThatIsntTheSameAsTheLast(lastMoveId, totalSelectionCount) { 
  let attempt = Math.floor((Math.random() * totalSelectionCount) + 0);
  if (totalSelectionCount > 1 && lastMoveId === attempt) {
    attempt = attempt + 1;
    if(attempt >= totalSelectionCount) {
      attempt = 0;
    }
  }
  
  return attempt;
}

function ensureSwitchesAreConsistent(actualMove, switchStates) {
  if (!isSwitch(actualMove)) return; 
    
  if (!switchStates.hasOwnProperty(actualMove.elementId)) {
    switchStates[actualMove.elementId] = actualMove.target;    
  } else {    
    actualMove.target = !switchStates[actualMove.elementId];
    switchStates[actualMove.elementId] = actualMove.target;    
  }  
}


function forceWifiMovesToAlwaysTargetOn(actualMove) {
  if (!isSwitch(actualMove)) return;
  if (actualMove.id !== "wifi") return;
  
  actualMove.target = true;
}

function isSwitch(actualMove) {
  if (!actualMove) return false;
  if (!actualMove.isSwitch) return false;
  if (actualMove.isSwitch !== true)  return false;
  return true;
}

module.exports = createMoves;