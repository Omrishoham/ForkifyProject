import axios from 'axios';
import {proxy} from '../config'

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res  = await axios(`${proxy}https://recipesapi.herokuapp.com/api/get?rId=${this.id}`);
            console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(error){
            console.log(error);
            alert('something went wrong:(');
        }
    }
    calcTime(){
        //assuming that we need 15 min to 3 ingredients
        const numIng = this.ingredients.length;
        const periods  = Math.ceil(numIng/3);
        this.time = periods*15;
    }   
    calcServings(){
        this.servings = 4;
    }
    parseIngredients(){
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units = [...unitsShort,'kg','g'];
        //map looping tha array and save new value to the new array
        //we want to change this.ingredients to an array who includes objects(unit,count,ingredient) and not strings that descripte the ingredient
        const newIngredients = this.ingredients.map(element=>{
            //1)uniform units
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit,i)=>{
                ingredient = ingredient.replace(unit,unitsShort[i]);//if the ingredient has one of the unitsLong replace it to his version of unitsShort

            })
            //2)remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');//replace every parenthesis to space (regular expression)

            //3)parse ingredients into count,unit and ingredient
            const arrIng = ingredient.split(' ');//split to arr of the ingredient
            const unitIndex = arrIng.findIndex(element2=>units.includes(element2));//for each element of the array it checks if it one of the elements of units ,if yes return the index immediatley,if no return -1
            let objIngredient;
            if(unitIndex>-1){
                //there is unit
                //ex, 4 1/2 cups, arrCount = [4,1/2]
                //ex, 4 cups, arCount = [4]  
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1){
                    count=eval(arrIng[0].replace('-','+')).toFixed(2);// for cases like " 4-1/2 cups "
                }else{
                    count=eval(arrIng.slice(0,unitIndex).join('+')).toFixed(2); //calculates 4+1/2 and saves it to count variable
                }
                objIngredient = {
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join(' ')
                }
            }else if (parseInt(arrIng[0],10)){
                //there is not unit but 1st element is number
                objIngredient = {
                    count: 1,
                    unit: parseInt(arrIng[0],10),
                    ingredient : arrIng.slice(1).join(' ') //full ingredient name without the quantity
                }
            }else if(unitIndex === -1){
                //there is no unit and no number in first position of the ingredient
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient //es6 new feature
                }
            }
            return objIngredient;
        })
        this.ingredients = newIngredients;
    }
}