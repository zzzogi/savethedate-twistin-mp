import React, { useEffect, useRef, useState } from "react";
import "./WeddingInfo.css";
import Divider from "../Divider/Divider";
import Icon from "../Icon/Icon";

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
        <img src="/images/flower-1.png" alt="Flower Decoration 1" />
      </div>
      <div className="bg-decor bg-decor-2">
        <img src="/images/flower-2.png" alt="Flower Decoration 2" />
      </div>

      <div className="container">
        {/* PART 1: Invitation Title + Names + Photo */}
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

          <div className="couple-photo-main">
            <img src="/images/couple-main.png" alt="Chung Bảo & Minh Phương" />
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

          {/* Calendar Display - FIXED */}
          <div className="calendar-display">
            <div className="calendar-day">Chủ Nhật</div>

            {/* Date Row - 3 divs in 1 line */}
            <div className="calendar-date-row">
              <div className="calendar-month">Tháng 11</div>
              <div className="calendar-date">30</div>
              <div className="calendar-year">Năm 2025</div>
            </div>

            <p className="calendar-lunar">(Tức ngày 11 tháng 10 năm Ất Tỵ)</p>
          </div>

          {/* NEW: Family Information */}
          <div className="family-info-section">
            <div className="family-grid">
              {/* Nhà Trai */}
              <div className="family-side">
                <h4 className="family-side-title">Nhà trai</h4>
                <div className="family-parents">
                  <p className="parent-name">Nguyễn Chung Tuấn</p>
                  <p className="parent-name">Trần Thị Lan</p>
                </div>
                <div className="family-child">
                  <p className="child-label">Chú rể:</p>
                  <p className="child-name">Nguyễn Chung Bảo</p>
                </div>
              </div>

              {/* Nhà Gái */}
              <div className="family-side">
                <h4 className="family-side-title">Nhà gái</h4>
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

          <Divider logoSize="large" logo="/images/ring.png" />

          {/* Venue Information - WIDER */}
          <div className="venue-info-block">
            <p className="venue-label">Tại:</p>
            <h3 className="venue-name-main">TRUNG TÂM TIỆC CƯỚI THE ONE</h3>
            <p className="venue-detail">Sảnh Saphire - Tầng 2</p>
            <p className="venue-detail">
              Số 2 Chương Dương Độ, Hồng Hà, Hà Nội
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=The+One+Hanoi+Wedding+and+Convention+Centre"
            target="_blank"
            rel="noopener noreferrer"
            className="directions-button"
          >
            <span className="button-icon">
              <Icon
                src="/images/location-pin.png"
                alt="Map Icon"
                size="medium"
              />
            </span>
            Chỉ Đường
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeddingInfo;
