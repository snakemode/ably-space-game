Super Funtimes Stressful Control Panel Simulator
=================

In this example, we're going to demonstrait how to use `Ably Channels` with the **IF This Then That** `IFTTT` API.


What are we building?
------------

We're going to build a game, inspired by `Spaceteam` and `Keep Talking and Nobody Explodes`.
These puzzle games rely on your quick wits to follow a set of instructions that are given to you by other players - or in our case, an Ably API integration.

When the game starts, you're faced with an obtuse control panel, and over the course of a minute, you'll be provided with ten instructions to complete to beat the level.

These kinds of co-op puzzle games are often fast paced, and plenty of fun at parties.


How is this going to interact with Ably?
-------------

- Gonna send a message to the Ably hub
- It's gonna trigger at thing on IFTTT
- The player gets to respond to the triggered thing


Building the game
-------------

The game is split into two halves - the part that runs in the users browser, and the part that runs in on our `node.js` server.

### The client side

The client side portion of the game, the UI, is a set of HTML5 buttons and widgets found in `views/index.html`.
Each of the clickable elements in our control panel is made up of markup that looks a little bit like this:

```html
<div class="button green" id="hydrogen" data-clickable></div>
```

Each clickable element is made up of a few things:
* CSS `class` properties to style the element
* A unique `id` that we'll use on the server side to evaluate the click
* A `data-clickable` attribute, which attaches our client side click handler function - `sendState`

`sendState` is a `function` that we've defined in `public/GameClient.js` that grabs the current state of a DOMElement, and sends it across to our server side code.
It does three things:

1. It serializes the DOMElement to a `string`
2. It `JSON.stringifys` any additional data that we want to post to the server
3. It uses the browsers built in `fetch API` to `POST` the data, and return a response for us to process in the client.

Once the server side part of the game has decided if the element that was clicked was the element it was expecting a callback is made to the function

```js
async function onServerResponse(response, clickedElement) { ... }
```
that's in `public/client.js`, and based on the servers response, we can provide feedback to our players.

If you browse through `views/index.html` you'll see how we've put together HTML elements, and then styled them with the CSS file in `views/style.css` to make them feel like buttons on a control panel.

### The server side

All of the game logic is run on our `node.js` server.

When the player starts the game in their browser, a HTTP POST is made to an API hosted in an `express.js` app with a route that looks like this:

```js
app.post("/games", (request, response) => {  
  const moveOptionsFromClientClickables = createMoveOptions(request.body.clickables);  
  const moves = createMoves(10, moveOptionsFromClientClickables);  
  
  const newGame = new Game(publishToAbly, moves);
  games[newGame.id] = newGame;

  const asText = JSON.stringify(newGame.status());
  response.send(asText);
});
```

This block of code does four important things, it:
* accepts the list of clickable elements from the client, creating 10 game moves out of them.
* creates a new instance of our `Game` class, defined in `game.js`
* passes a function called `publishToAbly` as the first constructor parameter, and the moves as the second.
* stores the game in an array called `games`, using an `id` property generated when we construct our new game

The API returns the `status` of the game by calling the function `game.status()` - this contains a unique Id that the client will use on subsequent interactions.

When the player clicks on an element, the `sendState` function in the GameClient calls a second API:

```js
app.post("/games/:gameId", (request, response) => {
  const activeGame = games[request.params["gameId"]];
  if (!activeGame) {    
    response.send(JSON.stringify({ error: "No active game!" }));
    return;
  }

  const gameResponse = activeGame.handleMove(
    request.body.element || "",
    request.body.state || "", 
    request.body.extraParams || {}
  );

  response.send(JSON.stringify(gameResponse));
});
```

Other than the guard check at start, this function does three things, it:
* finds our active game using the `id` provided in the URL
* calls the function `handleMove` on our `Game` object, carefully making sure none of it's expected parameters are null or undefined
* returns the result of the move to the client

The result of the move is the same `status` object the client received when it started the game, just with updated information.

### How the gameplay works

