import React, { Component, Fragment } from 'react'
import ContentBanner from '@components/ContentBanner'
import MainWrapper from '@components/MainWrapper'

import './index.less'

class Dustbin extends Component {
	render() {
		return (
			<Fragment>
				<ContentBanner title="Collection & Dustbin"></ContentBanner>
				<MainWrapper></MainWrapper>
			</Fragment>
		)
	}
}

export default Dustbin;