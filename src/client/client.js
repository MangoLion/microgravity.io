// Setup config
const config = require("../config/config");
config.isClient = true;

const GameClient = require("./GameClient");

// Create game
const game = new GameClient();

// Start connection
function start() {//http://[2601:2c3:867f:490:d196:9706:2aeb:f64e]:8080/
    // Update socket
    //game.connectSocket("127.0.0.1", 8008, 0);
    game.connectSocket("149.56.14.197", 8008, 0);
}

window.addEventListener("load", start);
