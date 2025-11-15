import React, { useEffect, useRef, useState } from "react";
import "./SaveTheDate.css";

const SaveTheDate = () => {
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
      { threshold: 0.2 }
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
    <section className="save-the-date-section section">
      {/* Large background decoration */}
      <div className="bg-decor-large">
        <img src="/images/large-floral.png" alt="" />
      </div>

      <div className="container">
        <div
          className={`std-content animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          {/* Title */}
          <h2 className="std-title">Quyết Định Bên Nhau Trọn Đời</h2>

          {/* Save the date text */}
          <p className="std-subtitle">Save the date</p>

          {/* Date */}
          <h3 className="std-date">09.03.2025</h3>

          {/* Couple Photo */}
          <div className="std-photo-frame">
            <img
              src="/images/save-the-date-couple.jpg"
              alt="Chung Bảo & Minh Phương"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDate;
