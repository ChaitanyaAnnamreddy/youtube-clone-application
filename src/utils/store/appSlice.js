import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    collapsed: false,
  },
  reducers: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed
    },
  },
})

export const { toggleCollapsed } = appSlice.actions
export default appSlice.reducer
