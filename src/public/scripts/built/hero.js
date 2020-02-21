"use strict";
exports.__esModule = true;
var SPEED = 256;
var loader_1 = require("./loader");
var Loader = new loader_1["default"]();
var Hero = (function () {
    function Hero(map, x, y, image) {
        this._collide = function (dirx, diry) {
            var row, col;
            var left = this.x - this.width / 2;
            var right = this.x + this.width / 2 - 1;
            var top = this.y - this.height / 2;
            var bottom = this.y + this.height / 2 - 1;
            var collision = this.map.isSolidTileAtXY(left, top) ||
                this.map.isSolidTileAtXY(right, top) ||
                this.map.isSolidTileAtXY(right, bottom) ||
                this.map.isSolidTileAtXY(left, bottom);
            if (!collision) {
                return;
            }
            if (diry > 0) {
                row = this.map.getRow(bottom);
                this.y = -this.height / 2 + this.map.getY(row);
            }
            else if (diry < 0) {
                row = this.map.getRow(top);
                this.y = this.height / 2 + this.map.getY(row + 1);
            }
            else if (dirx > 0) {
                col = this.map.getCol(right);
                this.x = -this.width / 2 + this.map.getX(col);
            }
            else if (dirx < 0) {
                col = this.map.getCol(left);
                this.x = this.width / 2 + this.map.getX(col + 1);
            }
        };
        this.move = function (delta, dirx, diry) {
            this.x += dirx * SPEED * delta;
            this.y += diry * SPEED * delta;
            this._collide(dirx, diry);
            var maxX = this.map.cols * this.map.tsize;
            var maxY = this.map.rows * this.map.tsize;
            this.x = Math.max(0, Math.min(this.x, maxX));
            this.y = Math.max(0, Math.min(this.y, maxY));
        };
        this.map = map;
        this.x = x;
        this.y = y;
        this.width = map.tsize;
        this.height = map.tsize;
        this.image = image;
    }
    return Hero;
}());
exports["default"] = Hero;
//# sourceMappingURL=hero.js.map