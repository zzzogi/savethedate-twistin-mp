import { useEffect, useRef, useState } from "react";
import Divider from "../Divider/Divider";
import "./CoupleIntro.css";

const CoupleIntro = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

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
      { threshold: 0.15 }
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
    <section className="couple-intro section">
      {/* Background decorations */}
      <div className="bg-decor bg-decor-5">
        <img src="/images/flower-1.png" alt="Flower Decoration 1" />
      </div>
      <div className="bg-decor bg-decor-6">
        <img src="/images/flower-2.png" alt="Flower Decoration 2" />
      </div>
      <div className="container">
        <h2 className="section-title">Cô Dâu & Chú Rể</h2>
        <p className="section-subtitle">Hai người, một câu chuyện tình yêu</p>

        {/* Bride Section - 4 PHOTOS */}
        <div
          className={`person-section bride-section animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          <Divider logo="/images/bride.png" logoSize="extra-large" />
          <div className="person-header">
            <h3 className="person-title">Cô Dâu</h3>
            <p className="person-name">Nguyễn Ngọc Minh Phương</p>
          </div>

          <div className="person-gallery">
            <div className="gallery-item">
              <img src="/images/bride-1.jpg" alt="Minh Phương 1" />
            </div>
            <div className="gallery-item">
              <img src="/images/bride-2.jpg" alt="Minh Phương 2" />
            </div>
            <div className="gallery-item">
              <img src="/images/bride-3.jpg" alt="Minh Phương 3" />
            </div>
            <div className="gallery-item">
              <img src="/images/bride-4.jpg" alt="Minh Phương 4" />
            </div>
          </div>
        </div>

        {/* Groom Section - 1 PHOTO ONLY */}
        <div
          className={`person-section groom-section animate-section ${
            visibleSections.includes(1) ? "visible" : ""
          }`}
          data-section="1"
          ref={addToRefs}
        >
          <Divider logo="/images/groom.png" logoSize="extra-large" />
          <div className="person-header">
            <h3 className="person-title">Chú Rể</h3>
            <p className="person-name">Nguyễn Chung Bảo</p>
          </div>

          <div className="person-gallery person-gallery-single">
            <div className="gallery-item">
              <img src="/images/groom-1.jpg" alt="Chung Bảo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleIntro;
