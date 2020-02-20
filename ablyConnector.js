const fetch = require("node-fetch");
const apiUrl = "https://rest.ably.io/channels/space-game/messages?key=" + process.env.ABLY_API_KEY;
const enabled = true;

async function onGameStateChanged(status) {
  if (!enabled) return;

  if (status.gameState == "active") {
    const jsonBody = {"data":{ value1: status.hint, value2: status.flavor }};
    await sendToApi(jsonBody);
  }
}

async function sendToApi(jsonBody) {
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody)
      });

      console.log("Sent to Ably");
    } catch (error) {
      console.log(error);
    }
}

module.exports = onGameStateChanged;