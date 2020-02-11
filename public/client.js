let currentGameId;

async function startGame(playerPhoneNumber = "") {
  const startGameRequest = { phoneNumber: playerPhoneNumber };
  const response = await fetch("/games", { method: 'POST', body: JSON.stringify(startGameRequest), headers: { 'Content-Type': 'application/json' } });
  const responseBody = await response.json();
  currentGameId = responseBody.id;
  
  console.log(responseBody);
  displayDebugHint(responseBody);
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
    // game still active
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

startGame("07764444444"); // Collect this number from the UI.