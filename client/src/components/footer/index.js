import React, { useState } from "react";
import "./index.css";
// import Navbar from '../navbar';

const HeroSection = () => {
  const [activeImage, setActiveImage] = useState("/images/vid-1.jpg");

  const handleImageChange = (src) => {
    setActiveImage(src);
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="hero" id="home">
        <div className="overlay"></div>
        <div className="content">
          <h1>CIMFR Guesthouse</h1>
          <p>Located at the heart of Dhanbad, JH</p>
          <p>
            The Guesthouse has spacious parking. If you are looking for peace
            and tranquility, CIMFR guest house is for you.
          </p>
          <button className="btn">Discover More</button>
        </div>

        <div className="controls">
          <span
            className={`vid-btn ${
              activeImage === "/images/vid-1.jpg" ? "active" : ""
            }`}
            onClick={() => handleImageChange("/images/vid-1.jpg")}
          ></span>
          <span
            className={`vid-btn ${
              activeImage === "/images/vid-5.jpg" ? "active" : ""
            }`}
            onClick={() => handleImageChange("/images/vid-5.jpg")}
          ></span>
          <span
            className={`vid-btn ${
              activeImage === "/images/vid-4.jpg" ? "active" : ""
            }`}
            onClick={() => handleImageChange("/images/vid-4.jpg")}
          ></span>
        </div>

        <div className="image-container">
          <img src={activeImage} alt="Slider" className="active-image" />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/path/to/logo.png" alt="Logo" />
          </div>
          <div className="footer-section feedback">
            <h4>Provide us your feedback</h4>
          </div>
          <div className="footer-section quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#rooms">Rooms</a></li>
            </ul>
          </div>
          <div className="footer-section services">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#catering">Catering Services</a></li>
              <li><a href="#conference">Conference Room</a></li>
            </ul>
          </div>
          <div className="footer-section location">
            <h4>Location</h4>
            <img src="/path/to/location-map.png" alt="Location Map" />
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright 2024 | All Rights Reserved by CIMFR</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="far fa-envelope"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HeroSection;
