import { createSlice } from '@reduxjs/toolkit'

const initialState = { state: null, color: 'green' }

let id = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const notification = action.payload
      return notification
    },
  },
})

export const { addNotification } = notificationSlice.actions

export const setNotification = (msg, duration) => {
  return (dispatch) => {
    dispatch(addNotification(msg))
    clearTimeout(id)
    id = setTimeout(() => {
      dispatch(addNotification({ state: null, color: 'green' }))
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
