const Game = require("./game");

describe("Game", () => {

    it("throws when a callback handler is not provided", () => {
        expect(() => new Game()).toThrow();
    });
  
    it("constructs when provided a playerId and a callback handler", () => {
        const sut = new Game("1234", () => { });      
        expect(sut).not.toBeNull();
    });
  
    it("accepts collection of move IDs in the ctor", () => {
        const sut = new Game("1234", () => { }, [ 0 ]);      
        expect(sut.moves.length).toBe(1);
    });

});