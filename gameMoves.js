class ClickThe {
  constructor(elementId, hintText) { 
    this._elementId = elementId; 
    this.hintText = hintText || "Click the " + this._elementId + "!";
  } 
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this._elementId}\"`) !== -1; 
  }
  
  hint() { 
    return this.hintText;
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

class SetSwitch {
  constructor(elementId) { 
    this._elementId = elementId;
    this._target = random(0, 2) === 0 ? false : true;
  }
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this._elementId}\"`) !== -1 && extraParams.enabled == this._target; 
  }
  
  hint() { 
    return `Flip ${this._elementId} switch to ${this._target}!`; 
  }
}

const random = (start, end) => Math.floor((Math.random() * end) + start);

const gameMoves = [
    () => new ClickThe("unobtainium"),    
    () => new ClickThe("dilithium"),  
    () => new ClickThe("hydrogen"),  
    () => new ClickThe("nuclear"),
    () => new ClickThe("redalertknob"),
    () => new ClickThe("amberalertknob"),
    () => new ClickThe("podknob", "Click the pod knob you !"),
    () => new SelectFromFieldset("warp", 1, 5),
    () => new SetSwitch("shields"),
    () => new SetSwitch("gravity"),
    () => new SetSwitch("wifi"),
];

module.exports = gameMoves;