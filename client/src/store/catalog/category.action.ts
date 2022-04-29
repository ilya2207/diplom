// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ICategoryItem } from 'types/category.types'
import axiosApi from 'utils/api'

export const fetchCategoryItems = createAsyncThunk<
  ICategoryItem[],
  void,
  {
    rejectValue: string
  }
>('category', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('category')

    return response.data
  } catch (err) {
    return rejectWithValue('Произошла ошибка' as string)
  }
})

export const addCategoryItem = createAsyncThunk(
  'category/add',
  async (body: ICategoryItem, { rejectWithValue, dispatch }) => {
    try {
      await axiosApi.post('category', body)
      return dispatch(fetchCategoryItems())
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

interface IUpdateCategoryItem {
  body: ICategoryItem
  id: number | string
}

export const updateCategoryItem = createAsyncThunk(
  'category/update',
  async (arg: IUpdateCategoryItem, { rejectWithValue, dispatch }) => {
    try {
      const { body, id } = arg
      await axiosApi.put(`category/${id}`, body)

      return dispatch(fetchCategoryItems())
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const deleteCategoryItem = createAsyncThunk(
  'category/delete',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await axiosApi.delete(`category/${id}`)
      return dispatch(fetchCategoryItems())
    } catch (error) {
      return rejectWithValue('Что-то пошло не так')
    }
  }
)
