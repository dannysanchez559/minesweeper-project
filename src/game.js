// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`


// import board class
import {Board} from './board';

// game class
class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    
    //choose which tile to be flipped on board
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
        
    };
