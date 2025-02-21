import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import youtubeVideoSlice from './youtubeVideoSlice'
import youtubeShortsSlice from './youtubeShortsSlice'

const appStore = configureStore({
  reducer: {
    app: appSlice,
    youtubeVideo: youtubeVideoSlice,
    youtubeShorts: youtubeShortsSlice,
  },
})

export default appStore
