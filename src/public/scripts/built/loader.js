"use strict";
exports.__esModule = true;
var Loader = (function () {
    function Loader() {
        this.images = {};
        this.loadImage = function (key, src) {
            var img = new Image();
            var d = new Promise(function (resolve, reject) {
                img.onload = function () {
                    this.images[key] = img;
                    resolve(img);
                }.bind(this);
                img.onerror = function () {
                    reject('Could not load image: ' + src);
                };
            }.bind(this));
            img.src = src;
            return d;
        };
        this.getImage = function (key) {
            return (key in this.images) ? this.images[key] : null;
        };
    }
    return Loader;
}());
exports["default"] = Loader;
//# sourceMappingURL=loader.js.map