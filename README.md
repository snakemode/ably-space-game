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

The UI is a set of HTML5 buttons and widgets found in `views/index.html`