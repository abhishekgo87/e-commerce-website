import productList from "../data/productList";




function getCategories(){
    let set = new Set()

    for(let t of productList){
        set.add(t.category)
    }

    return [...set]
}

export default getCategories