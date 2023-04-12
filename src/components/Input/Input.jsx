import React from "react";
import "./Input.css";
const Input = ({ onChangeInput, inputValue }) => {
  return (
    <input
      className="table__input"
      type="text"
      onChange={onChangeInput}
      value={inputValue}
    ></input>
  );
};

export default Input;
