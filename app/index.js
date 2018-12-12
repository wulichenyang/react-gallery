import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Icon, Button, Input, Form, Checkbox } from 'antd'
import VanillaTilt from 'vanilla-tilt'
import App from '@containers/App'
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios'
import { AppContainer } from 'react-hot-loader'

import '@styles/reset.css'
import '@styles/main.less'
import '@styles/theme.less'

const rootElement = document.getElementById('root')

const renderWithHotReload = (element) => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          {element}
        </Provider>
      </AppContainer>,
      rootElement
    )
}
/*初始化 render */
renderWithHotReload(<App />);

/*热更新*/
if (module.hot) {
    module.hot.accept('@containers/App', () => {
        const getRouter = require('@containers/App').default;
        renderWithHotReload(<App />);
    });
}