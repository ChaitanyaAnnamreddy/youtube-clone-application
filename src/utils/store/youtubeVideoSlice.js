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
    updateVideoLikes: (state, action) => {
      const { videoId, likes } = action.payload
      const video = state.items.find((item) => item.id === videoId)
      if (video) {
        video.statistics.likeCount = likes
      }
    },
  },
})

export const { setItems, clearItems, updateVideoLikes } =
  youtubeVideoSlice.actions
export default youtubeVideoSlice.reducer
