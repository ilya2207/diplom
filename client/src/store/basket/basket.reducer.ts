import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBasketItem } from 'types/basket.types'
import { fetchBasket } from './basket.action'

interface IBasketState {
  loading: boolean
  error: string
  items: IBasketItem[]
}

const BasketState: IBasketState = {
  error: '',
  loading: false,
  items: [],
}

const basketSlice = createSlice({
  initialState: BasketState,
  name: 'basket',
  reducers: {
    setBasketItemValue: (
      state,
      action: PayloadAction<{ itemId: number; values: Partial<IBasketItem> }>
    ) => {
      const { itemId, values } = action.payload
      const items = state.items
      for (let index = 0; index < items.length; index++) {
        const element = items[index]
        if (element.id === itemId) {
          if (values.amount) {
            element.amount = values.amount
          }
        }
      }
    },
    deleteBasketItemInStore: (state, action: PayloadAction<number>) => {
      const items = state.items
      for (let index = 0; index < items.length; index++) {
        const element = items[index]
        if (element.id === action.payload) {
          items.splice(index, 1)
          break
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.fulfilled, (state, action) => {
      state.items = action.payload
    })
  },
})

export const { setBasketItemValue, deleteBasketItemInStore } = basketSlice.actions
export default basketSlice
