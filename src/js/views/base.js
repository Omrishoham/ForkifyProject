export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResult:document.querySelector('.results'),
    searchResultList:document.querySelector('.results__list'),
    searchResultPages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe')

    //we cant pick an elements that didnt shawn in the beginning of the app

};

export const elementStrings={
    loader:"loader"
};


//spinner
export const renderLoader = (parent)=>{
    const loader = `
    <div class="${elementStrings.loader}">
    <svg>
    <use href="img/icons.svg#icon-cw"></use>
    </svg>
    </div>
    `;

    parent.insertAdjacentHTML('afterbegin',loader);

};


export const clearLoader = ()=>{
    const loader = document.querySelector(`.${elementStrings.loader}`);//we put here beacuse we cant select loader before it not yet exist 
    if(loader){
        loader.parentElement.removeChild(loader)//we want to remove the loader div so we access to is parent ,use removechild and pass into "loader"
   }
};