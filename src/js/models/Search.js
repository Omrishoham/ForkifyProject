import axios from 'axios';//to make api requests with use of axios

export default class Search{//if we wanna use this class in other classes like controller,view we need to export and import in the other side
constructor(query){
    this.query = query;
}
async getResults(){    //dont needed a key for this api, parameters needed: q,page(if you want more than a 30 recipes we can pass pages,we dont use this parameter).
    const proxy = 'https://cors-anywhere.herokuapp.com/';//to cross the domain error
    try{
    const res = await axios(`${proxy}https://recipesapi.herokuapp.com/api/search?q=${this.query}`);   //we dont use fetch because its not recognize by many browsers
    this.result = res.data.recipes;
    }
    catch(error){
        alert(error);
    }
    }
}








