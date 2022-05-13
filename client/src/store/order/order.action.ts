import { createStandaloneToast } from '@chakra-ui/react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IOrder } from 'types/order.types'
import axiosApi from 'utils/api'

export const fetchOrders = createAsyncThunk('order/fetch', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IOrder[]> = await axiosApi.get('order')
    console.log(response)
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
    const response = await axiosApi.post('order')

    toast({
      title: 'Заказ успешно создан',
      status: 'success',
    })
  } catch (error) {
    return rejectWithValue('Error')
  }
})
