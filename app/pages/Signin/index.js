import React, { Component } from 'react'
import './index.less'
import LoginForm from '@components/LoginForm'

class Signin extends Component {
  render() {
    return (
      <div id="login">
        <div className="bg-hover"></div>
        <div className="login-wrapper"> 
          <h1 className="login-header">Sign in</h1>
          <LoginForm />
        </div>
      </div>
    )
  }
}

export default Signin