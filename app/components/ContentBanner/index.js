import React, { Component } from 'react'
import './index.less'

class ContentBanner extends Component {
  render() {
    return (
      <div className="content-banner">
        <div className="banner-wrapper">
          <h2>{this.props.title}</h2>
        </div>
      </div>
    )
  }
}

export default ContentBanner