"use strict";
exports.__esModule = true;
var Keebs = {};
Keebs.LEFT = 37;
Keebs.RIGHT = 39;
Keebs.UP = 38;
Keebs.DOWN = 40;
var keyboard_1 = require("./keyboard");
var loader_1 = require("./loader");
var camera_1 = require("./camera");
var hero_1 = require("./hero");
var map_1 = require("./map");
var Loader = new loader_1["default"]();
var Keyboard = new keyboard_1["default"]();
var Map = new map_1["default"]();
var Game = (function () {
    function Game() {
        var _this = this;
        this.tick = function (elapsed) {
            window.requestAnimationFrame(_this.tick.bind(_this));
            _this.ctx.clearRect(0, 0, 512, 512);
            var delta = (elapsed - _this._previousElapsed) / 1000.0;
            delta = Math.min(delta, 0.25);
            _this._previousElapsed = elapsed;
            _this.update(delta);
            _this.render();
        };
        this.load = function () {
            return [
                Loader.loadImage('tiles', '../assets/tiles.png'),
                Loader.loadImage('character', '../assets/character.png')
            ];
        };
        this.init = function () {
            Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
            this.tileAtlas = Loader.getImage('tiles');
            this.hero = new hero_1["default"](Map, 160, 160, Loader.getImage('character'));
            this.camera = new camera_1["default"](Map, 512, 512);
            this.camera.follow(this.hero);
        };
        this.update = function (delta) {
            var dirx = 0;
            var diry = 0;
            if (Keyboard.isDown(Keyboard.LEFT)) {
                dirx = -1;
            }
            else if (Keyboard.isDown(Keyboard.RIGHT)) {
                dirx = 1;
            }
            else if (Keyboard.isDown(Keyboard.UP)) {
                diry = -1;
            }
            else if (Keyboard.isDown(Keyboard.DOWN)) {
                diry = 1;
            }
            this.hero.move(delta, dirx, diry);
            this.camera.update();
        };
        this._drawLayer = function (layer) {
            var startCol = Math.floor(this.camera.x / Map.tsize);
            var endCol = startCol + (this.camera.width / Map.tsize);
            var startRow = Math.floor(this.camera.y / Map.tsize);
            var endRow = startRow + (this.camera.height / Map.tsize);
            var offsetX = -this.camera.x + startCol * Map.tsize;
            var offsetY = -this.camera.y + startRow * Map.tsize;
            for (var c = startCol; c <= endCol; c++) {
                for (var r = startRow; r <= endRow; r++) {
                    var tile = Map.getTile(layer, c, r);
                    var x = (c - startCol) * Map.tsize + offsetX;
                    var y = (r - startRow) * Map.tsize + offsetY;
                    if (tile !== 0) {
                        this.ctx.drawImage(this.tileAtlas, (tile + 3) * Map.tsize, 0, Map.tsize, Map.tsize, Math.round(x), Math.round(y), Map.tsize, Map.tsize);
                    }
                    else {
                        this.ctx.drawImage(this.tileAtlas, (tile) * Map.tsize, 0, Map.tsize, Map.tsize, Math.round(x), Math.round(y), Map.tsize, Map.tsize);
                    }
                }
            }
        };
        this._drawGrid = function () {
            var width = Map.cols * Map.tsize;
            var height = Map.rows * Map.tsize;
            var x, y;
            for (var r = 0; r < Map.rows; r++) {
                x = -this.camera.x;
                y = r * Map.tsize - this.camera.y;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(width, y);
                this.ctx.stroke();
            }
            for (var c = 0; c < Map.cols; c++) {
                x = c * Map.tsize - this.camera.x;
                y = -this.camera.y;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x, height);
                this.ctx.stroke();
            }
        };
        this.render = function () {
            this._drawLayer(0);
            this._drawLayer(1);
            this._drawGrid();
            this.ctx.drawImage(this.hero.image, this.hero.screenX - this.hero.width / 2, this.hero.screenY - this.hero.height / 2);
        };
    }
    Game.prototype.run = function (context) {
        var _this = this;
        Map.getMap().then(function (res) {
            Map.cols = res.map.length;
            Map.rows = res.map[0].length;
            console.log(Map.cols);
            Map.layers[0] = res.map.flat(2);
            Map.layers[1] = res.map.flat(2);
            console.log(Map.layers[1]);
            _this.ctx = context;
            _this._previousElapsed = 0;
            var p = _this.load();
            Promise.all(p).then(function (loaded) {
                this.init();
                window.requestAnimationFrame(this.tick);
            }.bind(_this));
        });
    };
    ;
    return Game;
}());
exports["default"] = Game;
//# sourceMappingURL=game.js.map