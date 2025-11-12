import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaTruck, FaHeadset, FaTshirt, FaGem, FaLaptop, FaFemale } from 'react-icons/fa';

const Home = () => {
  const features = [
    { icon: <FaShoppingBag />, title: "Wide Selection", desc: "Browse through thousands of products" },
    { icon: <FaTruck />, title: "Fast Delivery", desc: "Get your items delivered quickly" },
    { icon: <FaHeadset />, title: "24/7 Support", desc: "Customer service around the clock" }
  ];

  const categories = [
    { name: "MEN'S CLOTHING", icon: <FaTshirt />, path: "/products/men's clothing" },
    { name: "JEWELERY", icon: <FaGem />, path: "/products/jewelery" },
    { name: "ELECTRONICS", icon: <FaLaptop />, path: "/products/electronics" },
    { name: "WOMEN'S CLOTHING", icon: <FaFemale />, path: "/products/women's clothing" }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="animate-slide-down">Welcome to ShopEase</h1>
        <p className="animate-fade-in">Discover amazing products at great prices</p>
        <Link to="/products" className="cta-button animate-bounce">
          Shop Now
        </Link>
      </div>

      <div className="categories-section">
        <h2>Shop By Category</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link 
              to={category.path} 
              key={index} 
              className="category-card animate-scale"
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <span className="explore-text">Explore →</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="features-section">
        {features.map((feature, index) => (
          <div key={index} className="feature-card animate-slide-up">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;