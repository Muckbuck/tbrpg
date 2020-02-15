namespace Helpers{
    class Map {
        width: number;
        height: number;
        rooms: {[key: string]: number[][]}; 
        layout: number[][][][];
        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
            this.layout = [];
    
            if(this.width % 4 !== 0 || this.height % 4 !== 0 ){
                throw 'Width and height of the map needs to be evenly divisble by 4';
            }
                
            
            this.rooms = {
                0: [
                    [1, 0, 0 ,1],
                    [0, 0, 0 ,0],
                    [0, 0, 0 ,0],
                    [1, 1, 1 ,1]
                ],
                1: [
                    [1, 1, 1 ,1],
                    [0, 0, 0 ,0],
                    [0, 0, 0 ,0],
                    [1, 0, 0 ,1]
                ],
                2: [
                    [1, 0, 0 ,1],
                    [0, 0, 0 ,0],
                    [0, 0, 0 ,0],
                    [1, 0, 0 ,1]
                ],
                3: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
            }
        }

        AddNewRoom(room: number[][]){
            
        }

        MergeRoomsToRow(...rooms:[]){

        }
    
        public GenerateRandomLayout() {
            let previousRoom: number;
            let firstRoomInColumnn: number;
            const roomCompatability = {
                0: [1,2,3],
                1: [2,3],
                2: [1,3,4,5],
                3: [0,1,2,3]
            }
        
            for(let x = 0; x < this.width / 4; x++){
                let column: number[][][]=[];
                for(let y = 0; y < this.height / 4; y++){
                    
                    if(previousRoom === 0){
                        const room =  Math.floor(Math.random() * 2);

                        column.push(this.rooms[room]);
                    }
                    else if(x === 0){
                        const room =  xZeroValid[Math.floor(Math.random() * 2)];
                        column.push(this.rooms[room]);
                    }
                    else if(y === 0){
                        const room =  yZeroValid[Math.floor(Math.random() * 2)];
                        column.push(this.rooms[room]);
                    }
                    else {
                        const room =  Math.floor(Math.random() * 4);
                        column.push(this.rooms[room]);
                    }

                    
                }

                this.layout.push(column);
            }
            return this.layout;
        }
    }

    module.exports = Map;
}
