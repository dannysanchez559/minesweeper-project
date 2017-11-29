'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// game class
var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    //


    _createClass(Game, [{
        key: 'playMove',
        value: function playMove(rowIndex, columnIndex) {
            // flip tiles first
            this._board.flipTile(rowIndex, columnIndex);

            // if flipped tile has a bomb, game is over
            if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
                console.log('Game is Over!');
                this._board.print();
            }

            if (!this._board.hasSafeTiles) {
                console.log('You have won!');
            } else {
                console.log('Current Board: ');
                this._board.print();
            }
        }
    }]);

    return Game;
}();

// board class


var Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',


        // allow user to flip a tile 
        value: function flipTile(rowIndex, columnIndex) {
            // check if tile is not empty
            if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
                console.log('This tile has already been flipped!');
                return;
            }
            // check if there is a bomb on tile, using bombBoard, if there is, update playerboard
            else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
                    this._playerBoard[rowIndex][columnIndex] = 'B';
                }
                // update tile with neighbor bombs number
                else {
                        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
                    }
            this._numberOfTiles--;
        }

        // once tile is 'clicked' function will return number of adjacent bombs

    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            // combinations of neighbor bomb array indexes from 'clicked' tile
            var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [-1, 1], [1, 0], [1, 1]];

            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            // store the num of adj bombs near flipped tile
            var numberOfBombs = 0;

            // check for bomb, check all neighbor tiles, increment bomb counter
            neighborOffsets.forEach(function (offset) {
                var neighborRowIndex = rowIndex + offset[0];
                var neighborColumnIndex = columnIndex + offset[1];

                // check if neighboring tiles are valid
                if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {

                    // check if bombBoard has a 'B' at neighbor row and column indices
                    if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                        // if true, increment number of bombs
                        numberOfBombs++;
                    }
                }
            });
            return numberOfBombs;
        }

        // user wins when there are no safe tiles left

    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles !== this._numberOfBombs;
        }

        // join each column with |, and each row with new line '\n'

    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }

        // dynamically creates player game board

    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
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
        }

        // dynamically create a bomb board

    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
        }
    }]);

    return Board;
}();

// instantiate a new Game with 3x3 board, and 3 bombs


var g = new Game(3, 3, 3);
// play a move on g, with coordinates of your choice
g.playMove(0, 1);
g.playMove(1, 1);