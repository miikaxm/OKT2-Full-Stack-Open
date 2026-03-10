import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,

  reducers: {

    set(state, action) {      
      return action.payload
    },

    clear() {
      return null
    }

  }
})

export const { set, clear } = userSlice.actions

export const appendUser = (user) => {
  return async (dispatch) => {
    dispatch(set(user))
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch(set(user))
    return user
  }
}

export default userSlice.reducer