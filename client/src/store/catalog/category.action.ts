// @ts-nocheck

import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from 'utils/api'

export const fetchCategoryItems = createAsyncThunk('category', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('category')

    return response.data
  } catch (error) {
    return rejectWithValue('Произошла ошибка')
  }
})
