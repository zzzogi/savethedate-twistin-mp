import React, { useState, useRef, useEffect } from "react";

const StudioCarousel = () => {
  const images = Array.from(
    { length: 15 },
    (_, i) => `/images/studio-${i + 4}.webp`
  );

  // State for current active slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for tilt effect on center card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Ref to track if mouse is over the card
  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play timer
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // ============================
  // AUTO-PLAY EFFECT (Every 4s)
  // ============================

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

  // Pause auto-play on user interaction
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Resume auto-play after 10 seconds of inactivity
  const resumeAutoPlay = () => {
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // ============================
  // CAROUSEL NAVIGATION HANDLERS
  // ============================

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

  // ============================
  // TOUCH/SWIPE HANDLERS (Mobile)
  // ============================

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

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  // ============================
  // 3D TILT EFFECT HANDLERS
  // ============================

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

  // ============================
  // RENDER SECTION
  // ============================

  const styles = {
    section: {
      background: "#f5f1ed",
      position: "relative",
      overflow: "hidden",
      padding: "100px 0",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      position: "relative",
      zIndex: 2,
    },
    title: {
      fontSize: "3rem",
      color: "#9d755c",
      textAlign: "center",
      marginBottom: "15px",
      fontWeight: 700,
      letterSpacing: "1px",
    },
    description: {
      fontSize: "1.3rem",
      color: "#333",
      textAlign: "center",
      marginBottom: "80px",
      fontStyle: "italic",
      opacity: 0.85,
    },
    carouselContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: "1100px",
      margin: "0 auto",
      minHeight: "420px", // REDUCED HEIGHT
    },
    carouselTrack: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      perspective: "1000px",
    },
    card: (position, isCenter, isHovering) => {
      // Calculate transform based on position (-2, -1, 0, 1, 2)
      let transform = "";
      let opacity = 1;
      let blur = 0;
      let zIndex = 1;

      if (position === 0) {
        // Center card
        transform =
          isCenter && isHovering
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.15)`
            : "translateX(0) scale(1.1)";
        zIndex = 5;
        opacity = 1;
        blur = 0;
      } else if (position === -1) {
        // Left 1
        transform = "translateX(-280px) scale(0.85)";
        zIndex = 4;
        opacity = 0.7;
        blur = 1;
      } else if (position === -2) {
        // Left 2
        transform = "translateX(-480px) scale(0.7)";
        zIndex = 3;
        opacity = 0.4;
        blur = 2;
      } else if (position === 1) {
        // Right 1
        transform = "translateX(280px) scale(0.85)";
        zIndex = 4;
        opacity = 0.7;
        blur = 1;
      } else if (position === 2) {
        // Right 2
        transform = "translateX(480px) scale(0.7)";
        zIndex = 3;
        opacity = 0.4;
        blur = 2;
      }

      return {
        position: "absolute",
        maxWidth: "380px", // SMALLER WIDTH
        width: "85%",
        borderRadius: "16px", // SMALLER RADIUS
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)", // SOFTER SHADOW
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        background: "white",
        zIndex,
        opacity,
        filter: `blur(${blur}px)`,
        transform,
      };
    },
    cardImage: {
      width: "100%",
      height: "auto",
      display: "block",
      userSelect: "none",
      pointerEvents: "none",
      objectFit: "contain",
      maxHeight: "450px", // LIMIT HEIGHT
    },
    cardShine: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%)",
      pointerEvents: "none",
      opacity: isHovering ? 1 : 0,
      transition: "opacity 0.3s ease",
    },
    dots: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      marginTop: "80px",
      flexWrap: "wrap",
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    dot: (isActive) => ({
      width: isActive ? "28px" : "10px",
      height: "10px",
      borderRadius: isActive ? "5px" : "50%",
      background: isActive ? "#9d755c" : "rgba(157, 117, 92, 0.3)",
      border: "none",
      cursor: "pointer",
      padding: 0,
      transition: "all 0.3s ease",
    }),
  };

  return (
    <section style={styles.section} id="studio-carousel">
      <div style={styles.container}>
        {/* Section Header */}
        <h2 style={styles.title}>Ảnh cưới studio</h2>
        <p style={styles.description}>
          Những khoảnh khắc đẹp nhất được lưu giữ
        </p>

        {/* Main carousel container */}
        <div
          style={styles.carouselContainer}
          onMouseEnter={pauseAutoPlay} // ← ADD THIS
          onMouseLeave={resumeAutoPlay} // ← ADD THIS
        >
          {/* Cards track - NOW SHOWS 5 CARDS */}
          <div
            style={styles.carouselTrack}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => {
              // Calculate position with wrap-around
              let position = index - currentIndex;

              // Normalize position to handle wrapping
              if (position > images.length / 2) {
                position -= images.length;
              } else if (position < -images.length / 2) {
                position += images.length;
              }

              // Show cards from -2 to +2 (5 total)
              if (position < -2 || position > 2) return null;

              const isCenter = position === 0;

              return (
                <div
                  key={index}
                  style={styles.card(
                    position,
                    isCenter,
                    isHovering && isCenter
                  )}
                  onClick={() => !isCenter && goToSlide(index)}
                  onMouseMove={isCenter ? handleMouseMove : undefined}
                  onMouseEnter={isCenter ? handleMouseEnter : undefined}
                  onMouseLeave={isCenter ? handleMouseLeave : undefined}
                  ref={isCenter ? cardRef : null}
                >
                  <img
                    src={image}
                    alt={`Studios ${index + 1}`}
                    draggable="false"
                    style={styles.cardImage}
                  />

                  {isCenter && <div style={styles.cardShine}></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              style={styles.dot(index === currentIndex)}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.target.style.background = "rgba(157, 117, 92, 0.6)";
                  e.target.style.transform = "scale(1.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.target.style.background = "rgba(157, 117, 92, 0.3)";
                  e.target.style.transform = "scale(1)";
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioCarousel;
