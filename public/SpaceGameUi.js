class SpaceGameUi {
  
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
  
  hideSplashScreen() {
    document.getElementById("overlay").classList.add("hide");
  }

  resetShake() {
    document.getElementById("control").classList.remove("wrong");
  }
  
  shakeControl() {
    document.getElementById("control").classList.add("wrong");
  }
  
  
  showHint(hintText) {
      document.getElementById("text-message-hint").innerText = hintText.trim();
  }
  
  addClickHandlers(gameClient, onStartGame, onUiClick) {
    const clickables = this.getClickables();
    for (let element of clickables) {
        element.addEventListener("click", (sender) => onUiClick(sender.target));
        element.addEventListener("click", (sender) => gameClient.sendState(sender.target));
    }

    this.getStartButton().addEventListener("click", (sender) => onStartGame(sender.target)); 
  }  
}