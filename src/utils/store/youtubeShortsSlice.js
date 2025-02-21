import { createSlice } from '@reduxjs/toolkit'

const youtubeShortsSlice = createSlice({
  name: 'youtubeShorts',
  initialState: {
    items: [
      
    ],
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

export const { setItems, clearItems } = youtubeShortsSlice.actions
export default youtubeShortsSlice.reducer
