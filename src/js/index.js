/* A JavaScript remake of classic Minesweeper
Written by Zoie D, 5/30/26
 */

import { MSLogic } from './Logic.js';

/** gamemode difficulties currently dont work :(
 * api is there but inst assigned to anything on page
 */

/* -init- */

document.addEventListener('DOMContentLoaded', () => {
    MSLogic.main();
});