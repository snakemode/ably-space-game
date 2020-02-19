const gameMoveCreator = require("./gameMoveCreator");

describe("When called", () => {
  it("returns the number of moves requested", () => {
    const result = gameMoveCreator(1, [ 
      () => { return {}; } 
    ]);
    
    expect(result.length).toBe(1);
  });
  
  it("won't return a requirement to set a switch to off if it hasn't already been requested to be turned on.", () => {
    const result = gameMoveCreator(1, [ 
      () => { return { isSwitch: true, elementId: "blah", target: true }; } 
    ]);
    
    expect(result[0].target).toBe(true);
  });
  
  
  it("switches will be required to be alternately toggled, last element first", () => {
    const result = gameMoveCreator(4, [ 
      () => { return { isSwitch: true, elementId: "blah", target: false }; } 
    ]);
    
    expect(result[0].target).toBe(false);
    expect(result[1].target).toBe(true);
    expect(result[2].target).toBe(false);
    expect(result[3].target).toBe(true);
  });
});