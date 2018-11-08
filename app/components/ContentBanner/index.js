import React, { Component } from 'react'
import '@styles/content.less'

class ContentBanner extends Component {
  render() {
    return (
      <div className="banner-wrapper">
        <h2>{this.props.title}</h2>
      </div>
    )
  }
}

export default ContentBanner