import React from 'react'
import './Button.css'

function Button({icon: Icon, text, handleClick, type}) {  
  return (
    <button className={type === "secondary" ? "btn secondary" : "btn primary"} onClick={handleClick}>
      {Icon && <Icon size={16} weight="bold" />}
      {text}
    </button>
  )
}

export default Button
