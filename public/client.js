let currentGameId;

async function startGame() {
  const response = await fetch("/games", { method: 'POST' });
  const responseBody = await response.json();
  console.log(responseBody.id);
  currentGameId = responseBody.id;
}

async function sendState(state) {
    console.log(state.dataset.uistate);
    const uistate = state.dataset.uistate;
    const parsedState = JSON.parse(uistate);
    const message = {
        type: "processInput",
        state: parsedState
    };
    sendToServer(parsedState);
}

async function sendToServer(message) {
    // This is currently a fake, and would communicate over an API in the real world.
    const asText = JSON.stringify();
    console.log("Outbound state:");
    console.log(asText);
    // Do HTTP stuff here
    
    const response = await fetch(`/games/${currentGameId}`, { method: "POST", body: asText });
    const responseBody = await response.json();

    console.log(responseBody);
    /*
    // But for our fake...
    const response = {
        body: {},
        send: function (payload) {
            body = payload;
        }
    };


    receiveMessageFromClient({ status: 200, body: asText }, response);  Kinda fake Express.js payload*/
}

startGame();