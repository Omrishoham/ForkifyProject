export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id,title,author,image){
        const like = {
            id,
            title,
            author,
            img
        }
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
            const index = this.likes.findIndex(el=> el.id===id);//find index of the item's id, return index
            this.items.splice(index,1);
    }

    isLikes(id){
        return this.likes.findIndex(el=>el.id===id)!== -1;//return true if there is a like to the item id we checkin
    }

    getNumLikes(){
        return this.likes.length;
    }




    }


    
