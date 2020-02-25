const ably = require('ably');

async function onGameStateChanged(status) {

  if (status.gameState == "active") {
    const jsonBody = { value1: status.hint };
    await sendToApi(jsonBody);
  }
}

async function sendToApi(jsonBody) {
  const client = new ably.Realtime(process.env.ABLY_API_KEY)
  const channel = client.channels.get('space-game');

  channel.publish('channel_message_published', jsonBody);  
}

module.exports = onGameStateChanged;