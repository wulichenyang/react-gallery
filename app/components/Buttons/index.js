import React, { Component } from 'react'
import { Link } from 'react-router'
import '@styles/buttons.less'

export const Button = ({
  className = '',
  info = '',
  style = {},
  onClick = ()=>{},
  ...rest
}) => {
  const _className = !className ? 'btn' : `btn ${className}`
  return (
    <button 
      type="button"
      className={_className}
      style={{...style}}
      onClick={onClick}
      {...rest}
    >
      <span>
        {info}
      </span>
    </button>
  )
}