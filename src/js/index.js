//this is our controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader,clearLoader } from './views/base';

/*Global state of the app
*-Search object
*-Current recipe object
*-Shopping list object
*-Like recipes
(this object is global and we can change him from the functions)
*/
const state = {}; 

/*
SEARCH CONTROLLER
*/

//function that we call when event submit on search form
//remember: async function returns a promise
//remember:if we wanna use await we need to make the func async
const controlSearch = async ()=>{
    //1) get query from view
    const query = searchView.getInput(); 
    if(query){
        try{
        //New search object and add to state
        state.search = new Search(query);
        //prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        //search for recipes
        await state.search.getResults();

        //render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        }
        catch(error){
            alert('something went wrong with the search..');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit',event=>{
    event.preventDefault();
    controlSearch();
});

//the click is on the div who have more than 1 button sometimes so we pass into the event
elements.searchResultPages.addEventListener('click',(event)=>{
    const btn = event.target.closest('.btn-inline');//closest; gives us the specific element we looking for(button with btn-inline class) who nearly clicked on
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);//get the number page the user want to go to
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
});


/*
RECIPE CONTROLLER
*/
const controlRecipe = async ()=>{
    //Get the id from url without hash
    const id = window.location.hash.replace('#','');

    if(id){
        try{
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Create new Recipe object
        state.recipe = new Recipe(id);

        //Get recipe data
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        console.log(state.recipe);

        //Calc servings and time
        state.recipe.calcServings(); 
        state.recipe.calcTime();

        //Render the recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);


        }
        catch(error){
            alert('error in processing recipe!');
        }
    }
};

//adding 2 same event listeners
//1.when we have a hashchang we call controlRecipe that render the specific recipe with the id from the hash
//2.if user load a page we also call controlRecipe
['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));//if we call func in add event listener we dont use parenthesis

