// dynamically creates player game board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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

};


// dynamically create a bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};

// once tile is 'clicked' function will return number of adjacent bombs
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
    ];
    
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    // store the num of adj bombs near flipped tile
    let numberOfBombs = 0;
    
    // check for bomb, check all neighbor tiles, increment bomb counter
    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        
        // check if neighboring tiles are valid
        if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
           
            // check if bombBoard has a 'B' at neighbor row and column indices
            if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                // if true, increment number of bombs
                numberOfBombs++;
            }
           }
    });
    return numberOfBombs;
};

// allow user to flip a tile 
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    // check if tile is not empty
    if(playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    }
    // check if there is a bomb on tile, using bombBoard, if there is, update playerboard
    else if(bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    }
    // update tile with neighbor bombs number
    else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};

// join each column with |, and each row with new line '\n'
const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Players Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);