const Game = require("./game");
const express = require("express");
const app = express();

const games = {};

app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/startGame", (request, response) => {
  const newGame = new Game();
  games[newGame.id] = newGame;
  response.send({ id: newGame.id });
});

app.post("/games/:gameId", (request, response) => {
  console.log(req.params);
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
