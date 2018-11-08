import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button } from '@components/Buttons'

import '@styles/header.less'

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="nav-wrapper">
          <div id="logo">
            <Link to="/home" className="logo">
              <img alt="dribbble" src="/images/logo.png" />
            </Link>
          </div>
          <ul role="nav" className="nav">
            <li>
              <Link to="/home" activeClassName="active">home</Link>
            </li>
            <li>
              <Link to="/page1" activeClassName="active">page1</Link>
            </li>
            <li>
              <Link to="page2" activeClassName="active">page2</Link>
            </li>
            <li>
              <Link to="page3" activeClassName="active">page3</Link>
            </li>
          </ul>
        </div>
        <div className="banner-wrapper">
          <h3><span>Ready to come?&nbsp;&nbsp;</span>Welcome to my React!</h3>
          <div className="hello">
            <Link to="/home">
              <Button info="Hello →"></Button>
            </Link>
          </div>
        </div>
        <div className="banner-bottom">
          <p>Looking to hire a designer? <Link to="/">Learn more</Link></p>
        </div>
      </header>
    )
  }
}

export default Header