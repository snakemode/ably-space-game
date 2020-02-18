/* globals GameClient, SoundPlayer */
const clickables = [...document.querySelectorAll(`[data-clickable]`)];
const startButtons = [...document.querySelectorAll(`[data-start-game]`)];
const metadata = getClickableMetadata(clickables);

const gameClient = new GameClient(metadata, onServerResponse);
const soundPlayer = new SoundPlayer();

wireUpClickHandlers(gameClient); // Makes the Start Game button work.

async function startGame(clickedElement) {  
  document.getElementById("overlay").remove();
  gameClient.startGame(clickedElement);
}

async function onServerResponse(response, clickedElement) {
  displayDebugHint(response);

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

function displayDebugHint(response) {
    document.getElementById("text-message-hint").innerText = (response.hint + " " + response.flavor).trim();
}

function record(element) {
  if (element.hasAttribute("data-selected")) {
    element.removeAttribute("data-selected")
  } else {
    element.setAttribute("data-selected", "")
    element.parentElement.setAttribute("data-selected", element.id);
  }
}

function getClickableMetadata(clickables) {
  return clickables.map(e => ({
    id: e.id,
    type: e.type || "clickable",
    min: e.min || -1,
    max: e.max || -1,
    hint: e.dataset.hint || null
  }));  
}

function wireUpClickHandlers(client) {
  for(let element of clickables) {
      element.addEventListener("click", (sender) => record(sender.target));
      element.addEventListener("click", (sender) => client.sendState(sender.target));
  }

  for(let element of startButtons) { 
    element.addEventListener("click", (sender) => startGame(sender.target)); 
  }
}