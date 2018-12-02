import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import { Button } from '@components/Buttons'
import { setUserInfo, clearUserInfo } from '@actions/user'
// import { SET_USER_INFO, CLEAR_USER_INFO } from '../../redux/actionTypes.js';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon, Popconfirm, message } from 'antd';
import cookie from '@utils/cookie'

import './index.less'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  signOutConfirm = (e) => {
    this.signout()
    message.success('注销成功')
  }

  signOutCancel = (e) => {
    // message.error('Click on No')
  }

  signout() {
    this.props.clearUserInfo()
    cookie.removeCookie('token')
    hashHistory.push('/signin')
  }

  componentDidMount() {
    let username = cookie.getCookie('username')
    this.props.setUserInfo(username)
  }

  render() {
    return (
      <header id="header">
        <div className="nav-wrapper">
          <div id="logo">
            <Link to="/home" className="logo">
              <img alt="dribbble" src="/images/logo.png" />
            </Link>
          </div>
          <nav role="nav" className="nav">
            <li>
              <Link to="/home" activeClassName="active">Home</Link>
            </li>
            <li>
              <Link to="/dustbin" activeClassName="active">Dustbin</Link>
            </li>
            <li>
              <Link to="/finacial" activeClassName="active">Finacial</Link>
            </li>
            <li>
              <Link to="page3" activeClassName="active">page3</Link>
            </li>
          </nav>
          <div className="user-info">
            <span className="user-name">Hi!&nbsp;{this.props.username}</span>
            <Link to="/signup">
              <Icon type="form"></Icon>
              <span>注册</span>
            </Link>
            <Popconfirm title="确认注销吗?" onConfirm={this.signOutConfirm} onCancel={this.signOutCancel} okText="Yes" cancelText="No">
              <a><Icon type="logout"></Icon><span>注销</span></a>
            </Popconfirm>
          </div>
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

const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
  username: state.user.username
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatching plain actions
    ...bindActionCreators({ setUserInfo, clearUserInfo }, dispatch)
    // clearUserInfo: () => dispatch({ type: CLEAR_USER_INFO })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)