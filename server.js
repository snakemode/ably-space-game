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
  const moves = createMoves(10, possibleMoves);
  console.log(moves);
  
  const newGame = new Game(publishToAbly, moves);
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
      
      moveOptions.push(() => {
        return {
          succeedsWhen: (element, state, extraParams) => element.indexOf(`id=\"${metadata.id}\"`) !== -1,
          hint: () => "Click the " + metadata.id + "!"
        };
      });
      
      
    } else if (metadata.type === "checkbox") {
            
      moveOptions.push(() => {
        return {
          target: true,
          isSwitch: true,
          succeedsWhen: (element, state, extraParams) => element.indexOf(`id=\"${metadata.id}\"`) !== -1 && state["value"] == this.target,
          hint: () => `Flip the ${metadata.id} switch to ${this.target}!`
        }
      });
      
    } else if (metadata.type === "slider") {
      /* 
class SelectFromFieldset {
  constructor(elementId, lowVal, highVal) {
    this._elementId = elementId;
    this._target = random(lowVal, highVal);
  }
  
  succeedsWhen(element, state, extraParams) { 
    return element.indexOf(`id=\"${this._elementId}\"`) !== -1 && state["value"] == this._target;  
  }
  
  hint() { 
    return `Set ${this._elementId} to ${this._target}!`; 
  }
}
*/
    }
  }
  
  return moveOptions;
}