const fs = require('fs');

class CAMap{
    
    width: number;
    height: number;
    map: number[][];
    chanceToSpawnWall: number;
    
    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
        this.chanceToSpawnWall = 0.45;
    }


    protected generateInitialMap(){
        const map: number[][] = [];

        for(let y = 0; y < this.height; y++){
            let row = []
            for(let x = 0; x < this.width; x++){
                if(y === 0 || x === 0 || x === this.width - 1 || y === this.height -1){
                    row.push(1)
                }
                else{
                    if(Math.random() < this.chanceToSpawnWall){
                        row.push(1);
                    }else{
                        row.push(0);
                    }
                }
            }   
            map.push(row);
        }
        
        this.map = map;
    }

    protected printMap(){
        for(let y: number = 1; y < this.map.length; y++){               
            console.log(this.map[y].join(''))
        }
    }

    // Iterate over each tile on the map and 8 closest neighbours, 
    // if at least 5 of them are walls(1), then the tile is a wall.
     
    protected iterateMap(generation: number){

        for(let y: number = 0; y < this.map.length - 1; y++){
            for(let x: number = 0; x < this.map[y].length - 1; x++){
                const rows: number[] = [y - 1, y, y + 1];
                const tiles: number[] = [x - 1, x, x + 1];
                const adjecantWalls = this.getAdjecantWalls(rows, tiles);
         
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
        
        for(let i = 0; i <= 2; i++){
            for(let x = 0; x <= 2; x++){
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

        for(let generation: number = 0; generation <= 10; generation++){
            this.iterateMap(generation);       
        }

        this.printMap(); 
        return this.map;
    }
}

module.exports = CAMap;