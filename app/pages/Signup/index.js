import React, { Component } from 'react'
import './index.less'
import RegisterForm from '@components/RegisterForm'

class Signup extends Component {
  render() {
    return (
      <div id="register">
        <div className="bg-hover"></div>
        <div className="register-wrapper">
          <h1 className="register-header">Sign up</h1>
          <RegisterForm />
        </div>
      </div>
    )
  }
}

export default Signup