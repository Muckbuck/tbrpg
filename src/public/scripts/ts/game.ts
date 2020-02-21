//
// Game object
//

const Keebs:any = {};

Keebs.LEFT = 37;
Keebs.RIGHT = 39;
Keebs.UP = 38;
Keebs.DOWN = 40;

import KeyboardClass from './keyboard';
import LoaderClass from './loader';
import CameraClass from './camera';
import HeroClass from './hero';
import MapClass from './map';
const Loader = new LoaderClass();
const Keyboard = new KeyboardClass();
const Map = new MapClass();

export default class Game {
    ctx: any;
    _previousElapsed: number;

    run (context:any) {
        Map.getMap().then((res) => {
            Map.cols = res.map.length;
            Map.rows = res.map[0].length;
            console.log(Map.cols)
            Map.layers[0] = res.map.flat(2);
            Map.layers[1] = res.map.flat(2);
            console.log(Map.layers[1])
            
            this.ctx = context;
            this._previousElapsed = 0;

            var p = this.load();
            Promise.all(p).then(function (loaded:any) {
                this.init();
                window.requestAnimationFrame(this.tick);
            }.bind(this));
        })
        
    };
    
    tick = (elapsed:any) => {
        window.requestAnimationFrame(this.tick.bind(this));
    
        // clear previous frame
        this.ctx.clearRect(0, 0, 512, 512);
    
        // compute delta time in seconds -- also cap it
        var delta:any = (elapsed - this._previousElapsed) / 1000.0;
        delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;
    
        this.update(delta);
        this.render();
    };

    load = function () {
        return [
            Loader.loadImage('tiles', '../assets/tiles.png'),
            Loader.loadImage('character', '../assets/character.png')
        ];
    };
    
    init = function () {
        
        Keyboard.listenForEvents(
            [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
        this.tileAtlas = Loader.getImage('tiles');
    
        this.hero = new HeroClass(Map, 160, 160, Loader.getImage('character'));
        this.camera = new CameraClass(Map, 512, 512);
        this.camera.follow(this.hero);
    };
    
    update = function (delta:any) {
        // handle hero movement with arrow keys
        var dirx = 0;
        var diry = 0;
        if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
        else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
        else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
        else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

        this.hero.move(delta, dirx, diry);
        this.camera.update();
    };
    
    _drawLayer = function (layer:any) {
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
                if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile + 3 ) * Map.tsize, // source x
                        0, // source y
                        Map.tsize, // source width
                        Map.tsize, // source height
                        Math.round(x),  // target x
                        Math.round(y), // target y
                        Map.tsize, // target width
                        Map.tsize // target height
                    );
                } else {
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile) * Map.tsize, // source x
                        0, // source y
                        Map.tsize, // source width
                        Map.tsize, // source height
                        Math.round(x),  // target x
                        Math.round(y), // target y
                        Map.tsize, // target width
                        Map.tsize // target height
                    );
                }
            }
        }
    };

    _drawGrid = function () {

        var width = Map.cols * Map.tsize;
        var height = Map.rows * Map.tsize;
        var x, y;
        for (var r = 0; r < Map.rows; r++) {
            x = - this.camera.x;
            y = r * Map.tsize - this.camera.y;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        for (var c = 0; c < Map.cols; c++) {
            x = c * Map.tsize - this.camera.x;
            y = - this.camera.y;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
    };
    
    render = function () {
        // draw map background layer
        this._drawLayer(0);

        

        // draw map top layer
        this._drawLayer(1);

        this._drawGrid();

        // draw main character
        this.ctx.drawImage(
            this.hero.image,
            this.hero.screenX - this.hero.width / 2,
            this.hero.screenY - this.hero.height / 2);
    };
}