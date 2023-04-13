function Square(posX,posY){
        //const posX=x;
        //const posY=y;
        const position = [posX,posY]
        const children = null;
        const level = 0 ;
        const previous = null;
        //const parent = null;
    return{position, children, level, previous}
    }
function Gameboard() {
        let positions=[];
        for(let i=0; i<8; i++){
            for(let j=0;j<8;j++){
                let newSquare = Square(i,j)
                //console.log(newSquare);
                positions.push(newSquare);
            }
        }
        return{positions}
    }


function Knight(starting_position_x, starting_position_y){
    let starting_position = Square(starting_position_x,starting_position_y);
    let current_position = starting_position;
    let possible_positions = calculate_possible_moves(current_position);
    let path = [starting_position];

    //calculates the possible moves
    function calculate_possible_moves(given_position){
        console.log("Calculating the possible moves for given position: "+ JSON.stringify(given_position))
        let possible_positions = [];
        let movement = [[-2,+1],[-1,+2],[+1,+2],[+2,+1],[-2,-1],[-1,-2],[+1,-2],[+2,-1]]
        for (let i=0;i<movement.length;i++){
            let newX = given_position.position[0] + movement[i][0];
            let newY = given_position.position[1] + movement[i][1];
            //let new_pos = [newX,newY];
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
        //console.log(given_position)
        console.log(`there are ${possible_positions.length} available from the current position`)
        return possible_positions.flat(1);
    }

    //will check that the move is allowed, updates the current position and then updates the set of possible moves and add the move made
    function move_piece_to(possibleX,possibleY){
        let arr = [possibleX,possibleY]
        let match_found = false
        for(let i=0;i<this.possible_positions.length;i++){
            if(JSON.stringify(arr) === JSON.stringify(this.possible_positions[i].position)){
                console.log("you can make that move!")
                match_found = true
                this.current_position = Square(possibleX,possibleY);
                this.possible_positions = calculate_possible_moves(this.current_position)
                //this.current_position.children=this.possible_positions;
                this.path = track_moves(this.current_position)
            }
        }
        if(match_found == false){
            console.log("That is an illegal move.")
        }
        return this.current_position;
    }
    
    //TODO track moves
    function track_moves(new_movement){
        path.push(new_movement)
        return path
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
                console.log("first node in visited")
                visited.set(counter, current_node)
                //breadth_first.push(current_node) //adds to the end of the array
            }
            else{
                if(find_index(visited,current_node)==-1){
                    //console.log(`breadth search does not contain end position yet`)
                    counter= counter+1;
                    console.log(counter)
                    visited.set(counter, current_node)
                    //breadth_first.push(current_node) //adds to the end of the array
                    //console.log(breadth_first.length)
                }
            }
            
            if(JSON.stringify(current_node.position)!=JSON.stringify(end.position)){
                if(current_node.children!=null){
                    for(let i = 0; i<current_node.children.length;i++){
                        //current_node.children[i].parent = current_node;
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
                parents.unshift(current)
            }
            console.log(parents)
            
            return parents;
        }

    //function height(){}

    // function depth_first_search(start = this.starting_position, end){
    //     const stack =[start];
    //     var depth_first = [];
    //     end.children = calculate_possible_moves(end)
    //     while(stack!=0){
    //         var current_node = stack.pop(); //removes from back of array
    //         current_node.children=calculate_possible_moves(current_node)
    //         if(current_node==start){
    //             console.log("first node in visited")
    //             depth_first.push(current_node) //adds to the end of the array
    //         }
    //         else{
    //             if(find_index(depth_first,end)==-1){
    //                 console.log(`breadth search does not contain end position yet`)
    //                 depth_first.push(current_node) //adds to the end of the array
    //                 console.log(depth_first.length)
    //             }
    //         }
            
    //         if(JSON.stringify(current_node.position)!=JSON.stringify(end.position)){
    //             if(current_node.children!=null){
    //                 for(let i = 0; i<current_node.children.length;i++){
    //                         stack.push(current_node.children[i])
    //                 }
    //             }
    //         }
    //         else{
    //             console.log(`FINISHED SEARCH AFTER ${depth_first.length} NODES`)
    //             return depth_first;
    //         }

    //     }
    // }

    return{starting_position, current_position, possible_positions, calculate_possible_moves, move_piece_to, breadth_first_search, find_index, get_path}
}




//testing
//const my_square = Square(4,4)
//console.log(my_square)
//const my_gameboard = new Gameboard();
//console.log(my_gameboard.positions)
const my_knight = Knight(4,4)
//console.log("current position of knight before movement: " + JSON.stringify(my_knight.current_position))
//console.log("possible positions from initial position:  "+ JSON.stringify(my_knight.possible_positions))

//my_knight.move_piece_to(3,6)
//console.log("current position of knight after move : " + JSON.stringify(my_knight.current_position))
//console.log("possible positions after move:  "+ JSON.stringify(my_knight.possible_positions))
// my_knight.move_piece_to(5,7)
// console.log("Knight's path thus far: " + JSON.stringify(my_knight.path))
// console.log("possible positions after move:  "+ JSON.stringify(my_knight.possible_positions))
// console.log("now lets try an illegal move")
// my_knight.move_piece_to(5,7) //illegal move
// console.log("Knight's path thus far: " + JSON.stringify(my_knight.path)) //notice there is not repeat
// my_knight.move_piece_to(7,7)
//console.log("Knight's path thus far: " + JSON.stringify(my_knight.path)) //notice nothing is added
//my_knight.move_piece_to(7,6)
//console.log("possible positions after move:  "+ JSON.stringify(my_knight.possible_positions))
//console.log("Knight's path thus far: " + JSON.stringify(my_knight.path[1])) 
const start = new Square(4,4)
const wild = new Square(7,7)
const mystery_position  =  new Square(3,6)
const end_position = new Square(7,6)
const depth_first_arr = my_knight.breadth_first_search(this.starting_position,end_position)
//console.log(my_knight.find_index(depth_first_arr, start))


// for(const [key,value] of depth_first_arr.entries()){
//     console.log(`${key} =  ${value.position}`)
// }
//console.log(my_knight.depth_first_search(this.starting_position,end_position))
my_knight.get_path(depth_first_arr)
