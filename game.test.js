const Game = require("./game");

describe("When a game is constructed it", () => {
    it("throws when a callback handler is not provided", () => {
        expect(() => new Game()).toThrow();
    });
  
    it("requires a playerId and a callback handler", () => {
        const sut = new Game("1234", () => { });      
        expect(sut).not.toBeNull();
    });
  
    it("accepts collection of (optional) move IDs", () => {
        const sut = new Game("1234", () => { }, [ 0 ]);      
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
        const sut = new Game("1234", () => { });      
        expect(sut.moves.length).toBe(10);
    });
  
    it("generates an id", () => {
        const sut = new Game("1234", () => { });      
        expect(sut.id).not.toBeNull();
    });
  
    it("generates a game expiry time in the future", () => {
        const sut = new Game("1234", () => { });      
        expect(sut.expires > Date.now()).toBe(true);
    });
});