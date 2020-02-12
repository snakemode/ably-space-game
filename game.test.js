const Game = require("./game");

describe("Game", () => {

    it("throws when a callback handler is not provided", () => {
        expect(() => new Game()).toThrow();
    });
  
    it("constructs when provided a playerId and a callback handler", () => {
        const sut = new Game("1234", () => { });      
        expect(sut).not.toBeNull();
    });
  
    it("accepts collection of moves in the ctor", () => {
        const sut = new Game("1234", () => { }, [
          {
              succeedsWhen(element, state, extraParams) { 
                return element.indexOf(`id=\"${this._elementId}\"`) !== -1; 
              }

              hint() { 
                return "Click the " + this._elementId + "!"; 
              }
          }
        ]);      
        expect(sut).not.toBeNull();
    });

});