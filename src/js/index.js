//this is our controller
import Search from './models/Search'

/*Global state of the app
*-Search object
*-Current recipe object
*-Shopping list object
*-Like recipes
*/


const state = {}; 
const search = new Search('chicken');
search.getResults();

