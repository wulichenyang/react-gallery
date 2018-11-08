import React, { Component } from 'react';
import { Router, Route, Redirect, IndexRoute, hashHistory } from 'react-router'

import Home from '@components/Home'
import Index from '@components/Index'
import NotFound from '@components/NotFound'
import Page1 from '@components/Page1'
import Page2 from '@components/Page2'
import Page3 from '@components/Page3'

class App extends Component {
	render() {
		return (
      <Router history={hashHistory}>
        <Redirect from="/" to="/home" />  
        <Route path="/" component={Index}>
          {/* <IndexRoute component={Home} /> */}
          <Route path="/home" component={Home}/>
					<Route  path="/page1" component={Page1}/>
					<Route  path="/page2" component={Page2}/>
					<Route  path="/page3" component={Page3}/>
          <Route path="*" component={NotFound}/>  
        </Route>
      </Router>
      /* <Route path="/detail/:id" component={Detail}/>   */
		)
	}
}

export default App
