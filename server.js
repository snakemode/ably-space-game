const Game = require("./game");
const createMoves = require("./gameMoveCreator");
const publishToAbly = require("./ablyConnector");

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const games = {};

app.use(bodyParser.json({limit: '50mb'}));

app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/games", (request, response) => {
  console.log(request.body.clickables);
  
  const possibleMoves = createMoveOptions(request.body.clickables);  
  //console.log(possibleMoves);
  
  const moves = createMoves(10, possibleMoves);
  console.log(moves);
  
  const newGame = new Game(publishToAbly);
  games[newGame.id] = newGame;

  const asText = JSON.stringify(newGame.status());
  response.send(asText);
});

app.post("/games/:gameId", (request, response) => {
  const activeGame = games[request.params["gameId"]];

  const gameResponse = activeGame.handleMove(
    request.body.element || "",
    request.body.state || "", 
    request.body.extraParams || {}
  );

  response.send(JSON.stringify(gameResponse));
});


const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});


function createMoveOptions(clickables) {
  const moveOptions = [];
  
  for (let metadata of clickables) {
    if (metadata.type === "clickable") {
      
      moveOptions.push({
        succeedsWhen: (element, state, extraParams) => element.indexOf(`id=\"${this._elementId}\"`) !== -1,
        hint: () => "Click the " + metadata.id + "!"
      });
      
      
    } else if (metadata.type === "checkbox") {
            
      moveOptions.push(() => {{
        target: true,
        isSwitch: true,
        succeedsWhen: (element, state, extraParams) => element.indexOf(`id=\"${this._elementId}\"`) !== -1 && state["value"] == this.target,
        hint: () => `Flip ${this.elementId} switch to ${this.target}!`
      }});
      
    } else if (metadata.type === "slider") {
      
    }
  }
  
  return moveOptions;
}