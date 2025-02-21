import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import youtubeVideoSlice from './youtubeVideoSlice'
import youtubeShortsSlice from './youtubeShortsSlice'
import videoComments from './videoComments'

const appStore = configureStore({
  reducer: {
    app: appSlice,
    youtubeVideo: youtubeVideoSlice,
    youtubeShorts: youtubeShortsSlice,
    videoComments: videoComments,
  },
})

export default appStore
