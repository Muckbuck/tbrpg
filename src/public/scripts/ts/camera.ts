const SPEED = 256; // pixels per second

export default class Camera {
    x: number;
    y: number;
    width: any;
    height: any;
    maxX: number;
    maxY: number;
    constructor(map:any, width:any, height:any) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.maxX = map.cols * map.tsize - width;
        this.maxY = map.rows * map.tsize - height;
    }
    
    move = function (delta:any, dirx:any, diry:any) {
        // move camera
        this.x += dirx * SPEED * delta;
        this.y += diry * SPEED * delta;
        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    };

    follow = function (sprite:any) {
        this.following = sprite;
        sprite.screenX = 0;
        sprite.screenY = 0;
    };

    update = function () {
        // assume followed sprite should be placed at the center of the screen
        // whenever possible
        this.following.screenX = this.width / 2;
        this.following.screenY = this.height / 2;
    
        // make the camera follow the sprite
        this.x = this.following.x - this.width / 2;
        this.y = this.following.y - this.height / 2;
        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    
        // in map corners, the sprite cannot be placed in the center of the screen
        // and we have to change its screen coordinates
    
        // left and right sides
        if (this.following.x < this.width / 2 ||
            this.following.x > this.maxX + this.width / 2) {
            this.following.screenX = this.following.x - this.x;
        }
        // top and bottom sides
        if (this.following.y < this.height / 2 ||
            this.following.y > this.maxY + this.height / 2) {
            this.following.screenY = this.following.y - this.y;
        }
    };
}