When a new game is created, 10 `moves` are generated from the interactable "clickable" elements in our UI. These elements are marked up with a data tag - `data-clickable` and posted to the server when a game is started.

Each of these elements has an `ElementMatcher` generated for it by the `gameMoveOptionsCreator` - it adds a little bit of randomness (what values sliders have to be set to, or if a toggle has to be on or off), some hint text (the instruction we show to the user), and a function called `succeedsWhen` which is called to check user input. These `ElementMatcher`s are nothing special - just javascript functions - but we have a different one for each `type` of `clickable`.

When the user clicks on one of our UI elements, the element from the browser, along with any extra parameters
provided to the `sendState` method are handed to the `succeedsWhen` function of the game move at the top of this games collection of moves.

If the `succeedsWhen` function returns `true`, that move is completed and removed from the internal array. If the function returns false, 
nothing happens to the game state. Regardless of the move succeeding or failing, exactly the same object is returned to the client to handle containing the following properties

```js
{
  id: "e0d184b0-07f1-4bf8-b522-6887ab4025fa",
  gameState: "active",
  remainingTasks: 10,
  hint: "Click the unobtainium!",
  flavor: "Oh no, they're gaining on us!",
  lastMoveSuccessful: true,
  playerId: "07764444444",
  gameEnds: "2020-02-12T14:52:24.352Z"
}
```

The client will respond to the value set in `lastMoveSuccessful` along with the `gameState` of either `active` or `completed`.

There's plenty more nuance to how the game logic works - feel free to play around with the sample!

Connecting our game to Ably
-------------
### Prerequisits
As with most of our demos, you're going to need:

* An Ably API key
* The Ably JavaScript SDK

### The callback hook
Remember when we created our new game, we passed something called `publishToAbly` to our constructor?

```js
const game = new Game(publishToAbly);
```

This is our hook for triggering events based on changes to the games state.
Inside of `game.js` both at the start of the game, and whenever a player successfully completes a move, this `callback function` is triggered.
And the game state that we send to the client? It's also handed to the callback function.

We're able to write just about any code we like in this callback hook, so let's take a look at publishing notifications to an Ably channel

First, take a look inside the file `ablyConnector.js`.

```javascript
const fetch = require("node-fetch");
const apiUrl = "https://path/to/ably/rest/api";
const enabled = true;

async function onGameStateChanged(status) {
  if (!enabled) return;

  if (status.gameState == "active") {
    const jsonBody = { value1: status.hint, value2: status.flavor };
    await sendToApi(jsonBody);
  }
}

async function sendToApi(jsonBody) {
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody)
      });

      console.log("Sent to Ably");
    } catch (error) {
      console.log(error);
    }
}

module.exports = onGameStateChanged;
```

You'll notice a few things
* We're exporting a single function called `onGameStateChanged(status)`
* We're importing the *npm* module `node-fetch` at the top

You'll need to make sure you have `node-fetch` in your `package.json` file for this to work, because the `fetch API` is a browser API, and not available by default in the `node.js` runtime.
If you prefer to use another HTTP library (`axios` etc), then do so.

We have access to exactly the same gameStatus properties as our game does in our `ablyConnector`, so we can use anything from this object graph in our ably code

```js
{
  id: "e0d184b0-07f1-4bf8-b522-6887ab4025fa",
  gameState: "active",
  remainingTasks: 10,
  hint: "Click the unobtainium!",
  flavor: "Oh no, they're gaining on us!",
  lastMoveSuccessful: true,
  playerId: "07764444444",
  gameEnds: "2020-02-12T14:52:24.352Z"
}
```

During application startup in `server.js`, we're importing our `ablyConnector` file as `publishToAbly`, and passing it into each of our games as they're ceated.

###  Sending Ably messages

- Reference Ably JS API
- Get API key
- Add callback code to `ablyConnector.js`

- We're currently sending messages to IFTTT using the `Ably REST API`.
- This is because we need to disabled the `Ably Message Envelope` for the IFTTT integration to work correctly.
- This is only supported on the API (or is it also on the settings for the channel?)
- If it is, we can just use the Ably SDK and change channel setup instructions.
