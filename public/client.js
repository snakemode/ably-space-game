let currentGameId;

const sounds = {
  "drone": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F195137__glueisobar__cavernous-drone.ogg?v=1581466929860",
  "click": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F219477__jarredgibb__button-04.ogg?v=1581466969567",
  "down":  "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F159399__noirenex__power-down.ogg?v=1581467189312"
};


async function startGame(playerPhoneNumber = "") {
  const startGameRequest = { phoneNumber: playerPhoneNumber };
  const response = await fetch("/games", { method: 'POST', body: JSON.stringify(startGameRequest), headers: { 'Content-Type': 'application/json' } });
  const responseBody = await response.json();
  currentGameId = responseBody.id;
  
  console.log(responseBody);
  displayDebugHint(responseBody);
  playSound("drone");
}

async function sendState(htmlElement, extraParams) {
    const dataset = htmlElement.dataset || { "uistate": "" };
    const uistate = dataset.uistate || "";
    
    await sendToServer({
      element: htmlElement.outerHTML,
      state: uistate,
      extraParams: extraParams || {}
    });
}

async function handleServerResponse(response) {
  displayDebugHint(response);

  if (!response.lastMoveSuccessful) {
    // shake the thing?
    console.log("Something to shake the UI because the move was wrong goes here.");
  }

  if (response.gameState === "complete") {
    alert("Game complete! Well done! You followed the instructions!");
    return;
  }

  if (response.gameState === "active") {
    playSound("click");
    return;
  }
}

async function sendToServer(message) {
    const asText = JSON.stringify(message);
    console.log("Sending:" + asText);
    
    const response = await fetch(`/games/${currentGameId}`, { method: "POST", body: asText, headers: { 'Content-Type': 'application/json' } });
    const responseBody = await response.json();    
    console.log(responseBody);

    await handleServerResponse(responseBody);
}

function displayDebugHint(response) {
    document.getElementById("text-message-hint").innerText = response.hint;
}

function record(element) {
  element.parentElement.setAttribute('data-selected', element.id); 
}

function playSound(soundId) {  
  var audio = document.createElement("audio");
  audio.src = sounds[soundId];
  audio.play();
  //document.appendChild(audio);
  //document.getElementById(soundId).play();
}

//startGame("07764444444"); // Collect this number from the UI.