import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/auth'
import { userSlice } from './slices/userSlice'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
