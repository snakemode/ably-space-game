const fetch = require("node-fetch");

const apiUrl = "https://maker.ifttt.com/trigger/ably-space-game/with/key/dZGwxamQRfH-kGsb9mnKpr3vg7kvUYHfNgjzhZRRzaW";
const enabled = false;

async function onGameStateChanged(status, flavorText = "") {
    if(!enabled) {
      return;
    }
    
    if (status.gameState == "active") {

      const jsonBody = { value1: status.hint, value2: flavorText };

      try {
          await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(jsonBody)
          }); 

        } catch (error) {
          console.log(error);
        }
      }          
}  

module.exports = onGameStateChanged;