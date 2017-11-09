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
        // NOTE: while loop currently has potential of placing bombs on top of existing bombs
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        board[randomRowIndex][randomColumnIndex] = 'B';

        numberOfBombsPlaced++;
    }
    return board;
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