class AblyConnector {
    onGameStateChanged(status) {
        console.log("Ably Connector: onGameStateChanged");
      
        if (status.gameState == "active") {
          console.log("Game is active");
          console.log("Hint is: " + status.hint);
          
          // Send SMS notification here
        }
    }
}

module.exports = AblyConnector;