import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const basketState = (state: RootState) => state.basket

export const getBasketTotalAmount = createDraftSafeSelector(basketState, ({ items }) => {
  let res = 0
  items.forEach((item) => {
    res += (item.detail?.price ?? 0) * item.amount
  })
  return res
})
