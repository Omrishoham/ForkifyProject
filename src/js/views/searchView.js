import { elements } from './base'
//here we export a function we will use to get the input the client write
export const getInput = () => elements.searchInput.value;//return the value

export const clearInput = () => {
    elements.searchInput.value = '';//(not returning with braces)
}

export const clearResults = ()=>{
    elements.searchResultList.innerHTML = '';
}
//this function will render the recipe where it needs to be in the html code
const renderRecipe = (recipe)=>{
    const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
           <figure class="results__fig">
              <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class"results__data">
               <h4 class="results__name">${recipe.title}</h4>
               <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>           
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);//a func that insert the html code exactly where we want with the specific location
};

export const renderResults = (recipes) => {
    recipes.forEach(recipe=>renderRecipe(recipe));
};




