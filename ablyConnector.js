const fetch = require("node-fetch");
const useIfttt = true;

const iftttUrl = "https://maker.ifttt.com/trigger/ably-space-game/with/key/dZGwxamQRfH-kGsb9mnKpr3vg7kvUYHfNgjzhZRRzaW";

class AblyConnector {

    async onGameStateChanged(status) {
        console.log("Ably Connector: onGameStateChanged");
      
        if (status.gameState == "active") {
          console.log("Game is active");
          console.log("Hint is: " + status.hint);

          const jsonBody = { value1: status.hint };

          try {
              const response = await fetch(iftttUrl, {
                  method: 'POST',
                  headers: { 
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(jsonBody)
              }); 
              
              console.log(response);
            } catch (error) {
              console.log(error);
            }
          }
          
        }
    }


module.exports = AblyConnector;