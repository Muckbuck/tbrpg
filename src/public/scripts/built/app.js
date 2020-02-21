"use strict";
exports.__esModule = true;
var game_1 = require("./game");
var Game = new game_1["default"]();
var ClientSocket = require('./ClientSocket');
var cs = new ClientSocket();
cs.connect();
window.onload = function () {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    Game.run(ctx);
};
//# sourceMappingURL=app.js.map