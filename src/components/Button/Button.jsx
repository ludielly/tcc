import React from 'react'
import './Button.css'

function Button({icon: Icon, handleClick, type, children}) {  
  return (
    <button className={type === "secondary" ? "btn secondary" : "btn primary"} onClick={handleClick}>
      {Icon && <Icon size={16} weight="bold" />}
      {children}
    </button>
  )
}

export default Button
