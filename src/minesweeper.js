// game class
class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    
    //
    playMove(rowIndex, columnIndex) {
        // flip tiles first
        this._board.flipTile(rowIndex, columnIndex);
        
        // if flipped tile has a bomb, game is over
        if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Game is Over!');
            this._board.print();
        }
        
        if(!this._board.hasSafeTiles){
                console.log('You have won!');
            }
            else {
                console.log('Current Board: ');
                this._board.print();
            }
        }
        
    }


// board class
class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    
    get playerBoard() {
        return this._playerBoard;
    }
    
    // allow user to flip a tile 
  flipTile(rowIndex, columnIndex){
    // check if tile is not empty
    if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    }
    // check if there is a bomb on tile, using bombBoard, if there is, update playerboard
    else if(this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    // update tile with neighbor bombs number
    else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
      this._numberOfTiles--;
}
  
  // once tile is 'clicked' function will return number of adjacent bombs
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
   // combinations of neighbor bomb array indexes from 'clicked' tile
    const neighborOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [-1, 1],
        [1, 0],
        [1, 1]
    ]

    
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    // store the num of adj bombs near flipped tile
    let numberOfBombs = 0;
    
    // check for bomb, check all neighbor tiles, increment bomb counter
    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        
        // check if neighboring tiles are valid
        if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
           
            // check if bombBoard has a 'B' at neighbor row and column indices
            if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                // if true, increment number of bombs
                numberOfBombs++;
            }
           }
    });
    return numberOfBombs;
}

// user wins when there are no safe tiles left
hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
}

// join each column with |, and each row with new line '\n'
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
}

// dynamically creates player game board
 static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    
    // iterate through number of rows
    for(let i = 0; i < numberOfRows; i++) {
        let row = [];
        
        // iterate through number of columns
        for(let j = 0; j < numberOfColumns; j++) {
        // push empty spaces into row
          row.push(' ');
      }
        // push rows into board
        board.push(row);
    }
    return board;

}

// dynamically create a bomb board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
      let board = [];
    
    // iterate through number of rows
    for(let i = 0; i < numberOfRows; i++) {
        let row = [];
        
        // iterate through number of columns
        for(let j = 0; j < numberOfColumns; j++) {
        // push empty spaces into row
          row.push(null);
      }
        // push rows into board
        board.push(row);
    }
    
    let numberOfBombsPlaced = 0;
    
    // create number of bombs till number is reached
    while(numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        
        if(board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;       
           }

    }
    return board;
}
}



// instantiate a new Game with 3x3 board, and 3 bombs
const g = new Game(3, 3, 3);
// play a move on g, with coordinates of your choice
g.playMove(0,1);
g.playMove(1,1);