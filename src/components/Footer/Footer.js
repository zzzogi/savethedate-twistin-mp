import Icon from "../Icon/Icon";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <Icon src="/images/logo.png" alt="Wedding Rings Icon" size="xxxl" />

          <h2 className="footer-title">Thank You!</h2>

          <p className="footer-text">
            Cảm ơn bạn đã dành tình cảm cho chúng mình! Sự hiện diện của bạn
            chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi
            được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.
          </p>

          <div className="footer-bottom">
            <p className="footer-date">30 • 11 • 2025</p>
            <p className="copyright">
              © {new Date().getFullYear()} Chung Bảo & Minh Phương.
            </p>
            <p
              className="copyright"
              style={{
                marginTop: "8px",
              }}
            >
              Made by{" "}
              <a
                href="https://www.facebook.com/buiv1etquyen/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Quyền Bùi
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
