import React, { useEffect, useRef, useState } from "react";
import "./WeddingInfo.css";
import Divider from "../Divider/Divider";

const WeddingInfo = () => {
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

  return (
    <section className="wedding-info section">
      {/* Background decorations */}
      <div className="bg-decor bg-decor-1">
        <img src="/images/bird-1.png" alt="Bird Decoration" />
      </div>
      <div className="bg-decor bg-decor-2">
        <img src="/images/leaf-1.png" alt="Leaf Decoration" />
      </div>
      <div className="bg-decor bg-decor-3">
        <img src="/images/flower-2.png" alt="Flower Decoration" />
      </div>
      <div className="bg-decor bg-decor-4">
        <img src="/images/leaf-2.png" alt="Leaf Decoration" />
      </div>
      <div className="bg-decor bg-decor-5">
        <img src="/images/flower-1.png" alt="Flower Decoration" />
      </div>
      <div className="bg-decor bg-decor-6">
        <img src="/images/bird-2.png" alt="Bird Decoration" />
      </div>

      <div className="container">
        {/* 1. Title & Description with Logo */}
        <div
          className={`info-header animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          <div className="header-logo">
            <img src="/images/element-couple.png" alt="Wedding Logo" />
          </div>
          <h2 className="section-title">Trân Trọng Kính Mời</h2>
          <div className="info-description">
            <p>Sự hiện diện của bạn là vinh hạnh cho gia đình chúng tôi</p>
            <p>Hân hạnh được đón tiếp tại lễ cưới của</p>
            <p className="couple-names-inline">Chung Bảo & Minh Phương</p>
          </div>
        </div>

        <Divider logo="/images/leaf-1.png" logoSize="large" />

        {/* 2. Large Couple Photo */}
        <div
          className={`couple-main-photo animate-section ${
            visibleSections.includes(1) ? "visible" : ""
          }`}
          data-section="1"
          ref={addToRefs}
        >
          <div className="main-photo-frame">
            <img src="/images/couple-main.png" alt="Chung Bảo & Minh Phương" />
          </div>
        </div>

        <Divider logo="/images/leaf-2.png" logoSize="large" />

        {/* 3. Calendar Image */}
        <div
          className={`calendar-image-section animate-section ${
            visibleSections.includes(2) ? "visible" : ""
          }`}
          data-section="2"
          ref={addToRefs}
        >
          <div className="calendar-frame">
            <img src="/images/wedding-calendar.png" alt="Wedding Calendar" />
          </div>
        </div>

        <div
          className={`save-date-marquee animate-section ${
            visibleSections.includes(3) ? "visible" : ""
          }`}
          data-section="3"
          ref={addToRefs}
        >
          <div className="marquee">
            <div className="marquee-wedding-info">
              <span>SAVE THE DATE</span>
              <span>SAVE THE DATE</span>
              <span>SAVE THE DATE</span>
              <span>SAVE THE DATE</span>
              <span>SAVE THE DATE</span>
              <span>SAVE THE DATE</span>
            </div>
          </div>
        </div>

        {/* 5. Venue Info - NEW DESIGN */}
        <div
          className={`venue-section animate-section ${
            visibleSections.includes(4) ? "visible" : ""
          }`}
          data-section="4"
          ref={addToRefs}
        >
          {/* Venue Card */}
          <div className="venue-card">
            {/* Time & Date at Top */}
            <div className="venue-time-header">
              <p className="venue-time">VÀO LÚC 17h30 - CHỦ NHẬT</p>
              <h3 className="venue-date">30</h3>
              <div className="venue-month-year">
                <span className="venue-month">THÁNG 11</span>
                <span className="venue-year">NĂM 2025</span>
              </div>
              <p className="venue-lunar">(Tức ngày 11 tháng 10 năm Ất Tỵ)</p>
            </div>

            <Divider logo="/images/cake.png" logoSize="large" />

            {/* Venue Location */}
            <div className="venue-location">
              <p className="venue-at">
                Tại: <strong>TRUNG TÂM TIỆC CƯỚI THE ONE</strong>
              </p>
              <p className="venue-hall">Sảnh Saphire - Tầng 2</p>
              <p className="venue-address">
                Số 2 Chương Dương Độ, Hồng Hà, Hà Nội
              </p>
            </div>

            <Divider logo="/images/swan.png" logoSize="medium" />

            {/* Parents Names */}
            <div className="venue-parents">
              <div className="venue-parent-group">
                <p className="parent-side">Nhà trai</p>
                <p className="parent-name">Nguyễn Chung Tuấn</p>
                <p className="parent-name">Trần Thị Lan</p>
              </div>
              <div className="venue-parent-group">
                <p className="parent-side">Nhà gái</p>
                <p className="parent-name">Nguyễn Ngọc Dũng</p>
                <p className="parent-name">Nguyễn Thị Phương Anh</p>
              </div>
            </div>

            <Divider logo="/images/bow.png" logoSize="medium" />

            {/* Couple Names */}
            <div className="venue-couple">
              <p className="couple-role">
                Chú rê:{" "}
                <span className="couple-name-text">Nguyễn Chung Bảo</span>
              </p>
              <p className="couple-role">
                Cô dâu:{" "}
                <span className="couple-name-text">
                  Nguyễn Ngọc Minh Phương
                </span>
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="map-container">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.8383118853544!2d105.8589688!3d21.028529600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0dfc6aa027%3A0xfaddf9cc7059a801!2sThe%20One%20Hanoi%20Wedding%20and%20Convention%20Centre!5e1!3m2!1svi!2s!4v1762531536860!5m2!1svi!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản Đồ Địa Điểm Cưới"
              ></iframe>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=The+One+Hanoi+Wedding+and+Convention+Centre"
            target="_blank"
            rel="noopener noreferrer"
            className="directions-btn"
          >
            <span>🧭</span>
            Chỉ đường trên Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeddingInfo;
