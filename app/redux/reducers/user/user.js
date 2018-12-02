import { SET_USER_INFO, CLEAR_USER_INFO } from '../../actionTypes'

const initialState = {
  username: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO: {
      const { username } = action.payload
      return {
        ...state,
        username,
      }
    }
    case CLEAR_USER_INFO: {
      return {
        username: '',
      }
    }
    default:
      return state
  }
}