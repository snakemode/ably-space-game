function createMoveOptions(clickables) {
  const moveOptions = [];
  
  for (let metadata of clickables) {
    moveOptions.push(toMatcher(metadata));
  }
  
  return moveOptions;
}

function toMatcher(metadata) {
  if (metadata.type === "checkbox") {
    return () => new CheckboxMatcher(metadata);   
  } 
  
  if (metadata.type === "range") {
    return () => new RangeMatcher(metadata);
  }

  return () => new ElementMatcher(metadata);
}

class MatcherBase {
  constructor(metadata) {
    this.id = metadata.id;
    this.overloadedHint = metadata.hint;
    this.target = "";
  }
    
  hint() {
    let text = this.overloadedHint || this.hintText;
    text = text.replace("${id}", this.id);
    text = text.replace("${target}", this.target);
    return text;
  }
}

class ElementMatcher extends MatcherBase {
  constructor(metadata) {
    super(metadata);
    this.hintText = "Click the ${id}!";
  }
  
  succeedsWhen(element, state, extraParams) {
    return element.indexOf(`id=\"${this.id}\"`) !== -1;
  }

}

class CheckboxMatcher extends MatcherBase {
  constructor(metadata) {
    super(metadata);
    this.target = true;
    this.isSwitch = true; 
    this.hintText = "Flip the ${id} switch to ${target}!";
  }
    
  succeedsWhen(element, state, extraParams) {
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target;
  }  
}

class RangeMatcher extends MatcherBase {
  constructor(metadata, lowVal, highVal) {    
    super(metadata);
    this.target = Math.floor((Math.random() * metadata.max) + metadata.min);
    this.hintText = "Set ${id} to ${target}!";
  }
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target; 
  }
}

module.exports = createMoveOptions;