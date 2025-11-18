import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {/* Text positioned on LEFT side */}
        <div className="hero-text-left">
          <p className="hero-greeting">
            Trân trọng kính mời tới dự lễ cưới của
          </p>
          <div className="hero-names">
            <h1 className="hero-title">
              <span className="name-bride">Nhà Trai</span>
              <span className="ampersand">&</span>
              <span className="name-groom">Nhà Gái</span>
            </h1>
          </div>
          <p className="hero-date">30 - 11 - 2025</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
