import React from "react";
import "./DropDown.css";
const DropDown = ({ todoList, onChange, titleName }) => {
  return (
    <select onChange={onChange} className="drop__list">
      <option selected disabled hidden></option>
      {todoList?.map((todoStr) => {
        let index = 0;
        index += 1;
        return (
          <option key={titleName + { index }} className="drop__container__item">
            {todoStr}
          </option>
        );
      })}
    </select>
  );
};
export default DropDown;
