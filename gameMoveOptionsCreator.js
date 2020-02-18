function createMoveOptions(clickables) {
  const moveOptions = [];
  
  for (let metadata of clickables) {
    moveOptions.push(toMatcher(metadata));
  }
  
  return moveOptions;
}

function toMatcher(metadata) {
  if (metadata.type === "checkbox") {
    return () => new CheckboxMatcher(metadata.id, true, metadata.hint);   
  } 
  
  if (metadata.type === "range") {
    return () => new RangeMatcher(metadata.id, metadata.min, metadata.max, metadata.hint);
  }

  return () => new ElementMatcher(metadata);
}

class MatcherBase {
  constructor(metadata) {
    this.id = metadata.id;
    this.overloadedHint = metadata.hint;
  }
}

class ElementMatcher extends MatcherBase {
  constructor(metadata) {
    super(metadata);
    this.hintText = "Click the " + this.id + "!";
  }
  
  succeedsWhen(element, state, extraParams) {
    return element.indexOf(`id=\"${this.id}\"`) !== -1;
  }
  
  hint() {
    if (this.overloadedHint) {
      return this.overloadedHint;
    }
    return this.hintText;
  }
}

class CheckboxMatcher {
  constructor(id, targetState, overloadedHint) {
    this.id = id;
    this.target = targetState;
    this.isSwitch = true;
    this.overloadedHint = overloadedHint;
  }
    
  succeedsWhen(element, state, extraParams) {
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target;
  }
  
  hint() {    
    if (this.overloadedHint) {
      return this.overloadedHint;
    }
    return `Flip the ${this.id} switch to ${this.target}!`
  }
}

class RangeMatcher {
  constructor(id, lowVal, highVal, overloadedHint) {
    this.id = id;
    this.target = Math.floor((Math.random() * highVal) + lowVal);
    this.overloadedHint = overloadedHint;
  }
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target; 
  }
  
  hint() {     
    if (this.overloadedHint) {
      return this.overloadedHint;
    }
    return `Set ${this.id} to ${this.target}!`; 
  }
}

module.exports = createMoveOptions;