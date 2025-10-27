import React from 'react'
import "./Input.css"

function Select({id, children, className, handleChange, value}) {
  return (
    <select id={id} className={`select ${className || ''}`} onChange={handleChange} value={value}>
      {children}
    </select>
  )
}

export default Select