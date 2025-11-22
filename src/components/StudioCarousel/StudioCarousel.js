import { useEffect, useRef, useState } from "react";
import Divider from "../Divider/Divider";
import "./StudioCarousel.css";

const StudioCarousel = () => {
  const images = Array.from(
    { length: 15 },
    (_, i) => `/images/studio-${i + 4}.webp`
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, images.length]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resumeAutoPlay = () => {
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const goToNext = () => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resumeAutoPlay();
  };

  const goToPrev = () => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resumeAutoPlay();
  };

  const goToSlide = (index) => {
    pauseAutoPlay();
    setCurrentIndex(index);
    resumeAutoPlay();
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <section className="studio-carousel-section" id="studio-carousel">
      <Divider logo="/images/flower-2.png" logoSize="extra-large" />

      <div className="studio-container">
        <h2 className="studio-title">Ảnh cưới studio</h2>
        <p className="studio-description">
          Những khoảnh khắc đẹp nhất được lưu giữ
        </p>

        <div
          className="carousel-wrapper"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div
            className="carousel-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => {
              let position = index - currentIndex;

              if (position > images.length / 2) {
                position -= images.length;
              } else if (position < -images.length / 2) {
                position += images.length;
              }

              if (position < -2 || position > 2) return null;

              const isCenter = position === 0;

              return (
                <div
                  key={index}
                  className={`carousel-card position-${position} ${
                    isCenter ? "center" : ""
                  }`}
                  style={{
                    transform:
                      isCenter && isHovering
                        ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.15)`
                        : undefined,
                  }}
                  onClick={() => !isCenter && goToSlide(index)}
                  onMouseMove={isCenter ? handleMouseMove : undefined}
                  onMouseEnter={isCenter ? handleMouseEnter : undefined}
                  onMouseLeave={isCenter ? handleMouseLeave : undefined}
                  ref={isCenter ? cardRef : null}
                >
                  <img
                    src={image}
                    alt={`Studio ${index + 1}`}
                    draggable="false"
                    className="carousel-image"
                  />
                  {isCenter && <div className="card-shine"></div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <Divider logo="/images/flower-1.png" logoSize="extra-large" />
    </section>
  );
};

export default StudioCarousel;
