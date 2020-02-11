const allPossibleMoves = [
    { 
        hint: "Press the button to the right of the square logo", 
        succeedsWhen: (clientState) => {

        }
    }
];

const games = {};

function createNewGame() {
    const gameId = uuidv4();
    const instructions = [];
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

// Server API here
function receiveMessageFromClient(request, response) {

}