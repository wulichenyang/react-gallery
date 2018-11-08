import React, { Component, Fragment } from 'react'
import ContentBanner from '@components/ContentBanner'
import MainWrapper from '@components/MainWrapper'

class Home extends Component {
	render() {
		return (
			<Fragment>
				<div className="content-banner">
					<ContentBanner title="Welcome"></ContentBanner>
				</div>
				<MainWrapper></MainWrapper>
			</Fragment>
		)
	}
}

export default Home;