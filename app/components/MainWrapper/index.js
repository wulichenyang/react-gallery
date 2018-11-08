import React, { Component } from 'react'
import './index.less'

class MainWrapper extends Component {
	render() {
		return (
			<div className="main-wrapper">
        {this.props.children}
      </div>
		)
	}
}

export default MainWrapper;