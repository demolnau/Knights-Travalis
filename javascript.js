function Square(x,y){
        const posX=x;
        const posY=y;
        const position = [posX,posY]
    return{posX,posY,position}
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
            let newX = given_position.posX + movement[i][0];
            let newY = given_position.posY + movement[i][1];
            //let new_pos = [newX,newY];
            possible_positions.push(Square(newX,newY))
        }
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


    return{starting_position, current_position, possible_positions, calculate_possible_moves, move_piece_to}
}
//testing
//const my_square = Square(4,4)
//console.log(my_square)
//const my_gameboard = new Gameboard();
//console.log(my_gameboard.positions)
const my_knight = Knight(4,4)
//console.log("current position of knight before movement: " + JSON.stringify(my_knight.current_position))
//console.log("possible positions from initial position:  "+ JSON.stringify(my_knight.possible_positions))

my_knight.move_piece_to(3,6)

//console.log("current position of knight after move : " + JSON.stringify(my_knight.current_position))
// console.log("possible positions after move:  "+ JSON.stringify(my_knight.possible_positions))
 my_knight.move_piece_to(5,7)
// console.log("Knight's path thus far: " + JSON.stringify(my_knight.path))
// console.log("possible positions after move:  "+ JSON.stringify(my_knight.possible_positions))
// console.log("now lets try an illegal move")
// my_knight.move_piece_to(5,7) //illegal move
// console.log("Knight's path thus far: " + JSON.stringify(my_knight.path)) //notice there is not repeat
// my_knight.move_piece_to(7,7)
//console.log("Knight's path thus far: " + JSON.stringify(my_knight.path)) //notice nothing is added
//my_knight.move_piece_to(3,8)
 console.log("Knight's path thus far: " + JSON.stringify(my_knight.path)) 