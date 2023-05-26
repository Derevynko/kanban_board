import React from "react";
import "./UserMenu.css";
import UserAvatar from "./pictures/user-avatar.png";
import DropDownMenu from "./pictures/Vector.png";
const UserMenu = ({ onClick }) => {
  return (
    <>
      <div className="user_menu">
        <img src={UserAvatar} alt="" />
        <div className="user_menu__dropdown-activated" onClick={onClick}>
          <img src={DropDownMenu} alt="Avatar" />
        </div>
        <div className="user_menu__dropdown-container">
          <div className="user_menu__dropdown-container__picture"></div>

          <a href="/" className="user_menu__dropdown">
            Profile
          </a>
          <a href="/" className="user_menu__dropdown">
            Log Out
          </a>
        </div>
      </div>
    </>
  );
};
export default UserMenu;
