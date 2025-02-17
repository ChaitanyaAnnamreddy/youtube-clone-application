import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import youtubeVideoSlice from './youtubeVideoSlice'

const appStore = configureStore({
  reducer: {
    app: appSlice,
    youtubeVideo: youtubeVideoSlice,
  },
})

export default appStore
