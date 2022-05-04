import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IDetail } from 'types/detail.types'
import axiosApi from 'utils/api'

interface IFetchDetailsArgument {
  categoryId?: string
  modelId?: string
}

export const fetchDetails = createAsyncThunk(
  'detail/show',
  async (params: IFetchDetailsArgument, { rejectWithValue }) => {
    try {
      const { categoryId, modelId } = params
      const categoryIdStr = categoryId && `categoryId=${categoryId}`
      const modelIdStr = modelId && `modelId=${modelId}`
      const response: AxiosResponse<IDetail[]> = await axiosApi.get(
        `http://localhost:5000/api/detail?${categoryIdStr}&${modelIdStr}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('Ошибка' as string)
    }
  }
)

export const addDetail = createAsyncThunk('detail/show', (_, { rejectWithValue }) => {
  try {
  } catch (error) {}
})

export const editDetail = createAsyncThunk('detail/show', (_, { rejectWithValue }) => {
  try {
  } catch (error) {}
})

export const deleteDetail = createAsyncThunk('detail/show', (_, { rejectWithValue }) => {
  try {
  } catch (error) {}
})

// export const fetchDetails = createAsyncThunk('detail/show', (_, { rejectWithValue }) => {
//   try {
//   } catch (error) {}
// })

// export const aaa = createAsyncThunk('detail/show', (_, { rejectWithValue }) => {
//   try {
//   } catch (error) {}
// })
