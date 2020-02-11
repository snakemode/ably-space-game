let currentGameId;

async function startGame() {
  const response = await fetch("/games", { method: 'POST' });
  const responseBody = await response.json();
  console.log(responseBody);
  currentGameId = responseBody.id;
  displayDebugHint(responseBody);
}

async function sendState(htmlElement, extraParams) {
    const dataset = htmlElement.dataset || { "uistate": "{}" };
    const uistate = dataset.uistate || "{}";

    const message = {
      element: htmlElement.outerHTML,
      state: JSON.parse(uistate),
      extraParams: extraParams || {}
    }

    await sendToServer(message);
}

async function handleServerResponse(response) {  
  displayDebugHint(response);

  if (response.status === "complete") {
    alert("Game complete! Well done! You followed the instructions!");
    return;
  }

  if (response.status === "active") {
    // game still active
    return;
  }
}

async function sendToServer(message) {
    const asText = JSON.stringify(message);
    console.log("Outbound state:");
    console.log(asText);
    
    const response = await fetch(`/games/${currentGameId}`, { method: "POST", body: asText, headers: { 'Content-Type': 'application/json' } });
    const responseBody = await response.json();    
    console.log(responseBody);

    await handleServerResponse(responseBody);
}

function displayDebugHint(response) {
    document.getElementById("text-message-hint").innerText = response.hint;
}

startGame();