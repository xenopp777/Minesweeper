import { MSIO } from './IO.js';

export class MSLogic {
    // init game state

    constructor(config) {
        this.state = this.initGameState(config);
    }

    initGameState( { width, height, mineAmt } ) {
        const state = {
            mineAmt,
            minesLeft: mineAmt,
            isGameOver: false,
            tilesLeft: width * height,
            tiles: Array.from( { length: height }, () =>
                Array(width).fill(0)
            ),
            startTimer: undefined,
            timerInt: undefined, // interval
        };

        this.insertMines(state, mineAmt);

        return state;
    }

    insertMines(state, mineAmt) {
        const tileArr = state.tilesLeft;

        // assigns a mine to a random index of the tiles array object
        const i = new Set();
        while (i.size < mineAmt) {
            const index = Math.floor(Math.random() * tileArr);
            i.add(index);
        }

        // assigns the integer -1 to each index that represents a mine
        const width = state.tiles[0].length;
        for (const index of i) {
            const y = Math.floor(index / width);
            const x = index % width;

            state.tiles[y][x] = -1;
        }

        console.log(i);
    }

    

    static main() {
        const logic = new MSLogic({
            width: 9,
            height: 9,
            mineAmt: 10,
        });

        const io = new MSIO();
        io.createBoard(logic.state);

        console.log(logic);
    }
}
