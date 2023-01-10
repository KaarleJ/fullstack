import { createSlice } from '@reduxjs/toolkit'

const filterAtStart = null

const initialState = filterAtStart

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    newFilter(state, action) {
      const filter = action.payload
      return filter
    }
  }

})

export const { newFilter } = filterSlice.actions
export default filterSlice.reducer