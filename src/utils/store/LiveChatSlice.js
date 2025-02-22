import { createSlice } from '@reduxjs/toolkit'

const liveChatSlice = createSlice({
  name: 'liveChat',
  initialState: {
    messages: [], // Messages array
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
      if (state.messages.length > 50) {
        state.messages.shift()
      }
    },
  },
})

export const { addMessage } = liveChatSlice.actions
export default liveChatSlice.reducer
