import { createStandaloneToast } from '@chakra-ui/react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IOrder, OrderStatusType } from 'types/order.types'
import axiosApi from 'utils/api'

export const fetchOrders = createAsyncThunk('order/fetch', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IOrder[]> = await axiosApi.get('order')
    return response.data
  } catch (error) {
    return rejectWithValue('Что-то пошло не так')
  }
})

const toast = createStandaloneToast({
  defaultOptions: {
    duration: 2000,
  },
})

export const addOrder = createAsyncThunk('order/add', async (_, { rejectWithValue }) => {
  try {
    await axiosApi.post('order')
    toast({
      title: 'Заказ успешно создан',
      status: 'success',
    })
  } catch (error) {
    return rejectWithValue('Error')
  }
})

export const searchOrders = createAsyncThunk(
  'order/search',
  async (searchStr: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IOrder[]> = await axiosApi.get(
        `order/search?orderNumber=${searchStr}`
      )
      return response.data
    } catch (error) {
      return rejectWithValue('Что-то пошло не так')
    }
  }
)

interface IChangeOrderStatusBody {
  orderId: number
  status: OrderStatusType
  rejectedMessage?: string
}

export const changeOrderStatus = createAsyncThunk(
  'order/change',
  async ({ orderId, status, rejectedMessage }: IChangeOrderStatusBody) => {
    const response: AxiosResponse<IOrder> = await axiosApi.put(`order/${orderId}`, {
      status,
      rejectedReason: rejectedMessage,
    })

    return response.data
  }
)
