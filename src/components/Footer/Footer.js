import React from "react";
import "./Footer.css";
import Icon from "../Icon/Icon";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <Icon src="/images/logo.png" alt="Wedding Rings Icon" size="xxxl" />

          <h2 className="footer-title">Cảm Ơn Bạn</h2>

          <p className="footer-text">
            Sự hiện diện của bạn là món quà quý giá nhất dành cho chúng tôi.
            <br />
            Rất hân hạnh được đón tiếp bạn trong ngày trọng đại này!
          </p>

          <div className="footer-bottom">
            <p className="footer-date">30 • 11 • 2025</p>
            <p className="copyright">© 2025 Chung Bảo & Minh Phương</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
