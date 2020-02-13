const allMoves = require("./gameMoves");

function createMoves(numberOfMovesToGenerate) {
    const moves = [];
    for (let i = 0; i < numberOfMovesToGenerate; i++) {
        const randomMoveId = Math.floor((Math.random() * allMoves.length) + 0);
        const actualMove = allMoves[randomMoveId]();
        actualMove["id"] = randomMoveId;
        moves.push(actualMove);
    }
    return moves;
}

module.exports = createMoves;