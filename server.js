const Game = require("./game");
const AblyConnector = require("./ablyConnector");

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
  const newGame = new Game(1);
  games[newGame.id] = newGame;

  const asText = JSON.stringify(newGame.gameStatus());
  response.send(asText);
});

app.post("/games/:gameId", (request, response) => {
  const activeGame = games[request.params["gameId"]];

  const gameResponse = activeGame.handleMove(
    request.body.element || "",
    request.body.state || {}, 
    request.body.extraParams || {}
  );

  const asText = JSON.stringify(gameResponse);
  console.log(asText);
  response.send(asText);
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
