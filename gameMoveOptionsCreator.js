function createMoveOptions(clickables) {
  const moveOptions = [];
  
  for (let metadata of clickables) {
    moveOptions.push(toMatcher(metadata));
  }
  
  return moveOptions;
}

function toMatcher(metadata) {
  if (metadata.type === "checkbox") {
    return () => new CheckboxMatcher(metadata.id, true);   
  } 
  
  if (metadata.type === "range") {
    return () => new RangeMatcher(metadata.id, metadata.min, metadata.max);
  }

  return () => new ElementMatcher(metadata.id);
}

class ElementMatcher {
  constructor(id) {
    this.id = id;
  }
  
  succeedsWhen(element, state, extraParams) {
    return element.indexOf(`id=\"${this.id}\"`) !== -1;
  }
  
  hint() {
    return "Click the " + this.id + "!";
  }
}

class CheckboxMatcher {
  constructor(id, targetState) {
    this.id = id;
    this.target = targetState;
    this.isSwitch = true;
  }
    
  succeedsWhen(element, state, extraParams) {
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target;
  }
  
  hint() {
    return `Flip the ${this.id} switch to ${this.target}!`
  }
}

class RangeMatcher {
  constructor(id, lowVal, highVal) {
    this.id = id;
    this.target = Math.floor((Math.random() * highVal) + lowVal);
  }
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target; 
  }
  
  hint() { 
    return `Set ${this.id} to ${this.target}!`; 
  }
}

module.exports = createMoveOptions;