import React, { Component, Fragment } from 'react'
import ContentBanner from '@components/ContentBanner'
import MainWrapper from '@components/MainWrapper'

class Home extends Component {
	render() {
		return (
			<Fragment>
				<ContentBanner title="Welcome"></ContentBanner>
				<MainWrapper></MainWrapper>
			</Fragment>
		)
	}
}

export default Home;