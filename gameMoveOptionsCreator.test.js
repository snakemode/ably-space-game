const sut = require("./gameMoveOptionsCreator");

describe("When called for a regular clickable", () => {
    it("generates an element matcher for the ID in the metadata", () => {
        const clickables =  [{ id: "some-id"}];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.id).toBe("some-id");
    });

    it("matcher returns correct hint", () => {
        const clickables =  [{ id: "some-id"}];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.hint()).toBe("Click the some-id!");
    });
    
    it("client can overload hint", () => {
        const clickables =  [{ id: "some-id", hint: "some hint here" }];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.hint()).toBe("some hint here");
    });

    it("returned matcher matches element with provided ID", () => {
        const clickables =  [{ id: "some-id"}];
    
        const matcher = sut(clickables)[0]();

        expect(matcher.succeedsWhen("id=\"some-id\"", {}, {})).toEqual(true);
        expect(matcher.succeedsWhen("id=\"some-other-id\"", {}, {})).toEqual(false);
    });  
});

describe("When called for a checkbox clickable", () => {
    it("generates an element matcher for the ID in the metadata", () => {
        const clickables =  [{ id: "some-id", type: "checkbox" }];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.id).toBe("some-id");
    });

    it("matcher returns correct hint (true by default)", () => {
        const clickables =  [{ id: "some-id", type: "checkbox" }];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.hint()).toBe("Flip the some-id switch to true!");
    });
  
    it("client can overload hint", () => {
        const clickables =  [{ id: "some-id", type: "checkbox", hint: "some hint here" }];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.hint()).toBe("some hint here");
    });

    it("client can overload hint, and it's respected after the value is changed", () => {
        const clickables =  [{ id: "some-id", type: "checkbox", hint: "${target}" }];
    
        const matcher = sut(clickables)[0]();
        matcher.target = false;
        
        expect(matcher.hint()).toBe("false");
    });

    it("returned matcher matches element with provided ID and value", () => {
        const clickables =  [{ id: "some-id", type: "checkbox" }];
    
        const matcher = sut(clickables)[0]();

        expect(matcher.succeedsWhen("id=\"some-id\"", { value: true }, {})).toEqual(true);
    });  
});

describe("When called for a range clickable", () => {
    it("generates an element matcher for the ID in the metadata", () => {
        const clickables =  [{ id: "some-id", type: "range" }];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.id).toBe("some-id");
    });

    it("matcher returns correct hint", () => {
        const clickables =  [
            {
                id: "some-id",
                type: "range",
                min: 1,
                max: 1
            }
        ];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.hint()).toBe("Set some-id to 1!");
    });
  
    it("client can overload hint", () => {
        const clickables =  [{ id: "some-id", type: "range", min: 1, max: 1, hint: "some hint here" }];
    
        const matcher = sut(clickables)[0]();
        
        expect(matcher.hint()).toBe("some hint here");
    });

    it("returned matcher matches element with provided ID and expected generated value", () => {
        const clickables =  [
            {
                id: "some-id",
                type: "range",
                min: 1,
                max: 1
            }
        ];

        const matcher = sut(clickables)[0]();

        expect(matcher.succeedsWhen("id=\"some-id\"", { value: 1 }, {})).toEqual(true);
    });

});