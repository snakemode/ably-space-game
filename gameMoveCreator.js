const allMoves = require("./gameMoves");

function createMoves(numberOfMovesToGenerate) {
    const moves = [];
    const switches = [];
    
    for (let i = 0; i < numberOfMovesToGenerate; i++) {
        const randomMoveId = Math.floor((Math.random() * allMoves.length) + 0);
        const actualMove = allMoves[randomMoveId]();
      
        if (actualMove.isSwitch && actualMove.isSwitch === true) {
          
        }
      
        actualMove["id"] = randomMoveId;
        moves.push(actualMove);
    }
    return moves;
}

module.exports = createMoves;