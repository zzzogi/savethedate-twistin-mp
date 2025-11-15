import React from "react";
import "./Icon.css";

const Icon = ({
  src,
  alt = "Icon",
  size = "medium",
  className = "",
  style = {},
}) => {
  return (
    <span className={`icon-wrapper ${size} ${className}`} style={style}>
      <img src={src} alt={alt} className="icon-image" />
    </span>
  );
};

export default Icon;
