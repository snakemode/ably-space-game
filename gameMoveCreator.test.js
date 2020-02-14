const gameMoveCreator = require("./gameMoveCreator");

describe("When called", () => {
  it("returns the number of moves requested", () => {
    const result = gameMoveCreator(1, [ 
      () => { return {}; } 
    ]);
    
    expect(result.length).toBe(1);
  });
  
  it("won't return a requirement to set a switch in an invalid state.", () => {
    const result = gameMoveCreator(1, [ 
      () => { return { isSwitch: true, elementId: "blah", target: true }; } 
    ]);
    
    expect(result[0].target).toBe(false);
  });
});