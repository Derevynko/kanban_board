import React from "react";
import "./DropDown.css";
const DropDown = ({ todoList, onChange, titleName }) => {
  return (
    <select onChange={onChange} className="drop__list">
      <option selected disabled hidden></option>
      {Object.keys(todoList)?.map((key) => {
        return (
          <option className="drop__container__item">{todoList[key]}</option>
        );
      })}
    </select>
  );
};
export default DropDown;
