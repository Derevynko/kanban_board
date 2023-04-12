import React from "react";
import "./ListItem.css";
const ListItem = ({ todoName, id }) => {
  return (
    <div className="table__listItem" id={id}>
      <a href={id}>{todoName}</a>
    </div>
  );
};

export default ListItem;
