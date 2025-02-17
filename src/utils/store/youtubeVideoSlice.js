import { createSlice } from '@reduxjs/toolkit'

const youtubeVideoSlice = createSlice({
  name: 'youtubeVideo',
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    clearItems: (state) => {
      state.items = []  
    },
  },
})

export const { setItems, clearItems } = youtubeVideoSlice.actions
export default youtubeVideoSlice.reducer
