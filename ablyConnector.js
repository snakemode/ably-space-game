const ably = require('ably');
const enabled = true;

async function onGameStateChanged(status) {
  if (!enabled) return;

  if (status.gameState == "active") {
    const jsonBody = { value1: status.hint };
    await sendToApi(jsonBody);
  }
}

async function sendToApi(jsonBody) {
  const client = new ably.Realtime(process.env.ABLY_API_KEY)
  const channel = client.channels.get('space-game');

  channel.publish('ably-space-game', jsonBody);  
}

module.exports = onGameStateChanged;