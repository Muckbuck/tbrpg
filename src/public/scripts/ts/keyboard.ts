//
// Keyboard handler
//

export default class Keyboard {

    LEFT = 37;
    RIGHT = 39;
    UP = 38;
    DOWN = 40;

    _keys = {};

    listenForEvents = function (keys:any) {
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));

        keys.forEach(function (key:any) {
            this._keys[key] = false;
        }.bind(this));
    }

    _onKeyDown = function (event:any) {
        var keyCode = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = true;
        }
    };

    _onKeyUp = function (event:any) {
        var keyCode:any = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = false;
        }
    };

    isDown = function (keyCode:any) {
        // if (!keyCode in this._keys) {
        //     throw new Error('Keycode ' + keyCode + ' is not being listened to');
        // }
        return this._keys[keyCode];
    };
}
