namespace MapGeneration{
    class TileMap{
        width: number;
        height: number;
        tileTypes: {[key: string]: number};
        constructor(width: number, height: number){
            this.width = width;
            this.tileTypes = {
                'wall': 1,
                'floor': 0
            }
        }

        getTileTypes(): {[key: string]: number}{
            return this.tileTypes;
        }
        
    } 

    module.exports = TileMap;
}