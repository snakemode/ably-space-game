function createMoveOptions(clickables) {
  const moveOptions = [];
  
  for (let metadata of clickables) {
    const matcherFunction = CreateMatcherFunction(metadata);
    moveOptions.push(matcherFunction);
  }
  
  return moveOptions;
}

function CreateMatcherFunction(metadata) {
  if (metadata.type === "checkbox") {
    return () => new CheckboxMatcher(metadata);   
  } 
  
  if (metadata.type === "range") {
    return () => new RangeMatcher(metadata);
  }

  return () => new RegularClickableMatcher(metadata);
}

class MatcherBase {
  constructor(metadata) {
    this.id = metadata.id;
    this.overloadedHint = metadata.hint;
    this.target = "";
  }
    
  hint() {
    let text = this.overloadedHint || this.hintText;
    let targetText = this.getTargetText ? this.getTargetText() : "";
    
    text = text.replace("${id}", this.id);
    text = text.replace("${target}", this.target);
    text = text.replace("${targetText}", targetText);
    return text;
  }
}

class RegularClickableMatcher extends MatcherBase {
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
    this.target = !metadata.value;
    this.isSwitch = true;
    this.hintText = "Switch the ${id} ${targetText}. That'll surprise them!";
  }
  
  getTargetText() {
    return this.target ? "on" : "off";
  }
    
  succeedsWhen(element, state, extraParams) {
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target;
  }  
}

class RangeMatcher extends MatcherBase {
  constructor(metadata) {    
    super(metadata);
    this.target = Math.floor((Math.random() * metadata.max)) + Number(metadata.min);
    this.hintText = "Set ${id} to ${target}!";
  }
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this.id}\"`) !== -1 && state["value"] == this.target; 
  }
}

module.exports = createMoveOptions;