import { configureStore } from '@reduxjs/toolkit'

import userDataReducer from './redux/userDataSlice'

export default configureStore({
  reducer: {
    userData: userDataReducer,
  },
})