import React from 'react'
import "./Input.css"

function Select({id, children}) {
  return (
    <select id={id} className='select'>
      {children}
    </select>
  )
}

export default Select