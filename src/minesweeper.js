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
        // NOTE: while loop currently has potential of placing bombs on top of existing bombs
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        
        board[randomRowIndex][randomColumnIndex] = 'B';
        
        numberOfBombsPlaced++;
    }
    return board;
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