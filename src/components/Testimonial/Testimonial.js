import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaQuoteLeft,
} from "react-icons/fa";
import "./Testimonial.css";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Nguyễn Khánh Duy",
      relationship: "D1 Airline",
      message: "Xời chúc mừng hai bạn ! Ich wünsche euch beiden immer Glück !",
      avatar: "D",
    },
    {
      name: "Thanh Bình Trần",
      relationship: "Bạn thân Minh Phương",
      message:
        "Hạnh phúc 2 bạn nhóooo 🎉 nhớ là không đc bắt nạt bạn iu MP của chúng tuiii nhaaa Bảoooo :>>> cô ý có ctui là điểm tự đó nhaaaa",
      avatar: "T",
    },
    {
      name: "Trần Thị Dung",
      relationship: "Bác gái của Chung Bảo",
      message:
        "Bác chúc mừng hạnh phúc hai con ❤️🥰luôn bên nhau hạnh phúc- thành đạt và bình an ❤️🥰🌺",
      avatar: "D",
    },
    {
      name: "Thanh Choé",
      relationship: "Cô của Chung Bảo",
      message: "Đẹp đôi quá ❤️ cô chúc hai con mãi mãi hạnh phúc nhé ❤️",
      avatar: "C",
    },
    {
      name: "Nguyễn Trường Sơn",
      relationship: "Bạn thân Chung Bảo",
      message: "Mọi thứ sau cánh cổng của tôi đều tươi đẹp 😍🎉",
      avatar: "S",
    },
    {
      name: "Trang N Cusick",
      relationship: "Cô của Chung Bảo",
      message: "Chúc mừng hai con, chúc hai con trăm năm hạnh phúc 😘",
      avatar: "T",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(testimonials.length / 3)) %
        Math.ceil(testimonials.length / 3)
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * 3,
    currentIndex * 3 + 3
  );

  return (
    <section className="testimonial section" id="testimonial">
      <div className="container">
        <h2 className="section-title">Lời Chúc</h2>
        <p className="section-subtitle">Từ Những Người Thân Yêu</p>

        <div className="testimonial-carousel">
          <button className="carousel-btn prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>

          <div className="testimonial-grid">
            {visibleTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder">{testimonial.avatar}</div>
                </div>
                <p className="testimonial-message">{testimonial.message}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.relationship}</p>
                </div>
                <FaHeart className="heart-icon" />
              </div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
            (_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
