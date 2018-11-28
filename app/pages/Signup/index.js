import React, { Component } from 'react'
import './index.less'
import RegisterForm from '@components/RegisterForm'

class Signup extends Component {
  render() {
    return (
      <div id="register">
        <div className="bg-hover"></div>
        <div className="login-wrapper">
          <RegisterForm />
        </div>
      </div>
    )
  }
}

export default Signup