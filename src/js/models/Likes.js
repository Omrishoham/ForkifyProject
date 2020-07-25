export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id,title,author,img){
        const like = {
            id,
            title,
            author,
            img
        }
        this.likes.push(like);

        //persist data in local storage
        this.persistData();

        return like;
    }

    deleteLike(id){
            const index = this.likes.findIndex(el=> el.id===id);//find index of the item's id, return index
            this.likes.splice(index,1);

            //persist data in local storage
            this.persistData(); 
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id===id)!== -1;//return true if there is a like to the item id we checkin
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem("likes",JSON.stringify(this.likes));//makes it string to json file
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));//turn it from string(json file) to the previous data stracture, in this case array
        if(storage) this.likes = storage;//Restoring likes from the localStorage
    }



    }


    
