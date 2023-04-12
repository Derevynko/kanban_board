import React from "react";
import "./Button.css";
const Button = ({ name, onClick, state, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${state ? "submit" : ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
