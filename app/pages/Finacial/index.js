import React, { Component, Fragment } from 'react';
import ContentBanner from '@components/ContentBanner'
import MainWrapper from '@components/MainWrapper'
import FinacialTable from '@components/FinacialTable'
import './index.less'

class Finacial extends Component {
  render() {
    return (
      <Fragment>
        <ContentBanner title="Table Test"></ContentBanner>
        <MainWrapper>
          <div className="finacial-wrapper">
            <FinacialTable></FinacialTable>
          </div>
        </MainWrapper>
      </Fragment>
    )
  }
}

export default Finacial