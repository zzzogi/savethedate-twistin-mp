import { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import "./OurStory.css";

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

  // Data arrays with row/col span options
  const earlyYearsPhotos = [
    {
      src: "/images/early-1.jpg",
      caption: "Đôi tình nhân cùng tiến",
      orientation: "landscape",
    },
    {
      src: "/images/early-2.jpg",
      caption: "Bảo làm tóc 🦔",
      orientation: "portrait",
    },
    {
      src: "/images/early-3.jpg",
      caption: "Chu choe nè 😙",
      orientation: "portrait",
    },
    {
      src: "/images/early-4.jpg",
      caption: "Lượn lờ Hồ Tây",
      orientation: "landscape",
    },
    {
      src: "/images/early-5.jpg",
      caption: "Bảo vẽ tặng Phương",
      orientation: "portrait",
    },
    {
      src: "/images/early-6.jpg",
      caption: "Ngày đầu đi date",
      orientation: "portrait",
    },
  ];

  const schoolMemories = [
    { src: "/images/school-1.jpg", colSpan: 2, rowSpan: 1 }, // landscape
    { src: "/images/school-2.jpg", colSpan: 1, rowSpan: 1 }, // portrait
    { src: "/images/school-3.jpg", colSpan: 2, rowSpan: 2 }, // square
    { src: "/images/school-4.jpg", colSpan: 1, rowSpan: 2 }, // portrait
    { src: "/images/school-5.jpg", colSpan: 2, rowSpan: 2 }, // landscape
    { src: "/images/school-6.jpg", colSpan: 2, rowSpan: 1 }, // square
    { src: "/images/school-7.jpg", colSpan: 1, rowSpan: 1 }, // big
    { src: "/images/school-8.jpg", colSpan: 3, rowSpan: 2 }, // portrait
    { src: "/images/school-9.jpg", colSpan: 1, rowSpan: 2 }, // portrait
  ];

  const togetherPhotos = [
    {
      src: "/images/together-1.jpg",
      caption: "Chuyến đi chơi cùng nhau",
      orientation: "landscape",
    },
    {
      src: "/images/together-2.jpg",
      caption: "Đi chơi đêm trong tiết trời lạnh",
      orientation: "landscape",
    },
    {
      src: "/images/together-3.jpg",
      caption: "Kỉ niệm du lịch Hội An",
      orientation: "portrait",
    },
    {
      src: "/images/together-4.jpg",
      caption: "Chống chọi với đại dịch COVID-19",
      orientation: "portrait",
    },
    {
      src: "/images/together-5.jpg",
      caption: "Cuộc chơi nào cũng có nhau",
      orientation: "portrait",
    },
  ];

  const weddingPhotos = [
    { src: "/images/wedding-1.jpg", colSpan: 2, rowSpan: 2 },
    { src: "/images/wedding-2.jpg", colSpan: 1, rowSpan: 2 },
    { src: "/images/wedding-3.jpg", colSpan: 1, rowSpan: 2 },
    { src: "/images/wedding-4.jpg", colSpan: 1, rowSpan: 2 },
    { src: "/images/wedding-5.jpg", colSpan: 2, rowSpan: 1 },
    { src: "/images/wedding-6.jpg", colSpan: 1, rowSpan: 2 },
    { src: "/images/wedding-7.jpg", colSpan: 2, rowSpan: 3 },
    { src: "/images/wedding-8.jpg", colSpan: 1, rowSpan: 2 },
    { src: "/images/wedding-9.jpg", colSpan: 1, rowSpan: 2 },
    { src: "/images/wedding-10.jpg", colSpan: 1, rowSpan: 3 },
    { src: "/images/wedding-11.jpg", colSpan: 2, rowSpan: 2 },
    { src: "/images/wedding-12.jpg", colSpan: 1, rowSpan: 3 },
    { src: "/images/wedding-13.jpg", colSpan: 2, rowSpan: 2 },
    { src: "/images/wedding-14.jpg", colSpan: 1, rowSpan: 1 },
    { src: "/images/wedding-15.jpg", colSpan: 1, rowSpan: 3 },
    { src: "/images/wedding-16.jpg", colSpan: 1, rowSpan: 2 },
  ];

  return (
    <section className="our-story section">
      <div className="story-background"></div>
      <div className="story-overlay"></div>

      <div className="container">
        {/* TIMELINE */}
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
          <div className="timeline-item-story">
            <Icon
              src="/images/meeting.jpg"
              alt="Meeting Icon"
              size="xxl"
              style={{ mixBlendMode: "multiply" }}
            />
            <h3 className="timeline-title-story">Gặp Gỡ</h3>
            <p className="timeline-text-story">
              Chúng mình gặp nhau lần đầu vào ngày nhập học lớp 10D1, trường
              THPT Trần Phú – Hoàn Kiếm. Nhưng phải đến học kỳ 2 lớp 11, khi cô
              chủ nhiệm xếp ngồi cạnh nhau, chúng mình mới thật sự bắt đầu trò
              chuyện và trở nên thân thiết.
            </p>
          </div>

          <div className="timeline-item-story">
            <Icon
              src="/images/lover.jpg"
              alt="Love Icon"
              size="xxl"
              style={{ mixBlendMode: "multiply" }}
            />
            <h3 className="timeline-title-story">7 năm gắn bó</h3>
            <p className="timeline-text-story">
              Mùa hè năm lớp 11, chúng mình nhắn tin mỗi ngày và tình cảm lớn
              dần. Đến ngày 5/10/2018 – cuộc hẹn đầu tiên, chúng mình chính thức
              ngỏ lời thích nhau. Suốt những năm sau đó, từ đại học đến đi làm,
              cả hai luôn đồng hành, sẻ chia và cùng nhau trưởng thành qua nhiều
              kỷ niệm đẹp.
            </p>
          </div>

          <div className="timeline-item-story">
            <Icon
              src="/images/married.png"
              alt="Wedding Icon"
              size="xxl"
              style={{ mixBlendMode: "multiply" }}
            />
            <h3 className="timeline-title-story">Về chung 1 nhà</h3>
            <p className="timeline-text-story">
              Khi cả hai đã sẵn sàng và nhận được sự ủng hộ của gia đình, chúng
              mình quyết định gắn bó trọn đời. Từ hai người bạn cùng bàn thành
              vợ chồng, về chung một nhà sau buổi cầu hôn lãng mạn đúng kỷ niệm
              7 năm. Dù tương lai có thử thách, chúng mình tin "thuận vợ thuận
              chồng, tát biển Đông cũng cạn".
            </p>
          </div>
        </div>

        {/* 1. EARLY YEARS MARQUEE - DEFAULT 2X */}
        <div
          className={`story-block animate-section ${
            visibleSections.includes(2) ? "visible" : ""
          }`}
          data-section="2"
          ref={addToRefs}
        >
          <h2 className="story-section-title">Những năm đầu của hai đứa</h2>
          <p className="story-section-description">
            Những kỷ niệm đẹp đẽ khi mới bắt đầu
          </p>

          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[
                ...earlyYearsPhotos,
                ...earlyYearsPhotos,
                ...earlyYearsPhotos,
              ].map((photo, index) => (
                <div
                  key={index}
                  className={`polaroid-card ${photo.orientation}`}
                >
                  <div className="polaroid-image-wrapper">
                    <img src={photo.src} alt={photo.caption} />
                  </div>
                  <div className="polaroid-caption">{photo.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. SCHOOL MEMORIES */}
        <div
          className={`story-block animate-section ${
            visibleSections.includes(3) ? "visible" : ""
          }`}
          data-section="3"
          ref={addToRefs}
        >
          <h2 className="story-section-title">Kỉ niệm thời học sinh</h2>
          <p className="story-section-description">
            Cùng nhau lớn lên trong mái trường thân yêu
          </p>

          <div className="masonry-grid">
            {schoolMemories.map((photo, index) => (
              <div
                key={index}
                className="masonry-item"
                style={{
                  gridColumn: `span ${photo.colSpan}`,
                  gridRow: `span ${photo.rowSpan}`,
                }}
              >
                <img src={photo.src} alt={`School memory ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. TOGETHER MARQUEE */}
        <div
          className={`story-block animate-section ${
            visibleSections.includes(4) ? "visible" : ""
          }`}
          data-section="4"
          ref={addToRefs}
        >
          <h2 className="story-section-title">Đồng hành cùng nhau</h2>
          <p className="story-section-description">
            Mỗi bước đi đều có nhau bên cạnh
          </p>

          <div className="marquee-wrapper marquee-reverse">
            <div className="marquee-track">
              {[...togetherPhotos, ...togetherPhotos, ...togetherPhotos].map(
                (photo, index) => (
                  <div
                    key={index}
                    className={`polaroid-card ${photo.orientation}`}
                  >
                    <div className="polaroid-image-wrapper">
                      <img src={photo.src} alt={photo.caption} />
                    </div>
                    <div className="polaroid-caption">{photo.caption}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* 4. COMPARISON */}
        <div
          className={`story-block animate-section ${
            visibleSections.includes(5) ? "visible" : ""
          }`}
          data-section="5"
          ref={addToRefs}
        >
          <h2 className="story-section-title">
            Có những điều không bao giờ thay đổi...
          </h2>
          <p className="story-section-description">Từ ngày ấy đến bây giờ</p>

          <div className="comparison-container">
            <div className="comparison-photo">
              <img src="/images/yearbook-photo.jpg" alt="Yearbook" />
              <div className="photo-label">Kỉ yếu 2019</div>
            </div>

            <div className="comparison-arrow">
              <span className="arrow-horizontal">→</span>
              <span className="arrow-vertical">↓</span>
            </div>

            <div className="comparison-photo">
              <img src="/images/wedding-photo.jpg" alt="Wedding" />
              <div className="photo-label">Ảnh cưới 2025</div>
            </div>
          </div>
        </div>

        {/* 5. PROPOSAL WITH CONFETTI */}
        <div
          className={`story-block proposal-block animate-section ${
            visibleSections.includes(6) ? "visible" : ""
          }`}
          data-section="6"
          ref={addToRefs}
        >
          <h2 className="story-section-title">Ngày cầu hôn</h2>
          <p className="story-section-description">
            Khoảnh khắc thiêng liêng nhất
          </p>

          <div className="proposal-content">
            <div className="proposal-image">
              <img src="/images/proposal.jpg" alt="Proposal" />
            </div>
            <div className="proposal-text">
              <p className="proposal-quote">"Làm vợ anh nhé?"</p>
              <p className="proposal-message">
                Ngày ấy, anh đã hỏi. Và em đã gật đầu với nụ cười rạng rỡ nhất.
                Đó là khoảnh khắc mà cả hai chúng ta biết rằng, chúng ta sẽ bên
                nhau mãi mãi.
              </p>
              <p className="proposal-date"> 05.10.2025</p>
            </div>
          </div>
        </div>

        {/* 6. WEDDING PHOTOS */}
        <div
          className={`story-block animate-section ${
            visibleSections.includes(7) ? "visible" : ""
          }`}
          data-section="7"
          ref={addToRefs}
        >
          <h2 className="story-section-title">Ngày cưới</h2>
          <p className="story-section-description">
            Ngày trọng đại của cuộc đời
          </p>

          <div className="masonry-grid wedding-grid">
            {weddingPhotos.map((photo, index) => (
              <div
                key={index}
                className="masonry-item"
                style={{
                  gridColumn: `span ${photo.colSpan}`,
                  gridRow: `span ${photo.rowSpan}`,
                }}
              >
                <img src={photo.src} alt={`Wedding ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
