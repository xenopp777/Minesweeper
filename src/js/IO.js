import { MSLogic } from "./Logic";

/* -UI + I/O- */
export class MSIO {
    constructor(logic) {
        this.logic = logic;

        this.grid = document.getElementById('play-grid');
        this.minesLeft = document.getElementById('mines-left');
        this.reset = document.getElementById('reset');
        this.timer = document.getElementById('timer');
    }

    createBoard(view, state) {
        const height = state.tiles.length;
        const width = state.tiles[0].length;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const tile = document.createElement('div');

                tile.dataset.x = x;
                tile.dataset.y = y;

                this.grid.append(tile);
            }
        }
    }

    // for easy access of tile data
    // > converts tile data from { string } to { number }
    getTilePosition(tile) {
        return {
            x: Number(tile.dataset.x),
            y: Number(tile.dataset.y),
        };
    }

    initView(view, state) {
        this.reset.removeAttribute('class');
        this.minesLeft.innerText = `${state.minesLeft}`.padStart(3, '0');

        for (const tile of this.grid.children) {
            tile.innerText = '';
            tile.disabled = false;
            tile.classList.remove('disabled');
            tile.removeAttribute('class');
        }
    }

    restartGame(view, state) {
        clearInterval(state.timerInt);

        const newState = new MSLogic({
            width: state.tiles[0].length,
            height: state.tiles.length,
            mineAmt: state.mineAmt,
        }).state;

        Object.assign(state, newState);

        this.initView(view, state);
    }

    timerStart(view, state) {
        if (state.timerInt) {
            return;
        }

        state.startTimer = new Date();
        state.timerInt = setInterval(() => {
            const secondsElapsed = Math.floor(
                (new Date() - state.startTimer) / 1000 // ensures time stays synchronized
            );

            this.timer.innerText = `${secondsElapsed}`.padStart(3, '0');
        }, 1000);
    }

    handleGameEvents(view, state) {
        this.reset.addEventListener('click', () =>
        this.restartGame(view, state)
        );

        this.grid.addEventListener('contextmenu', (event) =>
            event.preventDefault()
        )

        this.grid.addEventListener('mousedown', (event) => {
        if (state.isGameOver) {
            return;
        }

        const tile = event.target;
        if (tile.tagName !== 'DIV') {
            return;
        }
        // test clicks | rm
        console.log(tile);

        this.timerStart(view, state);
        if (event.button === 2) {
            this.handleTileFlag(view, state, tile);
        } else {
            this.handleTilesReveal(view, state, tile);
        }
    });
    }

    handleTileFlag(view, state, tile) {
        if (tile.disabled) {
            return;
        }

        const isFlagged = tile.classList.toggle('flagged');

        state.minesLeft += isFlagged ? -1 : 1;
        this.minesLeft.innerText = `${state.minesLeft}`.padStart(3, '0');
    }

    handleTilesReveal(view, state, tile) {
        const { x, y } = this.getTilePosition(tile);

        if (tile.classList.contains('flagged')) {
            return;
        }

        switch (state.tiles[y][x]) {
            case -1:
                if (this.revealTiles(state, tile)) {
                    tile.classList.add('exploded');
                    this.reset.className = 'lost';
                    this.gameOver(view, state);
                }
                break;

            case 0:
                this.revealEmptyArea(this.grid, state, x, y);
                break;

            default:
                this.revealTiles(state, tile);
        }

        if (state.tilesLeft === 0) {
            this.reset.className = 'won';
            this.gameOver(view, state);
        }
    }

    revealTiles(state, tile) {
        if (tile.disabled) {
            return false;
        }

        tile.disabled = true;
        tile.classList.add('disabled');
        tile.classList.remove('flagged');

        const { x, y } = this.getTilePosition(tile);
        const value = state.tiles[y][x];

        switch (value) {
            case -1:
                tile.className = 'mine';
                break;

            case 0:
                state.tilesLeft--;
                break;

            default:
                tile.className = `value-${value}`;
                tile.innerText = value;
                state.tilesLeft--;
        }
        return true;
    }
    gameOver(view, state) {
        clearInterval(state.timerInt);
        state.isGameOver = true;

        for (const tile of this.grid.children) {
            const { x, y } = this.getTilePosition(tile);

            if (state.tiles[y][x] === -1) {
                this.revealTiles(state, tile);
            }
        }
    }

    revealEmptyArea(view, state, x, y) {
        const height = state.tiles.length;
        const width = state.tiles[0].length;

        const visited = new Set();

        const visit = (i, j) => {
            if (i < 0 || i >= width || j < 0 || j >= height) {
                return;
            }

            const index = j * width + i;
            if (visited.has(index)) {
                return;
            }

            visited.add(index);

            this.revealTiles(state, this.grid.children[index]);

            if (state.tiles[j][i] !== 0) {
                return;
            }

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++){
                    if (dx === 0 && dy === 0) continue;
                    visit(i + dx, j + dy);
                }
            }
        }

        visit(x, y);
    }

}