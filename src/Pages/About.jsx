import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>Welcome to our e-commerce platform! We are dedicated to providing high-quality products and exceptional shopping experiences to our customers.</p>
        </section>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>Our mission is to make quality products accessible to everyone while providing outstanding customer service and a seamless shopping experience.</p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us</h2>
          <ul className="features-list">
            <li>Wide range of quality products</li>
            <li>Competitive prices</li>
            <li>Fast and reliable shipping</li>
            <li>Excellent customer support</li>
            <li>Secure payment options</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;