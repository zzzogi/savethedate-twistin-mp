import React, { useEffect, useRef, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRefs = useRef([]);

  // Only 5 landscape images
  const galleryImages = [
    "/images/gallery-1.webp",
    "/images/gallery-2.webp",
    "/images/gallery-3.webp",
    "/images/gallery-4.webp",
    "/images/gallery-5.webp",
  ];

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

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section className="gallery-section section">
      {/* Background decorations */}
      <div className="bg-decor bg-decor-9">
        <img src="/images/flower-1.png" alt="Flower 1" />
      </div>
      <div className="bg-decor bg-decor-10">
        <img src="/images/flower-2.png" alt="Flower 2" />
      </div>

      <div className="container">
        <div
          className={`gallery-header animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          <h2 className="section-title">Album Ảnh Cưới</h2>
          <p className="section-subtitle">
            Những khoảnh khắc đẹp nhất của chúng tôi
          </p>
        </div>

        <div
          className={`gallery-grid animate-section ${
            visibleSections.includes(1) ? "visible" : ""
          }`}
          data-section="1"
          ref={addToRefs}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-image"
              onClick={() => openLightbox(index)}
            >
              <img src={image} alt={`Wedding ${index + 1}`} />
              <div className="gallery-overlay">
                <span>Click để xem ảnh</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>
          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
          <img
            src={galleryImages[currentImage]}
            alt="Lightbox"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
