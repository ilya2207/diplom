import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { categorySlice } from './catalog/category.slice'
import { modelSlice } from './model/model.slice'
import { authApi } from './services/auth'
import { userSlice } from './user/user.slice'
// import { userSlice } from './slices/userSlice'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  category: categorySlice.reducer,
  model: modelSlice.reducer,
  // [authApi.reducerPath]: authApi.reducer,
})
const stateFromLocalStorage = localStorage.getItem('store')
const serializedstateFromLocalStorage = stateFromLocalStorage
  ? JSON.parse(stateFromLocalStorage)
  : {}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: serializedstateFromLocalStorage,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

store.subscribe(() => {
  const state = store.getState()

  const serializedState = JSON.stringify({ user: state.user })
  localStorage.setItem('store', serializedState)
})
