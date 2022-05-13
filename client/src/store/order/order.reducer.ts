import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder } from 'types/order.types'
import { fetchOrders } from './order.action'

interface IOrderState {
  orders: IOrder[]
  loading: boolean
}
const OrderState: IOrderState = {
  orders: [],
  loading: false,
}
const orderSlice = createSlice({
  initialState: OrderState,
  name: 'order',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload
    })
  },
})

export default orderSlice
