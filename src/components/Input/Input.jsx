import React from 'react'
import './Input.css'
function Input({id, placeholder, type, startIcon: StartIcon, endIcon: EndIcon }) {
    
  return (
    <div className="input-box">
      {StartIcon && <StartIcon size={16} weight="bold" className="icon start" />}
      <input id={id} className="input" placeholder={placeholder} type={type} />
      {EndIcon && <EndIcon size={16} weight="bold" className="icon end" />}
    </div>
  )
}

export default Input