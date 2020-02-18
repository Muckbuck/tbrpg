const fs = require('fs');

class CAMap{
    
    width: number;
    height: number;
    map: number[][];
    
    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }


    protected generateInitialMap(){
        const map: number[][] = [];

        for(let x = 0; x < this.width; x++){
            let column = []
            for(let y = 0; y < this.height; y++){
                if(x === 0 || y === 0 || x === this.width - 1 || y === this.height -1){
                    column.push(1);
                }else{
                    column.push(Math.floor(Math.random() * 2));
                } 
            }   
            map.push(column);
        }
        
        this.map = map;
        this.printMapToFile();
    }

    protected printMapToFile(){
        for(let y: number = 0; y < this.height; y++){               
            fs.appendFile("./src/MapGeneration/map.txt",  this.map[y].join('') + '\n', function (err:any) {
                if (err) console.log(err);
            });
        }
    }

    // Iterate over each tile on the map, look at it's 8 closest neighbours, 
    // if at least 5 of them are walls(1), then the tile is a wall.
     
    protected iterateMap(){

        for(let y: number = 0; y < this.height; y++){
            for(let x: number = 0; x < this.width; x++){
                const rows: number[] = [y - 1, y, y + 1];
                const tiles: number[] = [x - 1, x, x + 1];
                const adjecantWalls = this.getAdjecantWalls(tiles,rows);
              
                if(adjecantWalls >= 5){
                    this.map[y][x] = 1;
                }else{
                    this.map[y][x] = 0;
                }
            }   
        }
    }

    protected getAdjecantWalls(tiles: number[], rows: number[]){
        let walls = 0;
        
        for(let i = 0; i < 3; i++){
            for(let x = 0; x < 3; x++){
                if(!this.map[rows[i]]){
                    walls += 3;
                }else if(this.map[rows[i]][tiles[x]] == 1){
                    walls += 1;
                }
            }
        }
        return walls;
    }

    public generateMapLayout(){
        this.generateInitialMap();

        for(let generation = 0; generation <= 5; generation++){
            this.iterateMap();
            this.printMapToFile();        
        }

        return this.map;
    }
}

module.exports = CAMap;