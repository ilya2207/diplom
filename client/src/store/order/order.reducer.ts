import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder } from 'types/order.types'
import { changeOrderStatus, fetchOrders, searchOrders } from './order.action'

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
    builder.addCase(searchOrders.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload
    })
    builder.addCase(changeOrderStatus.fulfilled, (state, action: PayloadAction<IOrder>) => {
      for (let order of state.orders) {
        if (order.id === action.payload.id) {
          order.status = action.payload.status
          order.rejectedReason = action.payload.rejectedReason
        }
      }
    })
  },
})

export default orderSlice
