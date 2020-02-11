const gameMoves = [
    { 
        hint: "Click the red square! Quickly!", 
        succeedsWhen: (element, state, extraParams) => {
            // return true from this if the user did the right thing
            console.log("In the handler for the click the red square quickly hint!");
            console.log(element);
            console.log(state);
            console.log(extraParams);
            return state.foo === "bar";
        }
    },    
    { 
        hint: "Click the yellow square! Quickly!", 
        succeedsWhen: (element, state, extraParams) => {
            console.log("In the handler for the click the yellow square quickly hint!");
            return state.foo === "bar";
        }
    },
    { 
        hint: "Click the green square! Quickly!", 
        succeedsWhen: (element, state, extraParams) => {
            console.log("In the handler for the click the green square quickly hint!");
            return state.foo === "bar";
        }
    },
];

module.exports = gameMoves;