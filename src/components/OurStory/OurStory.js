import React, { useEffect, useRef, useState } from "react";
import "./OurStory.css";
import Icon from "../Icon/Icon";

const OurStory = () => {
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

  const memories = [
    { year: "2018", image: "/images/memory-2018.jpg", caption: "Năm Đầu Tiên" },
    {
      year: "2019",
      image: "/images/memory-2019.jpg",
      caption: "Khám Phá Nhau",
    },
    {
      year: "2020",
      image: "/images/memory-2020.jpg",
      caption: "Vượt Thử Thách",
    },
    { year: "2021", image: "/images/memory-2021.jpg", caption: "Trưởng Thành" },
    {
      year: "2022",
      image: "/images/memory-2022.jpg",
      caption: "Xây Dựng Ước Mơ",
    },
    { year: "2023", image: "/images/memory-2023.jpg", caption: "Những Dấu Ấn" },
    { year: "2024", image: "/images/memory-2024.jpg", caption: "Ngày Cầu Hôn" },
    {
      year: "2025",
      image: "/images/memory-2025.jpg",
      caption: "Tới Ngày Cưới",
    },
  ];

  return (
    <section className="our-story section">
      <div className="bg-decor bg-decor-7">
        <img src="/images/leaf-1.png" alt="Leaf Decoration" />
      </div>
      <div className="bg-decor bg-decor-8">
        <img src="/images/flower-2.png" alt="Flower Decoration" />
      </div>

      <div className="container">
        <div
          className={`story-header animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          <h2 className="section-title">Dòng Thời Gian</h2>
          <p className="section-subtitle">Gặp gỡ - Yêu - Cưới</p>
        </div>

        <div
          className={`story-timeline animate-section ${
            visibleSections.includes(1) ? "visible" : ""
          }`}
          data-section="1"
          ref={addToRefs}
        >
          <div className="timeline-item">
            <Icon
              src="/images/meeting.jpg"
              alt="Meeting Icon"
              size="xxl"
              style={{
                mixBlendMode: "multiply",
                marginTop: "20px",
                marginBottom: "40px",
              }}
            />
            <h3 className="timeline-title">Gặp Gỡ</h3>
            <p className="timeline-text">
              Chúng tôi gặp nhau lần đầu tại THPT Trần Phú - Hoàn Kiếm năm 2018.
              Hai con người trẻ tuổi với đam mê nghệ thuật đã tìm thấy nhau.
            </p>
          </div>

          <div className="timeline-item">
            <Icon
              src="/images/lover.jpg"
              alt="Love Icon"
              size="pretty-large"
              style={{
                mixBlendMode: "multiply",
              }}
            />
            <h3 className="timeline-title">Yêu</h3>
            <p className="timeline-text">
              7 năm bên nhau, cùng vượt qua mọi thử thách. Tình yêu của chúng
              tôi ngày càng lớn mạnh và trưởng thành hơn.
            </p>
          </div>

          <div className="timeline-item">
            <Icon
              src="/images/married.png"
              alt="Wedding Icon"
              size="pretty-large"
              style={{
                mixBlendMode: "multiply",
              }}
            />
            <h3 className="timeline-title">Cưới</h3>
            <p className="timeline-text">
              Và giờ đây, chúng tôi sẵn sàng bước vào chương mới - từ người yêu
              thành vợ chồng, xây dựng tổ ấm hạnh phúc.
            </p>
          </div>
        </div>

        <div
          className={`memory-marquee animate-section ${
            visibleSections.includes(2) ? "visible" : ""
          }`}
          data-section="2"
          ref={addToRefs}
        >
          <h3 className="marquee-title">Những Khoảnh Khắc Đáng Nhớ</h3>

          <div className="marquee-container">
            <div className="marquee-content">
              {memories.map((memory, index) => (
                <div key={`original-${index}`} className="polaroid-memory">
                  <img src={memory.image} alt={`Memory ${memory.year}`} />
                  <div className="polaroid-caption">
                    <span className="memory-year">{memory.year}</span>
                    <span className="memory-text">{memory.caption}</span>
                  </div>
                </div>
              ))}
              {memories.map((memory, index) => (
                <div key={`clone-${index}`} className="polaroid-memory">
                  <img src={memory.image} alt={`Memory ${memory.year}`} />
                  <div className="polaroid-caption">
                    <span className="memory-year">{memory.year}</span>
                    <span className="memory-text">{memory.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
