import { elements } from './base'
//here we export a function we will use to get the input the client write
export const getInput = () => elements.searchInput.value;//return the value

export const clearInput = () => {
    elements.searchInput.value = '';//(not returning with braces)
}

export const clearResults = ()=>{
    elements.searchResultList.innerHTML = '';
}

const limitRecipeTitle = (title,limit=17)=>{
    const newTitle = [];
    if(title.length>limit){
        title.split(' ').reduce((sum,cur)=>{//reduce func executes a reducer func that we provide on each arrays element
            if(sum+cur.length<=limit){
                newTitle.push(cur);
            }
            return sum+cur.length;

        },0);
        //return the result
        return `${newTitle.join(' ')}...`;//join is opposite of split,returning the newtitle into title
    }
    return title;

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
               <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
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




