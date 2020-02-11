const allMoves = require("./gameMoves");

class Game {
    constructor(numberOfMovesToGenerate) {
        this.id = this.___uuidv4();
        this.moves = [
            0
        ]; // Randomly pick a selection of move ids
    }

    handleMove(state, extraParams) {
        const nextMoveId = this.moves[this.moves.length-1];

        const matcher = allMoves[nextMoveId].succeedsWhen;
        const moveResult = matcher(state, extraParams);
        console.log(moveResult);
        
        if (moveResult === true) {
            this.moves(pop);
        }

        if (this.moves.length === 0) {
            return { game: "complete", movesLeft: this.moves.length };
        }
        
        const activeMove = this.moves[this.moves.length-1];
        this.sendNextHint(activeMove.hint);

        return { game: "in-progress", movesLeft: this.moves.length, hint: activeMove.hintText };        
    }

    sendNextHint(hintText) {
        // push over channel to send text message
    }

    ___uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = Game;