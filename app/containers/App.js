import React, { Component } from 'react';
import { Router, Route, Redirect, IndexRoute, hashHistory } from 'react-router'

import Index from '@components/Index'
import NotFound from '@pages/NotFound'
import Page3 from '@components/Page3'
import Home from '@pages/Home'
import Dustbin from '@pages/Dustbin'
import Finacial from '@pages/Finacial'

class App extends Component {
	render() {
		return (
      <Router history={hashHistory}>
        <Redirect from="/" to="/home" />  
        <Route path="/" component={Index}>
          {/* <IndexRoute component={Home} /> */}
          <Route path="/home" component={Home}/>
					<Route  path="/dustbin" component={Dustbin}/>
					<Route  path="/finacial" component={Finacial}/>
					<Route  path="/page3" component={Page3}/>
          <Route path="*" component={NotFound}/>  
        </Route>
      </Router>
      /* <Route path="/detail/:id" component={Detail}/>   */
		)
	}
}

export default App
