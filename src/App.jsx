import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import CartPage from "./Pages/Cart";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ScrollToTop from "./Pages/ScrollTOTop";


const App = () => {
  const [cartList, setCartList] = useState([]);

  return (
    <Router>
     <ScrollToTop />
      <div className="container">
        <Navbar cartItemCount={cartList.length} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products cartList={cartList} setCartList={setCartList} />} />
            <Route path="/products/:category" element={<Products cartList={cartList} setCartList={setCartList} />} />
            <Route path="/cart" element={<CartPage cartList={cartList} setCartList={setCartList} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;



// inspiration =? https://github.com/proabhishek/js-ecommerce-test-question

