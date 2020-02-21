"use strict";
exports.__esModule = true;
var Keyboard = (function () {
    function Keyboard() {
        this.LEFT = 37;
        this.RIGHT = 39;
        this.UP = 38;
        this.DOWN = 40;
        this._keys = {};
        this.listenForEvents = function (keys) {
            document.addEventListener('keydown', this._onKeyDown.bind(this));
            document.addEventListener('keyup', this._onKeyUp.bind(this));
            keys.forEach(function (key) {
                this._keys[key] = false;
            }.bind(this));
        };
        this._onKeyDown = function (event) {
            var keyCode = event.keyCode;
            if (keyCode in this._keys) {
                event.preventDefault();
                this._keys[keyCode] = true;
            }
        };
        this._onKeyUp = function (event) {
            var keyCode = event.keyCode;
            if (keyCode in this._keys) {
                event.preventDefault();
                this._keys[keyCode] = false;
            }
        };
        this.isDown = function (keyCode) {
            return this._keys[keyCode];
        };
    }
    return Keyboard;
}());
exports["default"] = Keyboard;
//# sourceMappingURL=keyboard.js.map