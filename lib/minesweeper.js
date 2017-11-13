'use strict';

// dynamically creates player game board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
    var board = [];

    // iterate through number of rows
    for (var i = 0; i < numberOfRows; i++) {
        var row = [];

        // iterate through number of columns
        for (var j = 0; j < numberOfColumns; j++) {
            // push empty spaces into row
            row.push(' ');
        }
        // push rows into board
        board.push(row);
    }
    return board;
};

// dynamically create a bomb board
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    var board = [];

    // iterate through number of rows
    for (var i = 0; i < numberOfRows; i++) {
        var row = [];

        // iterate through number of columns
        for (var j = 0; j < numberOfColumns; j++) {
            // push empty spaces into row
            row.push(null);
        }
        // push rows into board
        board.push(row);
    }

    var numberOfBombsPlaced = 0;

    // create number of bombs till number is reached
    while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }
    return board;
};

// once tile is 'clicked' function will return number of adjacent bombs
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
    // combinations of neighbor bomb array indexes from 'clicked' tile
    var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [-1, 1], [1, 0], [1, 1]];

    var numberOfRows = bombBoard.length;
    var numberOfColumns = bombBoard[0].length;
    // store the num of adj bombs near flipped tile
    var numberOfBombs = 0;

    // check for bomb, check all neighbor tiles, increment bomb counter
    neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];

        // check if neighboring tiles are valid
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {

            // check if bombBoard has a 'B' at neighbor row and column indices
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                // if true, increment number of bombs
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
};

// allow user to flip a tile 
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
    // check if tile is not empty
    if (playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    }
    // check if there is a bomb on tile, using bombBoard, if there is, update playerboard
    else if (bombBoard[rowIndex][columnIndex] === 'B') {
            playerBoard[rowIndex][columnIndex] = 'B';
        }
        // update tile with neighbor bombs number
        else {
                playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
            }
};

// join each column with |, and each row with new line '\n'
var printBoard = function printBoard(board) {
    console.log(board.map(function (row) {
        return row.join(' | ');
    }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Players Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);