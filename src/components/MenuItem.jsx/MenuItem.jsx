import React from "react";
import './MenuItem.css';

function MenuItem({ icon, text, isActive }) {
  const menuIcon = React.cloneElement(icon, { size: 20, weight: "fill" });

  return (
    <li className={isActive ? "menu-item active" : "menu-item"}>
      {menuIcon}
      <span>{text}</span>
    </li>
  );
}

export default MenuItem
