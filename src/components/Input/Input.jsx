import React from 'react'
import './Input.css'
function Input({id, placeholder, type, startIcon: StartIcon, endIcon: EndIcon, handleChange, value }) {
    
  return (
    <div className="input-container">
      {StartIcon && <StartIcon size={16} weight="bold" className="icon start" />}
      <input id={id} className="input" placeholder={placeholder} type={type} onChange={handleChange} value={value} />
      {EndIcon && <EndIcon size={16} weight="bold" className="icon end" />}
    </div>
  )
}

export default Input