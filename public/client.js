/* globals GameClient, SoundPlayer, SpaceGameUi */
const ui = new SpaceGameUi();
const clickableMetadata = ui.getClickableMetadata();

const gameClient = new GameClient(clickableMetadata, onServerResponse);
const soundPlayer = new SoundPlayer();

ui.addClickHandlers(gameClient, startGame); // Makes the start game button work

async function startGame(clickedElement) {
  document.getElementById("overlay").classList.add("hide");
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