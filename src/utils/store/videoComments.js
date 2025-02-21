import { createSlice } from '@reduxjs/toolkit'

const videoComments = createSlice({
  name: 'videoComments',
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { setItems } = videoComments.actions
export default videoComments.reducer
