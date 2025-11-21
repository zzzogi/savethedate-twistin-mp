import React, { useEffect, useRef, useState } from "react";
import "./Countdown.css";
import Divider from "../Divider/Divider";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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

  useEffect(() => {
    const weddingDate = new Date("2025-11-30T17:30:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <section className="countdown-section section">
      {/* Background decorations */}
      <div className="bg-decor bg-decor-13">
        <img src="/images/flower-1.png" alt="Flower Decoration" />
      </div>
      <div className="bg-decor bg-decor-14">
        <img src="/images/flower-1.png" alt="Flower Decoration" />
      </div>

      <div className="container">
        <div
          className={`countdown-header animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          <h2 className="section-title">Countdown</h2>
          <p className="section-subtitle">30 tháng 11, 2025</p>
        </div>

        <div
          className={`countdown-timer animate-section ${
            visibleSections.includes(1) ? "visible" : ""
          }`}
          data-section="1"
          ref={addToRefs}
        >
          <div className="timer-box">
            <div className="timer-value">{timeLeft.days}</div>
            <div className="timer-label">Ngày</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="timer-label">Giờ</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="timer-label">Phút</div>
          </div>

          <div className="timer-box">
            <div className="timer-value">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="timer-label">Giây</div>
          </div>
        </div>
      </div>
      <Divider
        logo="/images/leaf-1.png"
        logoSize="extra-large"
        width={500}
        height={500}
      />
    </section>
  );
};

export default Countdown;
