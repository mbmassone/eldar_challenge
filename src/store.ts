import { configureStore } from '@reduxjs/toolkit'

import userDataReducer from './features/userData/userDataSlice'

export default configureStore({
  reducer: {
    userData: userDataReducer,
  },
})