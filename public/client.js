/* globals GameClient, SoundPlayer, SpaceGameUi */
const ui = new SpaceGameUi();
const soundPlayer = new SoundPlayer(false);
const gameClient = new GameClient(ui.getClickableMetadata(), onServerResponse);
ui.addClickHandlers(gameClient, startGame, onUiClick);

async function startGame(clickedElement) {
  console.log("start");
  ui.hideOverlay();
  gameClient.startGame(clickedElement);
}

function onUiClick(clickedElement) {
  if (clickedElement.hasAttribute("data-selected")) {
    clickedElement.removeAttribute("data-selected")
  } else {
    clickedElement.setAttribute("data-selected", "")
    clickedElement.parentElement.setAttribute("data-selected", clickedElement.id);
  }
  if (clickedElement.hasAttribute("data-resets")) {
      setTimeout(function() {
        clickedElement.removeAttribute("data-selected");
        clickedElement.parentElement.removeAttribute("data-selected", clickedElement.id);
      }, Number(clickedElement.getAttribute("data-resets")));
  }
}  

async function onServerResponse(response, clickedElement) {  
  ui.resetShake();
  ui.showHint(response.hint + " " + response.flavor);

  if (response.gameState === "failed") {
    ui.showHint("Oh no! You ran out of time!");
    return;
  }
  
  if (response.gameState === "complete") {
    ui.showHint("Game complete! Well done! You followed the instructions!");
    ui.showOverlay("win");
    return;
  }
  
  if (!response.lastMoveSuccessful) {
    ui.shakeControl();
    soundPlayer.errorSound();
    return;
  }

  if (response.gameState === "active") {
    let soundEffect = clickedElement.dataset.sound == undefined ? "click" : clickedElement.dataset.sound;
    soundPlayer.playSound(soundEffect);
    return;
  }
}