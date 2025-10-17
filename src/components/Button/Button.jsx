import React from 'react'
import './Button.css'

function Button({icon, text, handleClick, type}) {
  var btnIcon;
  if (icon) {
    btnIcon = React.cloneElement(icon, { size: 16, weight: "bold" });
  } else {
    btnIcon = null
  }
  
  return (
    <button className={type === "outline" ? "btn outline" : "btn primary"} onClick={handleClick}>
      {btnIcon}
      {text}
    </button>
  )
}

export default Button
