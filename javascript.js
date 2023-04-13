function Square(posX,posY){
        const position = [posX,posY]
        const children = null;
        const level = 0 ;
        const previous = null;
    return{position, children, level, previous}
    }

// function Gameboard() {
//         let positions=[];
//         for(let i=0; i<8; i++){
//             for(let j=0;j<8;j++){
//                 let newSquare = Square(i,j)
//                 //console.log(newSquare);
//                 positions.push(newSquare);
//             }
//         }
//         return{positions}
//     }


function Knight(starting_position_x, starting_position_y){
    let starting_position = Square(starting_position_x,starting_position_y);
    let current_position = starting_position;
    let possible_positions = calculate_possible_moves(current_position);

    //calculates the possible moves
    function calculate_possible_moves(given_position){
        //console.log("Calculating the possible moves for given position: "+ JSON.stringify(given_position))
        let possible_positions = [];
        let movement = [[-2,+1],[-1,+2],[+1,+2],[+2,+1],[-2,-1],[-1,-2],[+1,-2],[+2,-1]]
        for (let i=0;i<movement.length;i++){
            let newX = given_position.position[0] + movement[i][0];
            let newY = given_position.position[1] + movement[i][1];
            if(newX>-1 && newX<8){
                if(newY>-1 && newY<8){
                    var newSquare = Square(newX,newY)
                    newSquare.level = given_position.level + 1;
                    newSquare.previous = given_position.position;
                    possible_positions.push(newSquare)
                }
            }
        }
        given_position.children = possible_positions.flat(1);
        //console.log(`there are ${possible_positions.length} available from the current position`)
        return possible_positions.flat(1);
    }


    //make the possible moves into a tree
    //find the shortest path possible between a starting position and an ending position. 
    function breadth_first_search(start = this.starting_position, end){
        const queue =[start];
        const visited = new Map()
        var counter = 0;

        while(queue.length!=0){
            var current_node = queue.shift(); //removes from front of array
            current_node.children=calculate_possible_moves(current_node)
            if(current_node==start){
                //console.log("first node in visited")
                visited.set(counter, current_node) //adds to the end of the array
                 
            }
            else{
                if(find_index(visited,current_node)==-1){
                    //console.log(`breadth search does not contain end position yet`)
                    counter= counter+1;
                    //console.log(counter)
                    visited.set(counter, current_node)
                }
            }
            
            if(JSON.stringify(current_node.position)!=JSON.stringify(end.position)){
                if(current_node.children!=null){
                    for(let i = 0; i<current_node.children.length;i++){
                        
                        queue.push(current_node.children[i])
                    }
                }
            }
            else{
                console.log(`FINISHED SEARCH AFTER ${visited.size} NODES`)
                return visited;
            }
        }
    }

    function find_index(map, node_of_interest){
        let num =-1;
        for (const [key,value] of map.entries()){
            if(JSON.stringify(value.position) == JSON.stringify(node_of_interest.position)){
                num=key;
                }
        }
        return num;
    }

    function get_path(map){
        var index_of_interest = map.size-1;
        var last = map.get(index_of_interest)
        var current = last;
        var parents=[last];

        for(let i=last.level ; i>0; i--){
            parent_position = new Square(current.previous[0],current.previous[1])
            index_of_interest = find_index(map, parent_position);
            current=map.get(index_of_interest)
            parents.unshift(current) //adds to the front of the array
        }
        console.log(parents)
        
        return parents;
    }

    

    return{starting_position,
         current_position, 
         possible_positions, 
         calculate_possible_moves, 
        breadth_first_search, 
        find_index, 
        get_path}
}


function knightMoves(starting_position_arr,ending_position_arr){
    const my_knight =  Knight(starting_position_arr[0],starting_position_arr[1])
    const end_position = new Square(ending_position_arr[0],ending_position_arr[1])
    const depth_first_arr = my_knight.breadth_first_search(this.starting_position,end_position)
    const my_path = my_knight.get_path(depth_first_arr)
    console.log(`You made it in ${my_path.length-1} moves! Here is your path:`)
    for(let i=0;i<my_path.length;i++){
        console.log(JSON.stringify(my_path[i].position))
    }
}



//testing

start_arr=[4,4]
end_arr = [0,0]
knightMoves(start_arr,end_arr)