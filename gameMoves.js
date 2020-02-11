const gameMoves = [
    { 
        hint: "Click the red square! Quickly!", 
        succeedsWhen: (element, state, extraParams) => {
            // return true from this if the user did the right thing
            console.log(element);
            console.log(state);
            console.log(extraParams);
            return state.foo === "bar";
        }
    }
];

module.exports = gameMoves;