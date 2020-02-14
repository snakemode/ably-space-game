const enableSounds = true;

let currentGameId;

function registerClickHandlers() {
  const clickables = [...document.querySelectorAll(`[data-clickable]`)];
  
  for(let element of clickables) {
    element.addEventListener("click", (sender) => record(sender.target));
    element.addEventListener("click", (sender) => sendState(sender.target));
    clickables.push[element];
  }

  for(let element of [...document.querySelectorAll(`[data-start-game]`)]) {
    element.addEventListener("click", () => startGame());
  }
  return clickables;
}

const clickableElements = registerClickHandlers();
const elementsToRegisterOnGameStart = clickableElements.map(e => ({
  id: e.id,
  type: e.type || "clickable",
  min: e.min || -1,
  max: e.max || -1,
  hint: e.dataset.hint || null
}));

async function startGame() {
  const startGameRequest = { clickables: elementsToRegisterOnGameStart };
  const requestBody = JSON.stringify(startGameRequest);
  console.log("Game start request: " + requestBody);
  
  const response = await fetch("/games", { method: 'POST', body: requestBody, headers: { 'Content-Type': 'application/json' } });
  const responseBody = await response.json();
  currentGameId = responseBody.id;
  
  console.log(responseBody);
  displayDebugHint(responseBody);
  // playSound("drone");
}

async function sendState(clickedElement, extraParams) { 
    const dataset = clickedElement.dataset || { "uistate": {} };
    const uistate = dataset.uistate || {};
  
    if (clickedElement.type === "checkbox") {
      uistate["value"] = clickedElement.checked;
    }
  
    if (clickedElement.type === "range") {
      uistate["value"] = clickedElement.value;
    }
    
    await sendToServer(clickedElement, {
      element: clickedElement.outerHTML,
      state: uistate,
      extraParams: extraParams || {}
    });
}

async function handleServerResponse(response, clickedElement) {
  displayDebugHint(response);

  if (!response.lastMoveSuccessful) {
    // shake the thing?
    console.log("Something to shake the UI because the move was wrong goes here.");    
    errorSound();
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
    playSound(clickedElement.dataset.sound == undefined ? "click" : clickedElement.dataset.sound);
    return;
  }
}

async function sendToServer(clickedElement, message) {
    const asText = JSON.stringify(message);
    console.log("Sending:" + asText);
    
    const response = await fetch(`/games/${currentGameId}`, { method: "POST", body: asText, headers: { 'Content-Type': 'application/json' } });
    const responseBody = await response.json();    
    console.log(responseBody);

    await handleServerResponse(responseBody, clickedElement);
}

function displayDebugHint(response) {
    document.getElementById("text-message-hint").innerText = (response.hint + " " + response.flavor).trim();
}

function record(element) {
  element.parentElement.setAttribute('data-selected', element.id); 
}


const sounds = {
  "drone": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F195137__glueisobar__cavernous-drone.ogg?v=1581466929860",
  "click": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F219477__jarredgibb__button-04.ogg?v=1581466969567",
  "click2":"https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F178186__snapper4298__camera-click-nikon.ogg?v=1581471198068",
  "down":  "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F159399__noirenex__power-down.ogg?v=1581467189312",
  "crash": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F13830__adcbicycle__21.ogg?v=1581470565578"
};

const breakdownSounds = [
  "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F159399__noirenex__power-down.ogg?v=1581467189312",
  "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F13830__adcbicycle__21.ogg?v=1581470565578"
];

function playSound(soundId, loop = false) {  
  const audio = document.createElement("audio");
  audio.loop = loop;
  audio.src = sounds[soundId];
  play(audio);
}

function errorSound() {
  const elementId = random(0, breakdownSounds.length);
  const audio = document.createElement("audio");
  audio.src = breakdownSounds[elementId];
  play(audio);
}

function play(audioElement) {
  if (enableSounds) {
    audioElement.play();
  }
}

function random(start, end) { 
  return Math.floor((Math.random() * end) + start); 
}