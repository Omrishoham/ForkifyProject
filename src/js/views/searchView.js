import { elements } from './base'
//here we export a function we will use to get the input the client write
export const getInput = () => elements.searchInput.value;//return the value

export const clearInput = () => {
    elements.searchInput.value = '';//(not returning with braces)
}

export const clearResults = ()=>{
    elements.searchResultList.innerHTML = '';//clear results
    elements.searchResultPages.innerHTML = '';//clear buttons
}

//make the recipe gray when we click it
export const highlightSelected = (id)=>{
    //select all elements with results__link and make them not active
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(element=>{
        element.classList.remove('results__link--active');
    })
    //select the element with a href=id and add the class="result__link-active"
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
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
        <a class="results__link" href="#${recipe.recipe_id}">
           <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
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

//func to create button
//type:'prev' or 'next'
const createButton = (page,type)=>`
<button class="btn-inline results__btn--${type}" data-goto=${type==="prev"?page-1:page+1}>
<span>Page ${type==="prev"?page-1:page+1}</span>
<svg class="search__icon">//to render the icon
 <use href="img/icons.svg#${type==="prev"?"icon-triangle-left":"icon-triangle-right"}"></use>
</svg>
</button>
`;

//private func we call in view to render the buttons
const renderButtons = (page,numResults,resPerPage)=>{
    const pages = Math.ceil(numResults/resPerPage);//circle up to an integer number
    let button;
    if(page===1 && pages>1){
       button = createButton(page,'next')
    }
    else if(page<pages){
        button = `
        ${createButton(page,'prev')}
        ${createButton(page,'next')}
        `;
    }
    else if(page===pages && pages>1){
        button = createButton(page,'prev');
    }

    elements.searchResultPages.insertAdjacentHTML('afterbegin',button);

};

//render 10 results every time we call the func, we can pass page and how much res per page
export const renderResults = (recipes,page=1,resPerPage=10) => {
    //render results of the current page
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;
    recipes.slice(start,end).forEach(recipe=>renderRecipe(recipe));
    //render pagination buttons
    renderButtons(page,recipes.length,resPerPage);
};




