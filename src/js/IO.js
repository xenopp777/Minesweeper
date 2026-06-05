/* -UI + I/O- */
export class MSIO {
    constructor() {}

    createBoard(state) {
        const height = state.tiles.length;
        const width = state.tiles[0].length;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const tile = document.createElement('div');

                tile.dataset.x = x;
                tile.dataset.y = y;

                document.getElementById('play-grid').append(tile);
            }
        }
    }

}