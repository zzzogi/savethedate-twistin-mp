import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "./RSVP.css";
import Icon from "../Icon/Icon";

const RSVP = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    attending: "",
    withWho: "",
    guestOf: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const sectionRefs = useRef([]);

  // Use Netlify Function (no exposed API key!)
  const API_ENDPOINT = "/.netlify/functions/submit-rsvp";

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
      { threshold: 0.15 }
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Show appropriate modal
        if (formData.attending === "Có, tôi sẽ có mặt") {
          setModalType("attending");
        } else {
          setModalType("notAttending");
        }

        setShowModal(true);
        setSubmitted(true);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setFormData({
      name: "",
      message: "",
      attending: "",
      withWho: "",
      guestOf: "",
    });
    setShowModal(false);
    setSubmitted(false);
  };

  return (
    <section className="rsvp-section section">
      {/* Confetti */}
      {showModal && modalType === "attending" && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          gravity={0.3}
        />
      )}

      {/* Background decorations */}
      <div className="bg-decor bg-decor-11">
        <img src="/images/bird-2.png" alt="Bird Decoration" />
      </div>
      <div className="bg-decor bg-decor-12">
        <img src="/images/leaf-2.png" alt="Leaf Decoration" />
      </div>

      <div className="container">
        <div
          className={`rsvp-header animate-section ${
            visibleSections.includes(0) ? "visible" : ""
          }`}
          data-section="0"
          ref={addToRefs}
        >
          <h2 className="section-title">Xác Nhận Tham Dự</h2>
          <p className="section-subtitle">
            Vui lòng cho chúng tôi biết bạn có thể đến không
          </p>
        </div>

        <div
          className={`rsvp-form-container animate-section ${
            visibleSections.includes(1) ? "visible" : ""
          }`}
          data-section="1"
          ref={addToRefs}
        >
          <form className="rsvp-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Tên của bạn *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Gửi lời chúc</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Chúc hai bạn trăm năm hạnh phúc..."
                disabled={isSubmitting}
              ></textarea>
            </div>

            {/* Attending */}
            <div className="form-group">
              <label>Bạn sẽ đến chứ? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="attending"
                    value="Có, tôi sẽ có mặt"
                    checked={formData.attending === "Có, tôi sẽ có mặt"}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                  <span>Có, tôi sẽ có mặt</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="attending"
                    value="Không, rất tiếc tôi không thể tham gia"
                    checked={
                      formData.attending ===
                      "Không, rất tiếc tôi không thể tham gia"
                    }
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>Không, rất tiếc tôi không thể tham gia</span>
                </label>
              </div>
            </div>

            {/* With Who */}
            <div className="form-group">
              <label htmlFor="withWho">Bạn tham dự cùng ai?</label>
              <input
                type="text"
                id="withWho"
                name="withWho"
                value={formData.withWho}
                onChange={handleChange}
                placeholder="Một mình / Cùng gia đình / Cùng bạn bè..."
                disabled={isSubmitting}
              />
            </div>

            {/* Guest Of */}
            <div className="form-group">
              <label>Bạn là khách mời của ai? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="guestOf"
                    value="Chung Bảo"
                    checked={formData.guestOf === "Chung Bảo"}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                  <span>Chung Bảo</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="guestOf"
                    value="Minh Phương"
                    checked={formData.guestOf === "Minh Phương"}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>Minh Phương</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Đang gửi..."
                : submitted
                ? "✓ Đã Gửi!"
                : "Gửi Xác Nhận"}
            </button>
          </form>
        </div>
      </div>

      {/* Modal - Attending */}
      {showModal && modalType === "attending" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content invitation-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="invitation-header">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="invitation-logo"
              />
              <h2>Thiệp Mời Cưới</h2>
            </div>

            <div className="invitation-body">
              <p className="invitation-greeting">Kính gửi</p>
              <h3 className="invitation-name">{formData.name}</h3>

              <p className="invitation-text">
                Chúng tôi trân trọng kính mời bạn đến dự
                <br />
                Lễ cưới của
              </p>

              <div className="couple-names-modal">
                <span>Chung Bảo</span>
                <span className="ampersand">&</span>
                <span>Minh Phương</span>
              </div>

              <div className="invitation-details">
                <p>
                  <strong>Thời gian:</strong> 17:30, Chủ nhật 30/11/2025
                </p>
                <p>
                  <strong>Địa điểm:</strong> Trung Tâm Tiệc Cưới The One
                </p>
                <p className="venue-address">
                  Sảnh Sapphire - Tầng 2<br />
                  Số 2 Chương Dương Độ, Hà Nội
                </p>
              </div>

              <p className="invitation-footer">
                Sự hiện diện của bạn là vinh hạnh của chúng tôi!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Not Attending */}
      {showModal && modalType === "notAttending" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content sorry-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <Icon src="/images/touch.png" alt="Touch Icon" size="xxxl" />

            <h2>Rất Tiếc!</h2>

            <p className="sorry-text">
              Chúng tôi rất tiếc vì <strong>{formData.name}</strong> không thể
              tham dự.
              <br />
              Nhưng chúng tôi vẫn sẽ nhớ đến bạn trong ngày trọng đại này!
            </p>

            <p className="sorry-message">
              Cảm ơn bạn đã gửi lời chúc.
              <br />
              Hy vọng có cơ hội gặp lại bạn sớm!
            </p>

            <div className="couple-signature">
              <p>Chung Bảo & Minh Phương</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RSVP;
