const allMoves = require("./gameMoves");

class Game {
    constructor(numberOfMovesToGenerate) {
        this.id = this.___uuidv4();
        this.moves = [
            0
        ]; // Randomly pick a selection of move ids at the start of each game
    }

    handleMove(element, state, extraParams) {
        element = element || "";
        state = state || {};
        extraParams = extraParams || {};

        let activeMoveId = this.activeMoveId();
        let currentMove = this.getMove(activeMoveId);        
        const moveResult =  currentMove.succeedsWhen(element, state, extraParams);

        if (moveResult !== true) {
            return { game: "in-progress", movesLeft: this.moves.length, hint: currentMove.hint }; 
        }

        if (this.gameIsFinished()) {
            return { game: "complete", movesLeft: this.moves.length, hint: ""  };
        }        
        
        this.markCurrentMoveAsCompleted();
        activeMoveId = this.activeMoveId();
        currentMove = this.getMove(activeMoveId);

        this.sendNextHint(currentMove.hint);

        return { game: "in-progress", movesLeft: this.moves.length, hint: currentMove.hint };        
    }

    sendNextHint(hintText) {
        // push over channel to send text message
    }

    gameIsFinished() { return this.moves.length === 0; }
    markCurrentMoveAsCompleted() { this.moves(pop); }
    activeMoveId() { return this.moves[this.moves.length-1]; }
    getMove(moveId) { return allMoves[moveId]; }

    ___uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = Game;