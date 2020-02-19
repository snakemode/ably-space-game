/* globals GameClient, SoundPlayer, SpaceGameUi */
const ui = new SpaceGameUi();
const soundPlayer = new SoundPlayer(false);
const gameClient = new GameClient(ui.getClickableMetadata(), onServerResponse);
ui.addClickHandlers(gameClient, startGame, onUiClick);

async function startGame(clickedElement) {
  ui.hideSplashScreen();
  gameClient.startGame(clickedElement);
}

function onUiClick(clickedElement) {
  document.getElementById("control").classList.remove("wrong");

  if (clickedElement.hasAttribute("data-selected")) {
    clickedElement.removeAttribute("data-selected")
  } else {
    clickedElement.setAttribute("data-selected", "")
    clickedElement.parentElement.setAttribute("data-selected", clickedElement.id);
  }
}  

async function onServerResponse(response, clickedElement) {
  ui.showHint(response.hint + " " + response.flavor);

  if (response.gameState === "failed") {
    ui.showHint("Oh no! You ran out of time!");
    document.getElementById("overlay").classList.remove("hide").add("slow");
    return;
  }
  
  if (response.gameState === "complete") {
    document.getElementById("overlay").classList.remove("hide").add("win");
    ui.showHint("Game complete! Well done! You followed the instructions!");
    return;
  }
  
  if (!response.lastMoveSuccessful) {
    document.getElementById("control").classList.remove("wrong");

    document.getElementById("control").classList.add("wrong");
    soundPlayer.errorSound();
    return;
  }

  if (response.gameState === "active") {
    let soundEffect = clickedElement.dataset.sound == undefined ? "click" : clickedElement.dataset.sound;
    soundPlayer.playSound(soundEffect);
    return;
  }
}