import { createSlice } from '@reduxjs/toolkit'

const passwordSlice = createSlice({
  name: 'password',
  initialState: '',
  reducers: {
    setPassword(state, action) {
      const password = action.payload
      return password
    }
  }
})

export const { setPassword } = passwordSlice.actions

export default passwordSlice.reducer