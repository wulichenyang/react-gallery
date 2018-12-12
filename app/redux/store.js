import { createStore, applyMiddleware } from 'redux';
import rootReducer from '@reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

if (module.hot) {
  module.hot.accept('@reducers', () => {
    const nextCombineReducers = require('@reducers').default
    store.replaceReducer(nextCombineReducers)
  })
}


export default store