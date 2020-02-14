const fetch = require("node-fetch");
const useIfttt = true;

const iftttUrl = "https://maker.ifttt.com/trigger/ably-space-game/with/key/dZGwxamQRfH-kGsb9mnKpr3vg7kvUYHfNgjzhZRRzaW";

async function onGameStateChanged(status) {
      console.log("Ably Connector: onGameStateChanged");
    
      if (status.gameState == "active") {

        const jsonBody = { value1: status.hint };

        try {
            await fetch(iftttUrl, {
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