const fetch = require("node-fetch");
const useIfttt = true;

class AblyConnector {
    constructor() {
      this.publish = useIfttt ? this.publishToIftt : this.publishToAbly;
    }

    onGameStateChanged(status) {
        console.log("Ably Connector: onGameStateChanged");
      
        if (status.gameState == "active") {
          console.log("Game is active");
          console.log("Hint is: " + status.hint);
          
          publishToAbly(status.hint);
          return;
        }
    }

    async publishToIftt(textMessageToDisplay) {
      const iftttMessage = { value1: textMessageToDisplay };
      await publishInternal("https://maker.ifttt.com/trigger/ably-space-game/with/key/dZGwxamQRfH-kGsb9mnKpr3vg7kvUYHfNgjzhZRRzaW", iftttMessage);
    }

    async publishToAbly(textMessageToDisplay) {
      // Definitely doesn't work yet.
      await this.publishInternal("/nope", { nope: true });
    }

    async publishInternal(url, jsonBody) {
      try {
        const URL = url;
        await fetch(`${URL}`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBody)
        });    
      } catch (error) {
          return error
      }
    }
}

module.exports = AblyConnector;