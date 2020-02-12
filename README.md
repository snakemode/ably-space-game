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
<div class="button green" id="hydrogen" onclick="sendState(this);"></div>
```

Each clickable element is made up of a few things:
* CSS `class` properties to style the element
* A unique `id` that we'll use on the server side to evaluate the click
* An `onclick` handler to a function called `sendState`

`sendState` is a `function` that we've defined in `public/client.js` that grabs the current state of a DOMElement, and sends it across to our server side code.
It does three things:

1. It serializes the DOMElement to a `string`
2. It `JSON.stringifys` any additional data that we want to post to the server
3. It uses the browsers built in `fetch API` to `POST` the data, and return a response for us to process in the client.

Once the server side part of the game has decided if the element that was clicked was the element it was expecting a callback is made to the function

```js
async function handleServerResponse(response, clickedElement) { ... }
```
that's also in `public/client.js`, and based on the servers response, we can provide feedback to our players.

If you browse through `views/index.html` you'll see how we've put together HTML elements, and then styled them with the CSS file in `views/style.css` to make them feel like buttons on a control panel.

### The server side

All of the game logic is run on our `node.js` server.

When the player starts the game in their browser, a HTTP POST is made to an API hosted in an `express.js` app with a route that looks like this:

```js
app.post("/games", (request, response) => {
  
  const newGame = new Game(request.body.phoneNumber, ably.onGameStateChanged);
  games[newGame.id] = newGame;

  const asText = JSON.stringify(newGame.status());
  response.send(asText);
});
```

This block of code does three important things, it:
* creates a new instance of our `Game` class, defined in `game.js`, passing a `user identifier` to the constructor.
* passes a function called `ably.onGameStateChanged` as the second constructor parameter
* stores the game in an array called `games`, using an `id` property generated when we construct our new game 