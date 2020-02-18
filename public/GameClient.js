class GameClient {

    constructor(forElements, onServerResponse) {
      this.currentGameId = -1;
      this.elementsToRegisterOnGameStart = forElements;
      this.onServerResponse = onServerResponse;
    }

    async startGame(clickedElement) {
      const startGameRequest = { clickables: this.elementsToRegisterOnGameStart };
      const requestBody = JSON.stringify(startGameRequest);
      console.log("Game start request: " + requestBody);

      const response = await fetch("/games", { method: 'POST', body: requestBody, headers: { 'Content-Type': 'application/json' } });
      const responseBody = await response.json();
      this.currentGameId = responseBody.id;

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
        const asText = JSON.stringify(message);
        console.log("Sending:" + asText);
        document.getElementById("control").classList.remove("wrong");

        const response = await fetch(`/games/${this.currentGameId}`, { method: "POST", body: asText, headers: { 'Content-Type': 'application/json' } });
        const responseBody = await response.json();
      
        await this.onServerResponse(responseBody, clickedElement);
    }
}