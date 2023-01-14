import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      return blogs
    }
  }
})
export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer
