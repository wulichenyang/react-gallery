import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => {
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
}

Todo.protoType = {
  onClick:PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo