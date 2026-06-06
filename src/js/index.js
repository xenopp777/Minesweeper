/* A JavaScript remake of classic Minesweeper
Written by Zoie D, 5/30/26
 */

import { MSLogic } from './Logic.js';
import { MSIO } from './IO.js';
import { fetchQuote } from './QuotesApi.js';

/** gamemode difficulties currently dont work :(
 * api is there but inst assigned to anything on page
 */

/* -init- */
const logic = MSLogic.main();

document.addEventListener('DOMContentLoaded', () => {
    new MSIO( logic );
});