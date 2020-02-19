const gameMoveCreator = require("./gameMoveCreator");

describe("When called", () => {
  it("returns the number of moves requested", () => {
    const result = gameMoveCreator(1, [ 
      () => { return {}; } 
    ]);
    
    expect(result.length).toBe(1);
  });
  
  it("switches will be required to be alternately toggled", () => {
    const result = gameMoveCreator(4, [ 
      () => { return { isSwitch: true, elementId: "blah", target: true }; } 
    ]);
    
    expect(result[0].target).toBe(true);
    expect(result[1].target).toBe(false);
    expect(result[2].target).toBe(true);
    expect(result[3].target).toBe(false);
  });
});