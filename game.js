const createMoves = require("./gameMoveCreator");
const nullCallback = () => {};

class Game {
    constructor(playerId, onGameStateChanged, moves, numberOfMinutesPerGame = 1) {
        this.id = this.__uuidv4();
        this.playerId = playerId;
        this.moves = moves || createMoves(10);
        this.expires = new Date(Date.now() + ((1000 * 60) * numberOfMinutesPerGame));
        
        this.onGameStateChanged = onGameStateChanged || nullCallback;
        this.onGameStateChanged(this.status());
    }

    handleMove(element, state, extraParams) {
        let currentMove = this.activeMove();
        if (!currentMove || this.gameTimeExpired()) {            
            this.onGameStateChanged(false);
            return this.status(false);
        }
        
        const moveResult = currentMove.succeedsWhen(element, state, extraParams);
        
        if (moveResult === true) {
            this.markCurrentMoveAsCompleted();
        }
        
        const status = this.status(moveResult);
        this.onGameStateChanged(status);
        return status; 
    }

    status(lastMoveResultSuccess = true) {  
        let gameState = "active";
        if (this.moves.length <= 0) {
            gameState = "complete";
        } else if (this.gameTimeExpired()) {
            gameState = "failed";
        }
        
        return { 
            id: this.id, 
            gameState: gameState, 
            remainingTasks: this.moves.length, 
            hint: this.moves.length > 0 ? this.activeMove().hint() : "",
            lastMoveSuccessful: lastMoveResultSuccess,
            playerId: this.playerId,
            gameEnds: this.expires
        }
    }

    gameTimeExpired() { return Date.now() >= this.expires; }
    markCurrentMoveAsCompleted() { this.moves.pop(); }
    activeMove() { return this.moves[this.moves.length-1]; }

    __uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = Game;