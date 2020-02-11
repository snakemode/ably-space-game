const allMoves = require("gameMoves");

class Game {
    constructor(numberOfMovesToGenerate) {
        this.id = this.___uuidv4();
        this.moves = [
            1
        ];
    }

    handleMove(state, extraParams) {
        const nextMove = this.moves.peak();
        if (nextMove(state, extraParams) === true) {
            this.moves(pop);
        }

        if (this.moves.length === 0) {
            return { game: "complete", movesLeft: this.moves.length };
        }
        
        sendNextHint(this.moves.peak().hint);

        return { game: "in-progress", movesLeft: this.moves.length };        
    }

    sendNextHint(hintText) {
        // push over channel
    }

    ___uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.export = Game;