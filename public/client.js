/* globals GameClient, SoundPlayer, SpaceGameUi */
const ui = new SpaceGameUi();
const soundPlayer = new SoundPlayer();
const gameClient = new GameClient(ui.getClickableMetadata(), onServerResponse);

ui.addClickHandlers(gameClient, startGame, onUiClick);

async function startGame(clickedElement) {
  
  document.getElementById("overlay").classList.add("hide");
  gameClient.startGame(clickedElement);
}

function onUiClick(clickedElement) {

  if (clickedElement.hasAttribute("data-selected")) {
    clickedElement.removeAttribute("data-selected")
  } else {
    clickedElement.setAttribute("data-selected", "")
    clickedElement.parentElement.setAttribute("data-selected", clickedElement.id);
  }
}  

async function onServerResponse(response, clickedElement) {
  document.getElementById("text-message-hint").innerText = (response.hint + " " + response.flavor).trim();

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