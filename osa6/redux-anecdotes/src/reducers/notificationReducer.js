import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: ''
  },
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return { message: '' }
    }
  }
})

export const { set, clear } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(set({ message }))

    setTimeout(() => {
      dispatch(clear())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer