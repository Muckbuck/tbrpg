const SPEED = 256; // pixels per second
import LoaderClass from './loader';
const Loader = new LoaderClass();

export default class Hero {
    map: any;
    x: any;
    y: any;
    width: any;
    height: any;
    image: any;
    constructor(map:any, x:any, y:any, image: any) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.width = map.tsize;
        this.height = map.tsize;

        this.image = image;
    }
    

    _collide = function (dirx:any, diry:any) {
        var row, col;
        // -1 in right and bottom is because image ranges from 0..63
        // and not up to 64
        var left = this.x - this.width / 2;
        var right = this.x + this.width / 2 - 1;
        var top = this.y - this.height / 2;
        var bottom = this.y + this.height / 2 - 1;
    
        // check for collisions on sprite sides
        var collision =
            this.map.isSolidTileAtXY(left, top) ||
            this.map.isSolidTileAtXY(right, top) ||
            this.map.isSolidTileAtXY(right, bottom) ||
            this.map.isSolidTileAtXY(left, bottom);
        if (!collision) { return; }
    
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

    move = function (delta:any, dirx:any, diry:any) {
        // move hero
        this.x += dirx * SPEED * delta;
        this.y += diry * SPEED * delta;
    
        // check if we walked into a non-walkable tile
        this._collide(dirx, diry);
    
        // clamp values
        var maxX = this.map.cols * this.map.tsize;
        var maxY = this.map.rows * this.map.tsize;
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    };
}