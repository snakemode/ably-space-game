class AblyConnector {
    onGameStateChanged(gameState) {
        console.log("Ably Connector: onGameStateChanged");
        console.log("Hint is: " + gameState.hint);
    }
}

module.exports = AblyConnector;