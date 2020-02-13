const Game = require("./game");

describe("When a game is constructed it", () => {
  
    it("requires a playerId and a callback handler", () => {
        const sut = new Game("1234");      
        expect(sut).not.toBeNull();
    });
  
    it("accepts collection of (optional) moves", () => {
        const sut = new Game("1234", () => { }, [
            { hint: () => "A hint" }
         ]);      
        expect(sut.moves.length).toBe(1);
    });
  
    it("executes state-changed callback, starting the game", () => {
        let called = false;
      
        const sut = new Game("1234", () => {
          called = true;
        });  
      
        expect(called).toBe(true);
    });

    it("generates ten random moves if none are provided", () => {
        const sut = new Game("1234");      
        expect(sut.moves.length).toBe(10);
    });
  
    it("generates an id", () => {
        const sut = new Game("1234");      
        expect(sut.id).not.toBeNull();
    });
  
    it("generates a game expiry time in the future", () => {
        const sut = new Game("1234");      
        expect(sut.expires > Date.now()).toBe(true);
    });
});


describe("When handling a move", () => {
    it("it returns a lastMoveSuccessful flag as true when move passes", () => {
        const sut = gameWithMoveThatPasses();
        const result = sut.handleMove({}, {}, {});
        expect(result.lastMoveSuccessful).toBe(true);
    });

    it("it returns a lastMoveSuccessful flag as false when move fails", () => {
        const sut = gameWithMoveThatFails();
        const result = sut.handleMove({}, {}, {});
        expect(result.lastMoveSuccessful).toBe(false);
    });

    it("invokes callback on successful move", () => {
        let called = false;
        const sut = gameWithMoveThatPasses(() => called = true);
        called = false; // Ctor calls the first time

        sut.handleMove({}, {}, {});

        expect(called).toBe(true);
    });

    it("invokes callback on failed move", () => {
        let called = false;
        const sut = gameWithMoveThatFails(() => called = true);
        called = false; // Ctor calls the first time

        sut.handleMove({}, {}, {});

        expect(called).toBe(true);
    });

    it("invokes callback on expired game move attempt", () => {
        let called = false;
        const sut = new Game("1234", () => called = true, [
            { hint: () => "A hint" }
        ], -100 /* number of minutes to run game for */);
        called = false; // Ctor calls the first time

        sut.handleMove({}, {}, {});

        expect(called).toBe(true);
    });

    it("gameState set to complete when move causes game to end", () => {
        const sut = gameWithMoveThatPasses();
        const result = sut.handleMove({}, {}, {});
        expect(result.gameState).toBe("complete");
    });

    it("gameState set to active when moves remain", () => {
        const sut = gameWithNMoves(10);
        const result = sut.handleMove({}, {}, {});
        expect(result.gameState).toBe("active");
    });

    it("returns a complete status when there are no moves available", () => {
        const sut = gameWithNMoves(0);
        const result = sut.handleMove({}, {}, {});
        expect(result.gameState).toBe("complete");
    });
    
    it("lastMoveSuccessful is false when no moves available", () => {
        const sut = gameWithNMoves(0);
        const result = sut.handleMove({}, {}, {});
        expect(result.lastMoveSuccessful).toBe(false);
    });

    it("returns a failed status when game time has expired", () => {
        const sut = new Game("1234", null, [
            { hint: () => "A hint" }
        ], 0 /* number of minutes to run game for */);

        const result = sut.handleMove({}, {}, {});

        expect(result.gameState).toBe("failed");
        expect(result.lastMoveSuccessful).toBe(false);
    });
});


const gameWithMoveThatPasses = (cb)  => gameWithMoveThatReturns(true, cb);
const gameWithMoveThatFails = (cb) => gameWithMoveThatReturns(false, cb);
const gameWithMoveThatReturns = (bool, cb) => {
    const blankCallback = () => {};
    return new Game("1234", cb || blankCallback, [
        { succeedsWhen: () => bool, hint: () => "A hint" }
    ]);
} 
const gameWithNMoves = (numberOfMoves) => {
    const moves = [];
    for(let i = 0; i < numberOfMoves; i++) {
        moves.push({ succeedsWhen: () => true, hint: () => "A hint" })
    }
    return new Game("1234", () => {}, moves);
} 