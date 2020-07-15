import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem(count,unit,ingredient){
        const item = {
            id: uniqid(),
            count,//same as this.count = count
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el=> el.id===id);//find index of the item's id, return index
        /*Dieffrence between splice and slice
        [2,4,8].splice(1,2) => return [4,8] (includes end!), original array [2] (changing him!), second int is number of numbers we want to delete from start
        [2,4,8].slice(1,2) => return [4](not includes end), original array [2,4,8] (not changing him!), second int is end index
        */
        this.items.splice(index,1);
    }

    updateCount(id,newCount){
        this.items.find(el=>el.id===id).count = newCount;//find-finding the element with the same id and return the element himself!
    }


}