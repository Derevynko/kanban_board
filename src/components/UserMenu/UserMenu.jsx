import React from "react";
import "./UserMenu.css";
import UserAvatar from "./pictures/user-avatar.png";
import DropDownMenu from "./pictures/Vector.png";
const UserMenu = () => {
  return (
    <>
      <div className="user_menu">
        <img src={UserAvatar} alt="" />
        <img src={DropDownMenu} alt="" />
      </div>
    </>
  );
};
export default UserMenu;
