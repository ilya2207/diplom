import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { adminSlice } from './admin/admin.slice'
import basketSlice from './basket/basket.reducer'
import { categorySlice } from './catalog/category.slice'
import { detailSlice } from './detail/detail.reducer'
import { modelSlice } from './model/model.slice'
import orderSlice from './order/order.reducer'
import { userSlice } from './user/user.slice'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  category: categorySlice.reducer,
  model: modelSlice.reducer,
  detail: detailSlice.reducer,
  basket: basketSlice.reducer,
  order: orderSlice.reducer,
  admin: adminSlice.reducer,
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

  const serializedState = JSON.stringify({
    user: state.user,
    detail: { ...state.detail, items: [] },
  })
  localStorage.setItem('store', serializedState)
})
