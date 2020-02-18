/* globals GameClient, SoundPlayer, SpaceGameUi */
const ui = new SpaceGameUi();

const clickables = [...document.querySelectorAll(`[data-clickable]`)];
const startButtons = [...document.querySelectorAll(`[data-start-game]`)];
const metadata = ui.getClickableMetadata(clickables);

const gameClient = new GameClient(ui.getClickableMetadata(clickables), onServerResponse);
const soundPlayer = new SoundPlayer();

for(let element of clickables) {
    element.addEventListener("click", (sender) => ui.updateUiState(sender.target));
    element.addEventListener("click", (sender) => gameClient.sendState(sender.target));
}

startButtons[0].addEventListener("click", (sender) => startGame(sender.target)); 

async function startGame(clickedElement) {  
  document.getElementById("overlay").remove();
  gameClient.startGame(clickedElement);
}

async function onServerResponse(response, clickedElement) {
  ui.displayDebugHint(response);

  if (!response.lastMoveSuccessful) {
    document.getElementById("control").classList.add("wrong");
    soundPlayer.errorSound();
    return;
  }

  if (response.gameState === "complete") {
    alert("Game complete! Well done! You followed the instructions!");
    return;
  }

  if (response.gameState === "failed") {
    alert("Oh no! You ran out of time!");
    return;
  }

  if (response.gameState === "active") {
    let soundEffect = clickedElement.dataset.sound == undefined ? "click" : clickedElement.dataset.sound;
    soundPlayer.playSound(soundEffect);
    return;
  }
}