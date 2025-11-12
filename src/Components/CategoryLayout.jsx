import React from 'react';
import productList from '../data/productList';

import ProductCard from './ProductCard';


const CategoryLayout=({category, setCartList, cartList})=>{

      let products = productList.filter(value => value.category === category);


    return(
        <div className="category-layout">
            <h1> {category.toUpperCase()}</h1>
            <div className='product-list'>
              {
                   products.map(value =>(
                         <ProductCard  
                            key={value.id}
                            product = {value}
                            setCartList = {setCartList}
                            cartList = {cartList}
                           
                         />
                     ))

                  
              }
              </div>
        </div>
    )
}

export default CategoryLayout