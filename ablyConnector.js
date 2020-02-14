const fetch = require("node-fetch");
const useIfttt = true;

const iftttUrl = "https://maker.ifttt.com/trigger/ably-space-game/with/key/dZGwxamQRfH-kGsb9mnKpr3vg7kvUYHfNgjzhZRRzaW";

const flavor = [
  "They're right on our heels capn'",
  "",
  "Oh no, they're gaining on us!",
  "",
  "Not the shields!",
]

async function onGameStateChanged(status) {
      console.log("Ably Connector: onGameStateChanged");
    
      if (status.gameState == "active") {

        const randomText = Math.floor((Math.random() * flavor.length) + 0);
        const jsonBody = { value1: status.hint, value2: randomText };

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