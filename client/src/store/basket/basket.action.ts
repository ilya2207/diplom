import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IBasket, IBasketItem } from 'types/basket.types'
import axiosApi from 'utils/api'
import { deleteBasketItemInStore, setBasketItemValue } from './basket.reducer'

export const fetchBasket = createAsyncThunk('basket/fetch', async (_, { rejectWithValue }) => {
  const response: AxiosResponse<IBasket> = await axiosApi.get('basket')
  return response.data.basketItems
})

export const addBasketItem = createAsyncThunk(
  'basket/add',
  async (data: IBasketItem, { rejectWithValue }) => {
    const response = await axiosApi.post('basket', data)
    console.log(response)
  }
)

export const editBasketItem = createAsyncThunk(
  'basket/edit',
  async (data: Partial<IBasketItem>, { dispatch }) => {
    const { amount, id } = data
    dispatch(setBasketItemValue({ itemId: id ?? 0, values: { amount } }))
    const response = await axiosApi.put('basket', data)
    console.log(response)
  }
)
export const deleteBasketItem = createAsyncThunk(
  'basket/delete',
  async (id: number, { dispatch }) => {
    dispatch(deleteBasketItemInStore(id))
    const response = await axiosApi.delete(`basket/${id}`)
    console.log(response)
  }
)
