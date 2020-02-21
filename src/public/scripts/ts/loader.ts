//
// Asset loader
//

export default class Loader {

    images = {}

    loadImage = function (key:any, src:any) {
        var img = new Image();

        var d = new Promise(function (resolve:any, reject:any) {
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

    getImage = function (key:any) {
        return (key in this.images) ? this.images[key] : null;
    };
}