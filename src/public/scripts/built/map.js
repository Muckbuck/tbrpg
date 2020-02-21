"use strict";
exports.__esModule = true;
var Map = (function () {
    function Map() {
        this.getMap = function () {
            return fetch('http://localhost:3001/map?width=50&height=50')
                .then(function (response) {
                return response.json();
            })
                .then(function (myJson) {
                return myJson;
            });
        };
        this.getTile = function (layer, col, row) {
            return this.layers[layer][row * this.cols + col];
        };
        this.isSolidTileAtXY = function (x, y) {
            var col = Math.floor(x / this.tsize);
            var row = Math.floor(y / this.tsize);
            return this.layers.reduce(function (res, layer, index) {
                var tile = this.getTile(index, col, row);
                var isSolid = tile === 1;
                return res || isSolid;
            }.bind(this), false);
        };
        this.getCol = function (x) {
            return Math.floor(x / this.tsize);
        };
        this.getRow = function (y) {
            return Math.floor(y / this.tsize);
        };
        this.getX = function (col) {
            return col * this.tsize;
        };
        this.getY = function (row) {
            return row * this.tsize;
        };
        this.cols = 0;
        this.rows = 0;
        this.tsize = 64;
        this.layers = [[
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
                3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
                3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
            ], [
                4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
                4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
            ]];
    }
    return Map;
}());
exports["default"] = Map;
;
//# sourceMappingURL=map.js.map