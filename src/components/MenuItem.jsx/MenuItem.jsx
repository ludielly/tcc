import React from "react";
import './MenuItem.css';
import { NavLink } from "react-router-dom";

function MenuItem({ icon, text, page }) {
  const menuIcon = React.cloneElement(icon, { size: 22, weight: "fill" });

  return (
    <NavLink to={page} className="menu-item">
      {menuIcon}
      {text}
    </NavLink>
  );
}

export default MenuItem
