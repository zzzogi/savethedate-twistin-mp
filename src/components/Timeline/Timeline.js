import { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import "./Timeline.css";

const Timeline = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const timelineEvents = [
    {
      icon: "/images/bow.png",
      time: "17:30",
      title: "Đón khách",
      description:
        "Checkin với photobooth và gửi lời chúc phúc tới Cô Dâu - Chú Rể",
    },
    {
      icon: "/images/cake.png",
      time: "18:00",
      title: "Lễ thành hôn",
      description:
        "Cùng nhau chứng kiến khoảnh khắc thiêng liêng cùng Cô Dâu - Chú Rể",
    },
    {
      icon: "/images/champagne.png",
      time: "18:30",
      title: "Khai tiệc",
      description: "Cùng nhau ăn tiệc và nâng ly chúc mừng Cô Dâu - Chú Rể",
    },
  ];

  return (
    <section className="timeline-section">
      {/* Hero Image with Title - RESPONSIVE IMAGES */}
      <div className="timeline-hero">
        <picture>
          <source
            media="(min-width: 769px)"
            srcSet="/images/timeline-hero-desktop.webp"
          />
          <source
            media="(max-width: 768px)"
            srcSet="/images/timeline-hero-mobile.webp"
          />
          <img src="/images/timeline-hero-desktop.webp" alt="Timeline" />
        </picture>
        <div className="timeline-hero-overlay">
          <h2 className="timeline-hero-title">Timeline</h2>
        </div>
      </div>

      {/* Timeline Events - NO BACKGROUND/SHADOW/BORDER */}
      <div className="timeline-events-section">
        {/* Background decorations */}
        <div className="bg-decor bg-decor-timeline-1">
          <img src="/images/bird-2.png" alt="Bird Decoration 2" />
        </div>
        <div className="bg-decor bg-decor-timeline-2">
          <img src="/images/bird-1.png" alt="Bird Decoration 1" />
        </div>

        <div className="container">
          <div className="timeline-events-list">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-event-item animate-section ${
                  visibleSections.includes(index) ? "visible" : ""
                }`}
                data-section={index}
                ref={addToRefs}
              >
                {/* Icon */}
                <div className="timeline-event-icon">
                  <Icon src={event.icon} alt={event.title} size="xl" />
                </div>

                {/* Time */}
                <div className="timeline-event-time">{event.time}</div>

                {/* Content */}
                <div className="timeline-event-content">
                  <h3 className="timeline-event-title">{event.title}</h3>
                  <p className="timeline-event-description">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
