import { createSlice } from '@reduxjs/toolkit'

interface IOrderState {
  orders: any[]
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
})

export default orderSlice
