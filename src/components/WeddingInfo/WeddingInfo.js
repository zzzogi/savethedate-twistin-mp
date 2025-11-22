import { useEffect, useRef, useState } from "react";
import Divider from "../Divider/Divider";
import "./WeddingInfo.css";

const WeddingInfo = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRefs = useRef([]);

  const studioImages = [
    "/images/studio-1.webp",
    "/images/studio-2.webp",
    "/images/studio-3.webp",
    "/images/studio-4.webp",
  ];

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % studioImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [studioImages.length]);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-section");
            setVisibleSections((prev) => [
              ...new Set([...prev, parseInt(index)]),
            ]);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <section className="wedding-info section">
      {/* Background decorations */}
      <div className="bg-decor bg-decor-1">
        <img src="/images/flower-1.png" alt="Flower Decoration 1" />
      </div>
      <div className="bg-decor bg-decor-2">
        <img src="/images/flower-2.png" alt="Flower Decoration 2" />
      </div>

      <div className="container">
        {/* PART 1: Invitation Title + Names + Photo Slideshow */}
        <div
          className={`invitation-block animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          <h2 className="invitation-title">
            Thân mời tới dự lễ cưới thân mật của chúng tôi
          </h2>

          <div className="couple-names-main">
            <h3 className="groom-name">Nguyễn Chung Bảo</h3>
            <div className="ampersand-decorative">&</div>
            <h3 className="bride-name">Nguyễn Ngọc Minh Phương</h3>
          </div>

          {/* SLIDESHOW */}
          <div className="couple-photo-main">
            <div className="slideshow-container">
              {studioImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Chung Bảo & Minh Phương - Studio ${index + 1}`}
                  className={`slideshow-image ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  width={1080}
                  height={1620}
                />
              ))}
            </div>

            {/* Dots Navigation */}
            <div className="slideshow-dots">
              {studioImages.map((_, index) => (
                <button
                  key={index}
                  className={`slideshow-dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* PART 2: Time + Calendar + Venue */}
        <div
          className={`ceremony-block animate-section ${
            visibleSections.includes(1) ? "visible" : ""
          }`}
          data-section="1"
          ref={addToRefs}
        >
          <h2 className="ceremony-title">
            Lễ thành hôn sẽ được tổ chức vào lúc 17 giờ 30 phút
          </h2>

          {/* Calendar Display */}
          <div className="calendar-display">
            <div className="calendar-day">Chủ Nhật</div>

            <div className="calendar-date-row">
              <div className="calendar-month">Tháng 11</div>
              <div className="calendar-date">30</div>
              <div className="calendar-year">Năm 2025</div>
            </div>

            <p className="calendar-lunar">(Tức ngày 11 tháng 10 năm Ất Tỵ)</p>
          </div>

          {/* Family Information */}
          <div className="family-info-section">
            <div className="family-grid">
              {/* Nhà Trai */}
              <div className="family-side">
                <h1 className="family-side-title">Nhà trai</h1>
                <p className="parent-name">Nguyễn Chung Tuấn</p>
                <p className="parent-name">Trần Thị Lan</p>
                <div className="family-child">
                  <p className="child-label">Chú rể:</p>
                  <p className="child-name">Nguyễn Chung Bảo</p>
                </div>
              </div>

              {/* Nhà Gái */}
              <div className="family-side">
                <h1 className="family-side-title">Nhà gái</h1>
                <div className="family-parents">
                  <p className="parent-name">Nguyễn Ngọc Dũng</p>
                  <p className="parent-name">Nguyễn Thị Phương Anh</p>
                </div>
                <div className="family-child">
                  <p className="child-label">Cô dâu:</p>
                  <p className="child-name">Nguyễn Ngọc Minh Phương</p>
                </div>
              </div>
            </div>
          </div>

          <Divider
            logoSize="large"
            logo="/images/ring.png"
            width={561}
            height={445}
          />

          {/* Venue Information */}
          <div className="venue-info-block">
            <p className="venue-label">Tiệc cưới được tổ chức tại:</p>
            <h3 className="venue-name-main">TRUNG TÂM TIỆC CƯỚI THE ONE</h3>
            <p className="venue-detail">Sảnh Sapphire - Tầng 2</p>
            <p className="venue-detail">
              Số 2 Chương Dương Độ, Hồng Hà, Hà Nội
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.8383123456338!2d105.85639387525669!3d21.02852958062073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0dfc6aa027%3A0xfaddf9cc7059a801!2sThe%20One%20Hanoi%20Wedding%20and%20Convention%20Centre!5e1!3m2!1svi!2s!4v1763308313093!5m2!1svi!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingInfo;
