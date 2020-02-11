let currentGameId;

async function startGame() {
  const response = await fetch("/games", { method: 'POST' });
  const responseBody = await response.json();
  console.log(responseBody.id);
  currentGameId = responseBody.id;
}

async function sendState(htmlElement, extraParams) {   
    const uistate = htmlElement.dataset.uistate || "{}";
    
    const serverMessage = {
      element: htmlElement.outerHTML,
      state: JSON.parse(uistate),
      extraParams: extraParams
    };

    sendToServer(serverMessage);
}

async function sendToServer(message) {
    const asText = JSON.stringify(message);
    console.log("Outbound state:");
    console.log(asText);
    
    const response = await fetch(`/games/${currentGameId}`, { method: "POST", body: asText });
    const responseBody = await response.json();

    console.log(responseBody);
}

startGame();