import { createStandaloneToast } from '@chakra-ui/react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from 'utils/api'

const toast = createStandaloneToast({
  defaultOptions: {
    duration: 2000,
  },
})
export const addOrder = createAsyncThunk('order/add', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('order')

    console.log(response)
    toast({
      title: 'Заказ успешно создан',
      status: 'success',
    })
  } catch (error) {
    return rejectWithValue('Error')
  }
})
