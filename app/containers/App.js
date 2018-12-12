import React, { Component } from 'react';
import { Router, Route, Redirect, IndexRoute, hashHistory } from 'react-router'

import { requireAuth } from '@utils/auth'
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
  render() {
    return (
      <Router history={hashHistory}>
        <Redirect from="/" to="/home" />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/" component={Index}>
          {/* <IndexRoute component={Home} /> */}
          <Route path="/home" component={Home} onEnter={requireAuth} />
          <Route path="/dustbin" component={Dustbin} onEnter={requireAuth} />
          <Route path="/finacial" component={Finacial} onEnter={requireAuth} />
          <Route path="/page3" component={Page3} onEnter={requireAuth} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
      /* <Route path="/detail/:id" component={Detail}/>   */
    )
  }
}

export default App
