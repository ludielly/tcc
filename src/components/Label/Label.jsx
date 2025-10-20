import React from 'react'
import "./Label.css"

function Label({id, children}) {
  return (
    <label htmlFor={id}>{children}</label>
  )
}

export default Label