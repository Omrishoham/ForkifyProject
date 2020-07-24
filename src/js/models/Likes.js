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
        return like;
    }

    deleteLike(id){
            const index = this.likes.findIndex(el=> el.id===id);//find index of the item's id, return index
            this.likes.splice(index,1);
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id===id)!== -1;//return true if there is a like to the item id we checkin
    }

    getNumLikes(){
        return this.likes.length;
    }




    }


    
