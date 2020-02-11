const gameMoves = [
    { 
        hint: () => "Click the unobtaininum!",
        succeedsWhen: (element, state, extraParams) => {
            return element.indexOf("id=\"unobtainium\"") !== -1;
        }
    },    
    { 
        hint: () => "Click the yellow square! Quickly!", 
        succeedsWhen: (element, state, extraParams) => {
            console.log("In the handler for the click the yellow square quickly hint!");
            return state.isYellow === true;
        }
    },
    { 
        hint: () => "Click the green square! Quickly!", 
        succeedsWhen: (element, state, extraParams) => {
            return element.indexOf("background-color: green") !== -1;
        }
    },
];

module.exports = gameMoves;