class GameClient {

    constructor(forElements, onServerResponse) {
      this.currentGameId = -1;
      this.elementsToRegisterOnGameStart = forElements;
      this.onServerResponse = onServerResponse;
    }

    async startGame(clickedElement) {
      const startGameRequest = { clickables: this.elementsToRegisterOnGameStart };
      const requestBody = JSON.stringify(startGameRequest);
      
      console.log("startGame request:");
      console.log(startGameRequest);

      const response = await fetch("/games", { method: 'POST', body: requestBody, headers: { 'Content-Type': 'application/json' } });
      const responseBody = await response.json();
      this.currentGameId = responseBody.id;
      
      console.log("startGame response:");
      console.log(responseBody);

      this.onServerResponse(responseBody, clickedElement);
    }

    async sendState(clickedElement, extraParams) { 
        const dataset = clickedElement.dataset || { "uistate": {} };
        const uistate = dataset.uistate || {};

        if (clickedElement.type === "checkbox") {
          uistate["value"] = clickedElement.checked;
        }

        if (clickedElement.type === "range") {
          uistate["value"] = clickedElement.value;
        }

        await this.sendToServer(clickedElement, {
          element: clickedElement.outerHTML,
          state: uistate,
          extraParams: extraParams || {}
        });
    }

    async sendToServer(clickedElement, message) {
        console.log("sendToServer request:");
        console.log(message);

        const asText = JSON.stringify(message);
        const response = await fetch(`/games/${this.currentGameId}`, { method: "POST", body: asText, headers: { 'Content-Type': 'application/json' } });
        const responseBody = await response.json();
         
        console.log("sendToServer response:");
        console.log(responseBody);
      
        await this.onServerResponse(responseBody, clickedElement);
    }
}