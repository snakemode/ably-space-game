class SpaceGameUi {
  
  onUiClick(clickedElement) {
    
    if (clickedElement.hasAttribute("data-selected")) {
      clickedElement.removeAttribute("data-selected")
    } else {
      clickedElement.setAttribute("data-selected", "")
      clickedElement.parentElement.setAttribute("data-selected", clickedElement.id);
    }
    
  }  
  
  displayDebugHint(response) {
      document.getElementById("text-message-hint").innerText = (response.hint + " " + response.flavor).trim();
  }
  
  addClickHandlers(gameClient, onStartGame) {
    const clickables = this.getClickables();
    for (let element of clickables) {
        element.addEventListener("click", (sender) => this.onUiClick(sender.target));
        element.addEventListener("click", (sender) => gameClient.sendState(sender.target));
    }

    this.getStartButton().addEventListener("click", (sender) => onStartGame(sender.target)); 
  }
  
  getClickables() { return [...document.querySelectorAll(`[data-clickable]`)]; }
  getStartButton() { return [...document.querySelectorAll(`[data-start-game]`)][0]; }
  
  getClickableMetadata() {
    const clickables = this.getClickables();
    return clickables.map(e => ({
      id: e.id,
      type: e.type || "clickable",
      min: e.min || -1,
      max: e.max || -1,
      hint: e.dataset.hint || null
    }));  
  }
}