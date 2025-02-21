import { createSlice } from '@reduxjs/toolkit'

const youtubeVideoSlice = createSlice({
  name: 'youtubeVideo',
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      // Merge new items with existing ones, ensuring no duplicates
      const newItems = action.payload
      const existingIds = new Set(state.items.map((item) => item.id))

      const mergedItems = [
        ...state.items,
        ...newItems.filter((item) => !existingIds.has(item.id)), // Only add new videos
      ]

      state.items = mergedItems
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
    addFetchedVideo: (state, action) => {
      const video = action.payload
      if (!state.items.some((item) => item.id === video.id)) {
        state.items.push(video)
      }
    },
  },
})

export const { setItems, clearItems, updateVideoLikes, addFetchedVideo } =
  youtubeVideoSlice.actions
export default youtubeVideoSlice.reducer
