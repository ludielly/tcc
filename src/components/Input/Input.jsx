import React from 'react'
import './Input.css'
function Input({placeholder, type, startIcon, endIcon }) {
    
  return (
    <div>
        {startIcon && <span>{startIcon}</span>}
        <input placeholder={placeholder} type={type} />
        {endIcon && <span>{endIcon}</span>}
    </div>
  )
}

export default Input