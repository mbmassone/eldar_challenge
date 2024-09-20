import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'userData',
  initialState: {
    name: '',
    profile: '',
  },
  reducers: {
    setName: (state, action) => {
        state.name = action.payload
    },
    setProfile: (state, action) => {
        state.profile = action.payload
    },
  },
})

export const { setName, setProfile } = counterSlice.actions

export default counterSlice.reducer