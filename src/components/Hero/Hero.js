import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {/* Text positioned on LEFT side */}
        <div className="hero-text-left">
          <p className="hero-greeting">Trân trọng kính mời</p>
          <div className="hero-names">
            <h1 className="hero-title">
              <span className="name-bride">Chung Bảo</span>
              <span className="ampersand">&</span>
              <span className="name-groom">Minh Phương</span>
            </h1>
          </div>
          <p className="hero-date">30 - 11 - 2025</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
