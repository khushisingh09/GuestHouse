import React, { useState } from "react";
import "./index.css";
import Navbar from '../navbar';

const HeroSection = () => {
  const [activeImage, setActiveImage] = useState("/images/vid-1.jpg");

  const handleImageChange = (src) => {
    setActiveImage(src);
  };

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default HeroSection;
