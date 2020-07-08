//this is our controller
import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/base'

/*Global state of the app
*-Search object
*-Current recipe object
*-Shopping list object
*-Like recipes
(this object is global and we can change him from the functions)
*/
const state = {}; 

//function that we call when event submit on search form
//remember: async function returns a promise
//remember:if we wanna use await we need to make the func async
const controlSearch = async ()=>{
    //1) get query from view
    const query = searchView.getInput(); 
    if(query){
        //2)New search object and add to state
        state.search = new Search(query);
        //3)prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        //4)search for recipes
        await state.search.getResults();

        //5)render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit',event=>{
    event.preventDefault();
    controlSearch();
});

search.getResults();

