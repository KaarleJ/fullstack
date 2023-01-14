import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'username',
  initialState: '',
  reducers: {
    setUsername(state, action) {
      const username = action.payload
      return username
    }
  }
})

export const { setUsername } = usernameSlice.actions

export default usernameSlice.reducer