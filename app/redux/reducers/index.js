import { combineReducers } from 'redux'
import todos from './Todo/todos'
import visibilityFilter from './Todo/visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter
})