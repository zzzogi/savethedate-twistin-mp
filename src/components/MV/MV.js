import "./MV.css";

const MV = () => {
  return (
    <section className="mv section" id="mv">
      <div className="container">
        <h2 className="section-title">Our Music Video</h2>
        <p className="section-subtitle">
          Một dự án âm nhạc đặc biệt - nơi tình yêu của chúng tôi được thể hiện
          qua giai điệu
        </p>

        <div className="mv-content">
          <div className="mv-card">
            {/* YouTube Video Embed - WITH WIDTH/HEIGHT */}
            <div className="video-wrapper">
              <iframe
                width="1521"
                height="561"
                src="https://www.youtube.com/embed/owTVVEp8Dg4?list=RDowTVVEp8Dg4"
                title="twistin&#39; - Summer Feeling"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="mv-info">
              <div className="mv-header">
                <div className="mv-badge">
                  <span className="badge-icon">🎵</span>
                  <span className="badge-text">Official Music Video</span>
                </div>
                <div className="mv-release-date">16.07.2025</div>
              </div>

              <h3 className="mv-title">Summer Feeling</h3>

              <div className="mv-credits">
                <div className="credit-item">
                  <span className="credit-icon">🎹</span>
                  <div className="credit-text">
                    <span className="credit-label">Music Producer</span>
                    <span className="credit-name">Chung Bảo</span>
                  </div>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">🎬</span>
                  <div className="credit-text">
                    <span className="credit-label">Featuring</span>
                    <span className="credit-name">Minh Phương</span>
                  </div>
                </div>
              </div>

              <p className="mv-description">
                Một bài hát về tình yêu mùa hè, về những kỷ niệm ngọt ngào bên
                nhau.
                <strong> "Summer Feeling"</strong> là món quà âm nhạc đặc biệt
                mà Bảo tặng cho Phương - nơi giai điệu của anh hòa quyện cùng nụ
                cười của em trong từng khung hình.
              </p>

              <div className="mv-tags">
                <span className="tag">Love Song</span>
                <span className="tag">Summer 2025</span>
                <span className="tag">Indie Pop</span>
                <span className="tag">Vietnamese Music</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MV;
