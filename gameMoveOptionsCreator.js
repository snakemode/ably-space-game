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


function createMoveOptions(clickables) {
  const moveOptions = [];
  
  for (let metadata of clickables) {
    if (metadata.type === "clickable") {      
      moveOptions.push(() => new ElementMatcher(metadata.id));      
      
    } else if (metadata.type === "checkbox") {
      moveOptions.push(() => new CheckboxMatcher(metadata.id, true)); 
      
    } else if (metadata.type === "slider") {
                  
      moveOptions.push(() => {
        let target = Math.floor((Math.random() * 5) + 0);
        return {
          target: true,
          isSwitch: true,
          succeedsWhen: (element, state, extraParams) => element.indexOf(`id=\"${metadata.id}\"`) !== -1 && state["value"] == target,
          hint: () => `Flip the ${metadata.id} switch to ${target}!`
        }
      });
    }
  }
  
  return moveOptions;
}

module.exports = createMoveOptions;