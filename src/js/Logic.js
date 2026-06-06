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

        // assigns a mine to a random index of the Set array object
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
            this.countNeighborMines(state, x, y);
        }

        console.log(i);
    }

    countNeighborMines(state, mineX, mineY) {
    const height = state.tiles.length;
    const width = state.tiles[0].length;

    const startX = Math.max(0, mineX - 1);
    const startY = Math.max(0, mineY - 1);
    const endX = Math.min(width - 1, mineX + 1);
    const endY = Math.min(height - 1, mineY + 1);

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (state.tiles[y][x] !== -1) {
                    state.tiles[y][x]++;
                }
            }
        }
    }

    static main() {
        const logic = new MSLogic({
            width: 9,
            height: 9,
            mineAmt: 10,
        });

        const io = new MSIO(logic);
        io.createBoard(io, logic.state);
        io.initView(io, logic.state);
        io.handleGameEvents(io, logic.state);

        console.log(logic);
    }
}
