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

class SelectFromFieldset {
  constructor(elementId, lowVal, highVal) {
    this._elementId = elementId;
    this._target = random(lowVal, highVal);
  }
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this._elementId}${this._target}\"`) !== -1; 
  }
  
  hint() { 
    return `Set ${this._elementId} to ${this._target}!`; 
  }
}

const random = (start, end) => Math.floor((Math.random() * end) + start);

const gameMoves = [
    new ClickThe("unobtainium"),    
    new ClickThe("dilithium"),  
    new ClickThe("hydrogen"),  
    new ClickThe("quantonium"),  
    new ClickThe("schwartz"),  
    new ClickThe("nuclear"),
    new SelectFromFieldset("warp", 1, 5)
];

module.exports = gameMoves;