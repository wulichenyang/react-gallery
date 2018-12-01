import React, { Component } from 'react';
import { Router, Route, Redirect, IndexRoute, hashHistory } from 'react-router'
import { message } from 'antd'

import Index from '@components/Index'
import Page3 from '@components/Page3'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import Dustbin from '@pages/Dustbin'
import Finacial from '@pages/Finacial'
import Signup from '@pages/Signup'
import Signin from '@pages/Signin'
import cookie from '@utils/cookie'

class App extends Component {
  // 登录验证 路由改变时刷新cookie中的token过期时间 0.2小时
  requireAuth = (nextState, replace) => {
    let token = cookie.getCookie('token')
    if (!token) { // 未登录
      message.info('请登录')
      replace({
        pathname: '/signin',
        // state: { nextPathname: nextState.location.pathname }
      });
    } else { // 刷新token在cookie里的时间
      cookie.setCookie('token', token, 0.2)
    }
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Redirect from="/" to="/home" />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/" component={Index}>
          {/* <IndexRoute component={Home} /> */}
          <Route path="/home" component={Home} onEnter={this.requireAuth} />
          <Route path="/dustbin" component={Dustbin} onEnter={this.requireAuth} />
          <Route path="/finacial" component={Finacial} onEnter={this.requireAuth} />
          <Route path="/page3" component={Page3} onEnter={this.requireAuth} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
      /* <Route path="/detail/:id" component={Detail}/>   */
    )
  }
}

export default App
