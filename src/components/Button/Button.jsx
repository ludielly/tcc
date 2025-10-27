import React from 'react'
import './Button.css'

function Button({icon: Icon, handleClick, className, children, iconWeight}) {  
  return (
    <button className={`btn ${className || ''}`} onClick={handleClick}>
      {Icon && <Icon size={18} weight={iconWeight === "fill" ? "fill" : "bold"} />}
      {children}
    </button>
  )
}

export default Button
