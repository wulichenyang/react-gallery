import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button } from '@components/Buttons'

import './index.less'

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
              <Link to="/home" activeClassName="active">Home</Link>
            </li>
            <li>
              <Link to="/dustbin" activeClassName="active">Dustbin</Link>
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