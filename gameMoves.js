class ClickThe {
  constructor(elementId) {
    this._elementId = elementId;
  }
  
  succeedsWhen(element, state, extraParams) {
      return element.indexOf(`id=\"${this._elementId}\"`) !== -1;
  }
  
  hint() {
    return "Click the " + this._elementId + "!";
  }
}



const gameMoves = [
    new ClickThe("unobtainium"),    
    new ClickThe("dilithium"),  
    new ClickThe("hydrogen"),  
    new ClickThe("quantonium"),  
    new ClickThe("schwartz"),  
    new ClickThe("nuclear"),  
    /*{ 
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
    },*/
];

module.exports = gameMoves;