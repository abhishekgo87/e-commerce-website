import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CategoryLayout from '../Components/CategoryLayout';
import getCategories from '../Components/productsCategory';

const Products = ({ setCartList, cartList }) => {
  const { category } = useParams();
  const categoriesArr = getCategories();

  return (
    <div className="products-page">
      <div className="category-filters">
        <Link 
          to="/products"
          className={`category-filter ${!category ? 'active' : ''}`}
        >
          ALL
        </Link>
        {categoriesArr.map((cat, index) => (
          <Link 
            key={index}
            to={`/products/${encodeURIComponent(cat)}`}
            className={`category-filter ${cat === decodeURIComponent(category) ? 'active' : ''}`}
          >
            {cat.toUpperCase()}
          </Link>
        ))}
      </div>

      {(category ? [decodeURIComponent(category)] : categoriesArr).map((value, index) => (
        <CategoryLayout
          key={index}
          category={value}
          setCartList={setCartList}
          cartList={cartList}
        />
      ))}
    </div>
  );
};

export default Products;