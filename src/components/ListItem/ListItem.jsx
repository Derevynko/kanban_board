import React from "react";
import "./ListItem.css";
const ListItem = ({ todoName, id, updateData }) => {
  return (
    <div className="table__listItem" id={id}>
      <a
        onClick={() => {
          updateData(todoName, id);
        }}
        href={id}
      >
        {todoName}
      </a>
    </div>
  );
};

export default ListItem;
