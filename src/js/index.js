/* A JavaScript remake of classic Minesweeper
Written by Zoie D, 5/30/26
 */

/** index
 * logic
 * ui
 * 'api' = apiUsed
 */

import { MSLogic } from './Logic.js';
import { MSIO } from './IO.js';
import { fetchQuote } from './QuotesApi.js';

/* -init- */
const logic = MSLogic.main();

document.addEventListener('DOMContentLoaded', () => {
    new MSIO( logic );
});