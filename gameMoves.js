const gameMoves = [
    { 
        hint: "Click the red square! Quickly!", 
        succeedsWhen: (state, extraParams) => {
            return state.foo === "bar";
        }
    }
];

module.exports = gameMoves;