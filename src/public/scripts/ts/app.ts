import GameClass from './game';
const Game = new GameClass();
const ClientSocket = require('./ClientSocket');

const cs = new ClientSocket();

cs.connect();

window.onload = function () {
    var canvas = <HTMLCanvasElement> document.getElementById("game");
    var ctx = canvas.getContext("2d");
    Game.run(ctx);
};
