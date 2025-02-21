import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import youtubeVideoSlice from './youtubeVideoSlice'
import youtubeShortsSlice from './youtubeShortsSlice'
import videoComments from './videoComments'
import searchBarSlice from './searchBarSlice'

const appStore = configureStore({
  reducer: {
    app: appSlice,
    youtubeVideo: youtubeVideoSlice,
    youtubeShorts: youtubeShortsSlice,
    videoComments: videoComments,
    searchBar: searchBarSlice,
  },
})

export default appStore
