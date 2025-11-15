import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-names">
          <h1 className="hero-title">
            <span className="name-bride">Chung Bảo</span>
            <span className="ampersand">&</span>
            <span className="name-groom">Minh Phương</span>
          </h1>
        </div>

        <div className="hero-subtitle">
          <p>Trân trọng kính mời</p>
          <p className="hero-date">30 - 11 - 2025</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
