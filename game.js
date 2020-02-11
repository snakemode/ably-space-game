const allMoves = require("./gameMoves");

class Game {
    constructor(numberOfMovesToGenerate, onGameStateChanged = this.sendNextHint) {
        this.id = this.__uuidv4();
        this.moves = [ 0, 1, 2 ]; // Randomly pick a selection of move ids at the start of each game
        this.onGameStateChanged = onGameStateChanged;
        this.onGameStateChanged(this.gameStatus());
    }

    handleMove(element, state, extraParams) {
        element = element || "";
        state = state || {};
        extraParams = extraParams || {};

        let activeMoveId = this.activeMoveId();
        let currentMove = this.getMove(activeMoveId);        
        const moveResult =  currentMove.succeedsWhen(element, state, extraParams);

        if (moveResult !== true) {
            return this.gameStatus();
        }
        
        this.markCurrentMoveAsCompleted();

        if (this.gameIsFinished()) {
            return this.gameStatus();
        }

        activeMoveId = this.activeMoveId();
        currentMove = this.getMove(activeMoveId);

        this.onGameStateChanged(this.gameStatus());

        return this.gameStatus();       
    }

    sendNextHint(gameState) {
        console.log("We should be sending a hint here.");
    }

    gameStatus() {      
        return { 
            id: this.id, 
            status: this.moves.length > 0 ? "active" : "complete", 
            movesLeft: this.moves.length, 
            hint: this.moves.length > 0 ? this.getMove(this.activeMoveId()).hint : "" 
        };
    }

    gameIsFinished() { return this.moves.length === 0; }
    markCurrentMoveAsCompleted() { this.moves.pop(); }
    activeMoveId() { return this.moves[this.moves.length-1]; }
    getMove(moveId) { return allMoves[moveId]; }

    __uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }    
}

module.exports = Game;