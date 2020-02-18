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
                column.push(Math.floor(Math.random() * 2));
            }   
            map.push(column);
        }
        
        this.map = map;
        this.printMapToFile();
    }

    protected printMapToFile(){
        for(let y: number = 0; y < this.height; y++){               
            fs.appendFile("./src/MapGeneration/test.txt",  this.map[y].join('') + '\n', function (err:any) {
                if (err) console.log(err);
            });
        }
    }

    protected iterateMap(){

        for(let y: number = 0; y < this.height; y++){
            for(let x: number = 0; x < this.width; x++){
                const rows: number[] = [y-1, y, y + 1];
                
                const tiles: number[] = [x-1, x, x + 1];
                const numberOfWalls = this.getAdjecantWalls(tiles,rows);
                console.log(numberOfWalls);
                if(numberOfWalls >= 5){
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

        for(let generation = 0; generation <= 5; generation++){
            this.iterateMap();
            this.printMapToFile();

        
        }

        console.log(JSON.stringify(this.map));

        
       
        

        return this.map;
    }

}

module.exports = CAMap;


