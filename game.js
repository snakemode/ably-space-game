const allMoves = require("./gameMoves");

class Game {
    constructor(numberOfMovesToGenerate) {
        this.id = this.___uuidv4();
        this.moves = [
            0
        ]; // Randomly pick a selection of move ids at the start of each game
    }

    handleMove(state, extraParams) {

        let activeMoveId = this.activeMoveId();
        let currentMove = this.getMove(activeMoveId);        
        const moveResult =  currentMove.succeedsWhen(state, extraParams);

        if (moveResult !== true) {
            console.log("Move failed.");
            return { game: "in-progress", movesLeft: this.moves.length, hint: currentMove.hintText }; 
        }

        if (this.gameIsFinished()) {
            console.log("Game completed!");
            return { game: "complete", movesLeft: this.moves.length, hint: ""  };
        }        
        
        console.log("Move was a success!");
        this.markCurrentMoveAsCompleted();

        activeMoveId = this.activeMoveId();
        currentMove = this.getMove(activeMoveId);
        this.sendNextHint(currentMove.hint);

        return { game: "in-progress", movesLeft: this.moves.length, hint: currentMove.hintText };        
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