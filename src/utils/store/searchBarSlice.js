import { createSlice } from '@reduxjs/toolkit'

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: {
    items: {},
  },
  reducers: {
    storeSearchResult: (state, action) => {
      state = Object.assign(state, action.payload)
    },
  },
})

export const { storeSearchResult } = searchBarSlice.actions
export default searchBarSlice.reducer
