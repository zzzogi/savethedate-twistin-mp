import "./Divider.css";

const Divider = ({ logo = "/images/logo.png", logoSize = "medium" }) => {
  return (
    <div className="divider-container">
      <div className="divider-line"></div>
      <div className={`divider-logo ${logoSize}`}>
        <img src={logo} alt="Divider" />
      </div>
      <div className="divider-line"></div>
    </div>
  );
};

export default Divider;
