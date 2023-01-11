import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = null

let id = null

const initialState = notificationAtStart

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const notification = action.payload
      return notification
    }
  }

})

export const { addNotification } = notificationSlice.actions

export const setNotification = (msg, duration) => {
  return dispatch => {
    dispatch(addNotification(msg))
    clearTimeout(id)
    id = setTimeout(() => {
      dispatch(addNotification(null))
    }, duration*1000)
  }
}

export default notificationSlice.reducer