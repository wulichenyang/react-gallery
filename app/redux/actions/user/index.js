import { SET_USER_INFO, CLEAR_USER_INFO } from '../../actionTypes'

export const setUserInfo = username => ({
  type: SET_USER_INFO,
  payload: {
    username
  }
})

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
})