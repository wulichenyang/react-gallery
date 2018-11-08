import React, { Component } from 'react'
import '@styles/footer.less'

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div className="footer-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Footer