import React from 'react'
import './Input.css'
function Input({id, placeholder, type, startIcon: StartIcon, endIcon: EndIcon, handleChange, value, className }) {
    
  return (
    <div className={`input-container ${className || ''}`}>
      {StartIcon && <StartIcon size={16} weight="bold" className="icon start" />}
      <input id={id} className="input" placeholder={placeholder} type={type} onChange={handleChange} value={value} required />
      {EndIcon && <EndIcon size={16} weight="bold" className="icon end" />}
    </div>
  )
}

export default Input