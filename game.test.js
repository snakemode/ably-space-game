const Game = require("./game");

describe("Game", () => {

    it("throws when a callback handler is not provided", () => {
        expect(() => new Game()).toThrow();
    });
  
    it("constructs when provided a playerId and a callback handler", () => {
        const sut = new Game("1234", () => { });      
        expect(sut).not.toBeNull();
    });
  
    it("accepts collection of move IDs in the constructor", () => {
        const sut = new Game("1234", () => { }, [ 0 ]);      
        expect(sut.moves.length).toBe(1);
    });
  
    it("executes state-changed callback when the class constructs, starting the game", () => {
        let called = false;
      
        const sut = new Game("1234", () => {
          called = true;
        }, [ 0 ]);  
      
        expect(called).toBe(true);
    });

    it("generates ten random moves if none are provided", () => {
        const sut = new Game("1234", () => { });      
        expect(sut.moves.length).toBe(10);
    });
  
    it("generates an id on construction", () => {
        const sut = new Game("1234", () => { });      
        expect(sut.id).not.toBeNull();
    });
  
    it("generates a game expiry time in the future", () => {
        const sut = new Game("1234", () => { });      
        expect(sut.id).not.toBeNull();
    });
});